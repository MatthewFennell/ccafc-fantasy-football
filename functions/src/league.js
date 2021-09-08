const admin = require('firebase-admin');
const functions = require('firebase-functions');
const fp = require('lodash/fp');
const common = require('./common');
const constants = require('./constants');

const config = functions.config();

const db = admin.firestore();

const operations = admin.firestore.FieldValue;

const getDisplayName = id => common.getCorrectYear(db).collection('users').doc(id).get()
    .then(user => ({
        displayName: user.data().displayName,
        teamName: user.data().teamName
    }));

const joinLeaguePointsWithCorrectPoints = (uid, week, leagueName, leagueId) => common.getCorrectYear(db).collection('weekly-teams')
    .where('user_id', '==', uid).where('week', '>=', week)
    .get()
    .then(weeklyDocs => weeklyDocs.docs
        .reduce((acc, curVal) => acc + curVal.data().points, 0))
    .then(result => common.getCorrectYear(db).collection('leagues-points').where('name', '==', leagueName).where('user_id', '==', uid)
        .get()
        .then(leagues => {
            if (!leagues.empty) {
                throw new functions.https.HttpsError('already-exists', 'You are already in that league');
            }
            return getDisplayName(uid).then(userInfo => common.getCorrectYear(db).collection('leagues-points').add({
                league_id: leagueId,
                user_id: uid,
                start_week: week,
                name: leagueName,
                user_points: result,
                username: userInfo.displayName,
                teamName: userInfo.teamName,
                position: 1
            }));
        }));

exports.createLeague = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);

        if (!data.leagueName) {
            throw new functions.https.HttpsError('invalid-argument', 'Cannot create a league with an empty name');
        }

        if (!common.isIntegerGreaterThanEqualZero(data.startWeek)) {
            throw new functions.https.HttpsError('invalid-argument', 'Start week must be a positive integer');
        }

        const leagueWithThatName = name => common.getCorrectYear(db).collection('leagues').where('name', '==', name);

        return leagueWithThatName(data.leagueName).get().then(docs => {
            if (docs.empty) {
                return common.getCorrectYear(db).collection('leagues')
                    .add({
                        owner: context.auth.uid,
                        start_week: data.startWeek || 0,
                        name: data.leagueName,
                        number_of_users: 0
                    }).then(docRef => joinLeaguePointsWithCorrectPoints(context.auth.uid,
                        data.startWeek || 0, data.leagueName, docRef.id));
            }
            throw new functions.https.HttpsError('already-exists', 'League with that name already exists');
        });
    });

exports.getLeaguesIAmIn = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return common.getCorrectYear(db)
            .collection('leagues-points')
            .where('user_id', '==', context.auth.uid)
            .get()
            .then(querySnapshot => querySnapshot.docs
                .map(doc => ({ data: doc.data(), id: doc.id })));
    });

exports.leaveLeague = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return common.getCorrectYear(db)
            .collection('leagues-points').where('user_id', '==', context.auth.uid).where('league_id', '==', data.leagueId).get()
            .then(docs => {
                if (docs.empty) {
                    throw new functions.https.HttpsError('not-found', `You are not in a league with that ID (${data.leagueId})`);
                }
                if (docs.docs.length > 1) {
                    common.log(context.auth.uid, 'Somehow in the same league twice', { LeagueId: data.leagueId });
                    throw new functions.https.HttpsError('invalid-argument', 'Server Error (somehow in the same league twice)');
                }
                const docToDelete = docs.docs[0];
                if (docToDelete.data().name === config.league.name) {
                    throw new functions.https.HttpsError('invalid-argument', 'You cannot leave that league');
                }
                return docToDelete.ref.delete();
            });
    });

exports.joinLeague = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return common.getCorrectYear(db).collection('leagues').where('name', '==', data.leagueName).get()
            .then(
                docs => {
                    if (docs.empty) {
                        throw new functions.https.HttpsError('not-found', 'There is no league with that name');
                    }
                    if (docs.docs.length > 1) {
                        common.log(context.auth.uid, 'Found league multiple times', { LeagueName: data.leagueName });
                        throw new functions.https.HttpsError('invalid-argument', 'Server Error');
                    }
                    const doc = docs.docs[0];

                    return joinLeaguePointsWithCorrectPoints(context.auth.uid,
                        doc.data().start_week, data.leagueName, doc.id)
                        .then(() => common.getCorrectYear(db).collection('leagues-points').where('league_id', '==', doc.id).get()
                            .then(query => query.docs
                                .map(leagueDoc => ({ data: leagueDoc.data(), id: leagueDoc.id })))
                            .then(result => {
                                const positions = [];
                                const sortedResult = fp.sortBy('data.user_points')(result).reverse();
                                sortedResult.forEach((pos, index) => {
                                    positions.push({ id: pos.id, position: index + 1 });
                                });

                                const numberOfBatches = Math.ceil(positions.length / constants.maxBatchSize);

                                const batches = [];
                                for (let x = 0; x < numberOfBatches; x += 1) {
                                    batches.push(db.batch());
                                }

                                positions.forEach((pos, index) => {
                                    const batchToTarget = Math.floor(index / constants.maxBatchSize);
                                    const docRef = common.getCorrectYear(db).collection('leagues-points').doc(pos.id);
                                    batches[batchToTarget].update(docRef, {
                                        position: pos.position
                                    });
                                });

                                batches.forEach((batch, index) => batch.commit().then(() => {
                                    console.log('Commited batch at index: ', index, ' for creating updating leagues positions when joining league');
                                }));
                            }));
                }
            );
    });

const maximumRequestSize = 100;
exports.orderedUsers = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        if (!common.isIntegerGreaterThanEqualZero(data.week)) {
            throw new functions.https.HttpsError('invalid-argument', `Invalid week of ${data.week}`);
        }

        const adaptData = query => query.get()
            .then(querySnapshot => querySnapshot.docs
                .map(doc => ({ data: doc.data(), id: doc.id })))
            .then(result => {
                const leaguePromises = [];
                result.map(user => leaguePromises.push(common.getCorrectYear(db).collection('weekly-teams').where('user_id', '==', user.data.user_id).where('week', '==', data.week)
                    .get()
                    .then(weeklyTeam => {
                        if (weeklyTeam.size > 1) {
                            throw new functions.https.HttpsError('invalid-argument', 'Somehow you have multiple weekly teams');
                        }
                        if (weeklyTeam.size === 0) {
                            return fp.set('data.week_points', 0)(user);
                        }
                        const weeklyTeamObj = weeklyTeam.docs[0];
                        return fp.set('data.week_points', weeklyTeamObj.data().points)(user);
                    })));
                return Promise.all(leaguePromises).then(leagueRow => leagueRow);
            });

        if (data.previousId === null) {
            return adaptData(common.getCorrectYear(db)
                .collection('leagues-points')
                .where('league_id', '==', data.leagueId)
                .orderBy('position', 'asc')
                .limit(Math.min(maximumRequestSize, data.requestedSize))).then(result => common.getCorrectYear(db).collection('leagues').doc(data.leagueId).get()
                .then(
                    league => ({
                        users: result,
                        numberOfUsers: league.data().number_of_users,
                        leagueName: league.data().name
                    })
                ));
        }
        return common.getCorrectYear(db).collection('leagues-points').doc(data.previousId).get()
            .then(
                query => adaptData(common.getCorrectYear(db)
                    .collection('leagues-points')
                    .where('league_id', '==', data.leagueId)
                    .orderBy('position', 'asc')
                    .startAfter(query)
                    .limit(Math.min(20, data.requestedSize)))
                    .then(result => ({
                        users: result,
                        numberOfUsers: null
                    }))
            );
    });

// Adds a position tag to each league to order them correctly
exports.calculatePositions = functions
    .region(constants.region)
    .https.onCall((data, context) => common.hasPermission(context.auth.uid, constants.PERMISSIONS.SORT_LEAGUES)
        .then(() => common.getCorrectYear(db)
            .collection('leagues-points')
            .get()
            .then(querySnapshot => querySnapshot.docs
                .map(doc => ({ data: doc.data(), id: doc.id })))
            .then(result => {
                const leaguesAndUsers = {};
                const positions = [];

                result.forEach(league => {
                    const entry = {
                        id: league.id,
                        points: league.data.user_points
                    };

                    if (leaguesAndUsers[league.data.league_id]) {
                        leaguesAndUsers[league.data.league_id].push(entry);
                    } else {
                        leaguesAndUsers[league.data.league_id] = [entry];
                    }
                });

                Object.keys(leaguesAndUsers).forEach(key => {
                    leaguesAndUsers[key] = fp.sortBy('points')(leaguesAndUsers[key]).reverse();
                    leaguesAndUsers[key].forEach((pos, index) => {
                        positions.push({ id: pos.id, position: index + 1 });
                    });
                });

                const numberOfBatches = Math.ceil(positions.length / constants.maxBatchSize);

                const batches = [];
                for (let x = 0; x < numberOfBatches; x += 1) {
                    batches.push(db.batch());
                }

                positions.forEach((pos, index) => {
                    const batchToTarget = Math.floor(index / constants.maxBatchSize);
                    const docRef = common.getCorrectYear(db).collection('leagues-points').doc(pos.id);
                    batches[batchToTarget].update(docRef, {
                        position: pos.position
                    });
                });

                batches.forEach((batch, index) => batch.commit().then(() => {
                    console.log('Commited batch at index: ', index, ' for creating updating leagues positions');
                }));
            })));

// Increase number of users in league
exports.onUserJoinLeague = functions.region(constants.region).firestore
    .document('fantasy-years/{year}/leagues-points/{id}')
    .onCreate((snapshot, context) => common.getCorrectYear(db, context.params.year).collection('leagues').doc(snapshot.data().league_id).update({
        number_of_users: operations.increment(1)
    }));

exports.onUserLeaveLeague = functions.region(constants.region).firestore
    .document('fantasy-years/{year}/leagues-points/{id}')
    .onDelete((snapshot, context) => common.getCorrectYear(db, context.params.year).collection('leagues').doc(snapshot.data().league_id).update({
        number_of_users: operations.increment(-1)
    }));
