const admin = require('firebase-admin');
const functions = require('firebase-functions');
const fp = require('lodash/fp');
const common = require('./common');
const constants = require('./constants');

const db = admin.firestore();

const operations = admin.firestore.FieldValue;

// First check if they are already in that league
// Then check that the league does exist
exports.createPlayer = functions
    .region(constants.region)
    .https.onCall((data, context) => common.hasPermission(context.auth.uid,
        constants.PERMISSIONS.CREATE_PLAYER)
        .then(() => {
            if (!data.name) {
                throw new functions.https.HttpsError('invalid-argument', 'Invalid player name');
            }
            if (!data.position) {
                throw new functions.https.HttpsError('invalid-argument', 'Invalid player position');
            }
            if (!data.position || !common.isValidPosition(data.position.toUpperCase())) {
                throw new functions.https.HttpsError('invalid-argument', 'Invalid player position');
            }
            if (!common.isNumber(data.price)) {
                throw new functions.https.HttpsError('invalid-argument', 'Invalid price');
            }
            if (!common.isNumber(data.previousScore)) {
                throw new functions.https.HttpsError('invalid-argument', 'Invalid previous score');
            }
            const teamExistsRef = db.collection('teams')
                .where('team_name', '==', data.team);
            const playerAlreadyExistsRef = db.collection('players')
                .where('name', '==', data.name)
                .where('team', '==', data.team);
            return playerAlreadyExistsRef.get().then(doc => {
                if (doc.empty) {
                    return teamExistsRef.get()
                        .then(leagueDoc => {
                            if (!leagueDoc.empty) {
                                db.collection('players')
                                    .add({
                                        name: data.name,
                                        position: data.position,
                                        price: parseFloat(data.price, 10),
                                        team: data.team,
                                        points: 0,
                                        goals: 0,
                                        assists: 0,
                                        previousScore: parseFloat(data.previousScore, 10)
                                    });
                                return Promise.resolve({ message: 'Player created', verified: true });
                            }
                            throw new functions.https.HttpsError('not-found', 'There is no team with that name');
                        });
                }
                throw new functions.https.HttpsError('already-exists', 'That player already exists');
            });
        }));

exports.getAllPlayers = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db
            .collection('players')
            .get()
            .then(querySnapshot => querySnapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() })));
    });

exports.deletePlayer = functions
    .region(constants.region)
    .https.onCall((data, context) => common.hasPermission(context.auth.uid,
        constants.PERMISSIONS.DELETE_PLAYER)
        .then(() => {
            if (!data.playerId) {
                throw new functions.https.HttpsError('invalid-argument', 'Must provide a valid player id');
            }
            return db.collection('weekly-teams').where('player_ids', 'array-contains', data.playerId).get()
                .then(docs => {
                    if (docs.size > 0) {
                        throw new functions.https.HttpsError('invalid-argument', 'That player exists in somebodys team. Cannot be deleted');
                    }
                    return db.collection('players').doc(data.playerId).delete();
                });
        }));

exports.editPlayerStats = functions
    .region(constants.region)
    .https.onCall((data, context) => common.hasPermission(context.auth.uid,
        constants.PERMISSIONS.EDIT_PLAYER)
        .then(() => {
            if (!common.isIntegerGreaterThanEqualZero(data.week)) {
                throw new functions.https.HttpsError('invalid-argument', 'Invalid week');
            }
            return db.collection('players').doc(data.playerId).get().then(doc => {
                if (doc.exists) {
                    return doc.data();
                }
                throw new functions.https.HttpsError('not-found', `There is no player with that id (${data.playerId})`);
            })
                .then(
                    player => db.collection('player-points').where('player_id', '==', data.playerId)
                        .where('week', '==', data.week).get()
                        .then(
                            result => {
                                if (result.size > 1) {
                                    throw new functions.https.HttpsError('invalid-argument', 'There are multiple player points entries');
                                }

                                if (result.size === 0) {
                                    const points = common.calculatePointDifference(data.difference,
                                        player.position);
                                    return db.collection('player-points').add({
                                        week: data.week,
                                        player_id: data.playerId,
                                        goals: fp.has('goals')(data.difference) ? data.difference.goals : 0,
                                        assists: fp.has('assists')(data.difference) ? data.difference.assists : 0,
                                        cleanSheet: fp.has('cleanSheet')(data.difference) ? data.difference.cleanSheet : false,
                                        redCard: fp.has('redCard')(data.difference) ? data.difference.redCard : false,
                                        yellowCard: fp.has('yellowCard')(data.difference) ? data.difference.yellowCard : false,
                                        manOfTheMatch: fp.has('manOfTheMatch')(data.difference) ? data.difference.manOfTheMatch : false,
                                        points,
                                        position: player.position,
                                        ownGoals: fp.has('ownGoals')(data.difference) ? data.difference.ownGoals : 0,
                                        penaltyMisses: fp.has('penaltyMisses')(data.difference) ? data.difference.penaltyMisses : 0,
                                        penaltySaves: fp.has('penaltySaves')(data.difference) ? data.difference.penaltySaves : 0,
                                        dickOfTheDay: fp.has('dickOfTheDay')(data.difference) ? data.difference.dickOfTheDay : false,
                                        team: player.team,
                                        name: player.name
                                    });
                                }
                                const doc = result.docs[0];
                                const difference = common.calculateDifference(result.docs[0].data(),
                                    data.difference);
                                const points = common.calculatePointDifference(difference,
                                    player.position);

                                return result.docs[0].ref.update({
                                    goals: fp.has('goals')(data.difference) ? data.difference.goals : doc.data().goals,
                                    assists: fp.has('assists')(data.difference) ? data.difference.assists : doc.data().assists,
                                    cleanSheet: fp.has('cleanSheet')(data.difference) ? data.difference.cleanSheet : doc.data().cleanSheet,
                                    redCard: fp.has('redCard')(data.difference) ? data.difference.redCard : doc.data().redCard,
                                    yellowCard: fp.has('yellowCard')(data.difference) ? data.difference.yellowCard : doc.data().yellowCard,
                                    manOfTheMatch: fp.has('manOfTheMatch')(data.difference) ? data.difference.manOfTheMatch : doc.data().manOfTheMatch,
                                    points: operations.increment(points),
                                    ownGoals: fp.has('ownGoals')(data.difference) ? data.difference.ownGoals : doc.data().ownGoals,
                                    penaltyMisses: fp.has('penaltyMisses')(data.difference) ? data.difference.penaltyMisses : doc.data().penaltyMisses,
                                    penaltySaves: fp.has('penaltySaves')(data.difference) ? data.difference.penaltySaves : doc.data().penaltySaves,
                                    dickOfTheDay: fp.has('dickOfTheDay')(data.difference) ? data.difference.dickOfTheDay : doc.data().dickOfTheDay
                                });
                            }
                        )
                );
        }));


exports.playerStats = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('player-points')
            .where('player_id', '==', data.playerId).where('week', '==', data.week).get()
            .then(
                result => {
                    if (result.size === 0) {
                        return {
                            assists: 0,
                            cleanSheet: false,
                            goals: 0,
                            manOfTheMatch: false,
                            redCard: false,
                            yellowCard: false,
                            ownGoals: 0,
                            dickOfTheDay: false,
                            penaltySaves: 0,
                            penaltyMisses: 0
                        };
                    }
                    if (result.size > 1) {
                        throw new functions.https.HttpsError('invalid-argument', 'Server error. Multiple player points objects');
                    }
                    return ({
                        goals: result.docs[0].data().goals,
                        cleanSheet: result.docs[0].data().cleanSheet,
                        assists: result.docs[0].data().assists,
                        manOfTheMatch: result.docs[0].data().manOfTheMatch,
                        redCard: result.docs[0].data().redCard,
                        yellowCard: result.docs[0].data().yellowCard,
                        ownGoals: result.docs[0].data().ownGoals,
                        dickOfTheDay: result.docs[0].data().dickOfTheDay,
                        penaltySaves: result.docs[0].data().penaltySaves,
                        penaltyMisses: result.docs[0].data().penaltyMisses
                    });
                }
            );
    });
