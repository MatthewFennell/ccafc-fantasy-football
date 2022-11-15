/* eslint-disable camelcase */
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const common = require('./common');
const constants = require('./constants');

const config = functions.config();
const db = admin.firestore();

const operations = admin.firestore.FieldValue;

const updateLeaguesPointsEntries = user_id => common.getCorrectYear(db).collection('leagues-points')
    .where('user_id', '==', user_id).get()
    .then(
        leagues => {
            leagues.docs.forEach(doc => doc.ref.update({
                hasPlayerInActiveTeam: true
            }));
        }
    );

exports.updateTeam = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);

        return common.getCorrectYear(db).collection('users').doc(context.auth.uid).get()
            .then(
                user => user.data().remaining_budget
            )
            .then(userBudget => common.getCorrectYear(db).collection('active-teams').where('user_id', '==', context.auth.uid).get()
                .then(
                    activeTeams => {
                        if (activeTeams.size === 0) {
                            common.log(context.auth.uid, 'No Active Team');
                            throw new functions.https.HttpsError('not-found', 'Somehow you have no active team');
                        }
                        if (activeTeams.size > 1) {
                            common.log(context.auth.uid, 'Multiple Active Teams');
                            throw new functions.https.HttpsError('invalid-argument', 'You have multiple active teams');
                        }

                        const playerIds = activeTeams.docs[0].data().player_ids;
                        const playersBeingAdded = data.newTeam.filter(p => !playerIds.includes(p));
                        const playersBeingRemoved = playerIds.filter(p => !data.newTeam.includes(p));
                        const promises = [];

                        playersBeingAdded.map(playerId => promises.push(common.getCorrectYear(db).collection('players').doc(playerId).get()
                            .then(doc => {
                                if (doc.exists) return ({ data: doc.data(), id: doc.id, adding: true });
                                common.log(context.auth.uid, 'Invalid Player ID (Player being added)', { PlayerId: doc.id });
                                throw new functions.https.HttpsError('not-found', 'Invalid player ID');
                            })));

                        playersBeingRemoved.map(playerId => promises.push(common.getCorrectYear(db).collection('players').doc(playerId).get()
                            .then(doc => {
                                if (doc.exists) return ({ data: doc.data(), id: doc.id, adding: false });
                                common.log(context.auth.uid, 'Invalid Player ID (Player being removed)', { PlayerId: doc.id });
                                throw new functions.https.HttpsError('not-found', 'Invalid player ID');
                            })));

                        return Promise.all(promises).then(players => {
                            const removedPrice = players.filter(p => !p.adding)
                                .reduce((acc, curVal) => Number(acc) + Number(curVal.data.price), 0);
                            const addedPrice = players.filter(p => p.adding)
                                .reduce((acc, curVal) => Number(acc) + Number(curVal.data.price), 0);
                            if (userBudget + removedPrice - addedPrice < 0) {
                                throw new functions.https.HttpsError('invalid-argument', 'Not enough $$$');
                            }
                            return userBudget + removedPrice - addedPrice;
                        }).then(
                            newBudget => {
                                const newTeamPromises = [];
                                data.newTeam.map(playerId => newTeamPromises.push(common.getCorrectYear(db).collection('players').doc(playerId).get()
                                    .then(doc => {
                                        if (doc.exists) return ({ data: doc.data(), id: doc.id, adding: false });
                                        common.log(context.auth.uid, 'Invalid Player ID (New Team Promises)', { PlayerId: doc.id });
                                        throw new functions.https.HttpsError('not-found', 'Invalid player ID');
                                    })));
                                return Promise.all(newTeamPromises).then(players => {
                                    common.teamIsValid(players);
                                    updateLeaguesPointsEntries(context.auth.uid);
                                    return activeTeams.docs[0].ref.update({
                                        player_ids: data.newTeam
                                    }).then(() => common.getCorrectYear(db).collection('users').doc(context.auth.uid).update({
                                        remaining_budget: parseFloat(newBudget.toFixed(1), 10)
                                    }));
                                });
                            }
                        );
                    }
                ));
    });

exports.getActiveTeam = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return common.getCorrectYear(db).collection('active-teams').where('user_id', '==', context.auth.uid).get()
            .then(
                result => {
                    if (result.size === 0) {
                        common.log(context.auth.uid, 'No Active Team');
                        throw new functions.https.HttpsError('not-found', 'Somehow you have no active team');
                    }
                    if (result.size > 1) {
                        common.log(context.auth.uid, 'Multiple Active Teams');
                        throw new functions.https.HttpsError('invalid-argument', 'You have multiple active teams');
                    }
                    return ({ player_ids: result.docs[0].data().player_ids, captain: result.docs[0].data().captain });
                }
            )
            .then(
                result => {
                    const promises = [];
                    result.player_ids.map(playerId => promises.push(common.getCorrectYear(db).collection('players').doc(playerId).get()
                        .then(doc => {
                            if (doc.exists) return ({ ...doc.data(), id: doc.id });
                            common.log(context.auth.uid, 'Invalid Player ID', { PlayerId: doc.id });
                            throw new functions.https.HttpsError('not-found', 'Invalid player ID');
                        })));
                    return Promise.all(promises).then(
                        players => ({ captain: result.captain, players })
                    );
                }
            );
    });

exports.makeCaptain = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return common.getCorrectYear(db).collection('active-teams').where('user_id', '==', context.auth.uid).get()
            .then(
                result => {
                    if (result.size > 1) {
                        common.log(context.auth.uid, 'Multiple Active Teams');
                        throw new functions.https.HttpsError('invalid-argument', 'Server Error. You have multiple active teams');
                    }
                    if (result.size === 0) {
                        common.log(context.auth.uid, 'No Active Team');
                        throw new functions.https.HttpsError('invalid-argument', 'Server Error. You don\'t have an active team');
                    }
                    return result.docs[0].ref.update({
                        captain: data.playerId
                    });
                }
            );
    });

exports.removeCaptainWhenTeamUpdated = functions.region(constants.region).firestore
    .document('fantasy-years/{year}/active-teams/{id}')
    .onWrite((change, context) => {
        const { year } = context.params;
        if (change.after.exists) {
            const { player_ids, captain } = change.after.data();
            if (!player_ids.includes(captain)) {
                return common.getCorrectYear(db, year).collection('active-teams').doc(change.after.id).update({
                    captain: null
                })
                    .then(() => Promise.resolve('Captain set to null'));
            }
        }
        return Promise.resolve('Captain still remains in team');
    });

exports.createActiveTeam = functions.region(constants.region).firestore
    .document('fantasy-years/{year}/users/{id}')
    .onWrite((change, context) => {
        const { year, id } = context.params;
        if (!change.before.exists) {
            common.getCorrectYear(db, year).collection('active-teams').add({
                user_id: id,
                player_ids: [],
                captain: ''
            });
        }
        return Promise.resolve();
    });

const tryFindUserInYear = (userId, year) => {
    if (year < 2018) {
        return Promise.resolve();
    }
    return common.getCorrectYear(db, String(year)).collection('users').doc(userId).get()
        .then(user => {
            if (user.exists) {
                common.getCorrectYear(db).collection('application-info').doc(constants.applicationInfoId).get()
                    .then(appInfo => {
                        if (appInfo.exists) {
                            appInfo.ref.update({
                                number_of_users: operations.increment(1)
                            });
                        }
                        common.getCorrectYear(db).collection('users').doc(userId).set({
                            ...user.data(),
                            total_points: 0,
                            remaining_transfers: 0,
                            remaining_budget: 100
                        });
                        common.getCorrectYear(db).collection('leagues-points').add({
                            league_id: constants.collingwoodLeagueId,
                            user_id: userId,
                            start_week: 0,
                            name: config.league.name,
                            user_points: 0,
                            username: user.data().displayName,
                            position: appInfo.data().number_of_users,
                            teamName: user.data().teamName
                        });
                    });
                return Promise.resolve();
            }
            return tryFindUserInYear(userId, year - 1);
        });
};

exports.fixAccount = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);

        const currentYear = new Date().getFullYear();

        return tryFindUserInYear(context.auth.uid, currentYear);
    });
