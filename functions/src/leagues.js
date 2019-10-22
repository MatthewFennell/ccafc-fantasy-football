const admin = require('firebase-admin');
const functions = require('firebase-functions');
const fp = require('lodash/fp');
const common = require('./common');
const constants = require('./constants');

const db = admin.firestore();

exports.createLeague = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        const getDisplayName = id => db.collection('users').doc(id).get().then(user => ({
            displayName: user.data().displayName,
            teamName: user.data().teamName
        }));

        if (!data.leagueName) {
            throw new functions.https.HttpsError('invalid-argument', 'Cannot create a league with an empty name');
        }

        if (!common.isIntegerGreaterThanEqualZero(data.startWeek)) {
            throw new functions.https.HttpsError('invalid-argument', 'Start week must be a positive integer');
        }

        const leagueWithThatName = name => db.collection('leagues').where('name', '==', name);

        return leagueWithThatName(data.leagueName).get().then(docs => {
            if (docs.empty) {
                return getDisplayName(context.auth.uid).then(userInfo => db.collection('leagues')
                    .add({
                        owner: context.auth.uid,
                        start_week: data.startWeek || 0,
                        name: data.leagueName
                    }).then(docRef => {
                        db.collection('leagues-points').add({
                            league_id: docRef.id,
                            user_id: context.auth.uid,
                            start_week: data.startWeek || 0,
                            name: data.leagueName,
                            user_points: 0,
                            username: userInfo.displayName,
                            position: 1,
                            teamName: userInfo.teamName
                        });
                    }));
            }
            throw new functions.https.HttpsError('already-exists', 'League with that name already exists');
        });
    });

exports.getAllLeagues = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db
            .collection('leagues-points')
            .get()
            .then(querySnapshot => querySnapshot.docs
                .map(doc => ({ data: doc.data(), id: doc.id })));
    });

exports.getLeaguesIAmIn = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db
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
        return db
            .collection('leagues-points').where('user_id', '==', context.auth.uid).where('league_id', '==', data.leagueId).get()
            .then(docs => {
                if (docs.empty) {
                    throw new functions.https.HttpsError('not-found', `You are not in a league with that ID (${data.leagueId})`);
                }
                if (docs.docs.length > 1) {
                    throw new functions.https.HttpsError('invalid-argument', 'Server Error (somehow in the same league twice)');
                }
                const docToDelete = docs.docs[0];
                return docToDelete.ref.delete().then(() => db.collection('leagues-points').where('league_id', '==', data.leagueId).get()
                    .then(query => query.docs
                        .map(leagueDoc => ({ data: leagueDoc.data(), id: leagueDoc.id })))
                    .then(result => {
                        const positions = [];
                        const sortedResult = fp.sortBy('data.user_points')(result).reverse();
                        sortedResult.forEach((pos, index) => {
                            positions.push({ id: pos.id, position: index + 1 });
                        });
                        const leagueUpdatePromises = [];
                        positions.map(pos => leagueUpdatePromises.push(db.collection('leagues-points')
                            .doc(pos.id).update({
                                position: pos.position
                            })));
                    }));
            });
    });

exports.joinLeague = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        const getDisplayName = id => db.collection('users').doc(id).get().then(user => ({
            displayName: user.data().displayName,
            teamName: user.data().teamName
        }));

        return db.collection('leagues').where('name', '==', data.leagueName).get().then(
            docs => {
                if (docs.empty) {
                    throw new functions.https.HttpsError('not-found', 'There is no league with that name');
                }
                if (docs.docs.length > 1) {
                    throw new functions.https.HttpsError('invalid-argument', 'Server Error');
                }
                const doc = docs.docs[0];

                return db.collection('weekly-teams').where('user_id', '==', context.auth.uid).where('week', '>=', doc.data().start_week).get()
                    .then(weeklyDocs => weeklyDocs.docs
                        .reduce((acc, curVal) => acc + curVal.data().points, 0))
                    .then(result => db.collection('leagues-points').where('name', '==', data.leagueName).where('user_id', '==', context.auth.uid)
                        .get()
                        .then(leagues => {
                            if (!leagues.empty) {
                                throw new functions.https.HttpsError('already-exists', 'You are already in that league');
                            }
                            return getDisplayName(context.auth.uid).then(userInfo => db.collection('leagues-points').add({
                                league_id: doc.id,
                                user_id: context.auth.uid,
                                start_week: doc.data().start_week,
                                name: data.leagueName,
                                user_points: result,
                                username: userInfo.displayName,
                                teamName: userInfo.teamName
                            }));
                        }))
                    .then(() => db.collection('leagues-points').where('league_id', '==', doc.id).get()
                        .then(query => query.docs
                            .map(leagueDoc => ({ data: leagueDoc.data(), id: leagueDoc.id })))
                        .then(result => {
                            const positions = [];
                            const sortedResult = fp.sortBy('data.user_points')(result).reverse();
                            sortedResult.forEach((pos, index) => {
                                positions.push({ id: pos.id, position: index + 1 });
                            });
                            const leagueUpdatePromises = [];
                            positions.map(pos => leagueUpdatePromises.push(db.collection('leagues-points')
                                .doc(pos.id).update({
                                    position: pos.position
                                })));
                        }));
            }
        );
    });

exports.orderedUsers = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        if (!common.isIntegerGreaterThanEqualZero(data.week)) {
            throw new functions.https.HttpsError('invalid-argument', `Invalid week of${data.week}`);
        }

        return db
            .collection('leagues-points')
            .where('league_id', '==', data.leagueId)
            .orderBy('user_points', 'desc')
            .get()
            .then(querySnapshot => querySnapshot.docs
                .map(doc => ({ data: doc.data(), id: doc.id })))
            .then(result => {
                const leaguePromises = [];
                result.map(user => leaguePromises.push(db.collection('weekly-teams').where('user_id', '==', user.data.user_id).where('week', '==', data.week)
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
    });

exports.positionsOfUserInLeagues = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db
            .collection('leagues-points')
            .where('user_id', '==', data.userId)
            .get()
            .then(querySnapshot => querySnapshot.docs
                .map(doc => ({ data: doc.data(), id: doc.id })));
    });


// Adds a position tag to each league to order them correctly
exports.calculatePositions = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db
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

                const leagueUpdatePromises = [];
                positions.map(pos => leagueUpdatePromises.push(db.collection('leagues-points')
                    .doc(pos.id).update({
                        position: pos.position
                    })));

                return Promise.all(leagueUpdatePromises).then(() => 'Successfully updated');
            });
    });
