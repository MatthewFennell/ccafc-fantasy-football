/* eslint-disable max-len */
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const lodash = require('lodash');
const common = require('./common');
const constants = require('./constants');

const db = admin.firestore();

const operations = admin.firestore.FieldValue;

exports.userWithMostPoints = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db
            .collection('users')
            .orderBy('total_points', 'desc').limit(1)
            .get()
            .then(querySnapshot => querySnapshot.docs
                .map(doc => ({ data: doc.data(), id: doc.id })));
    });

exports.playerWithMostPointsInWeek = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db
            .collection('player-points')
            .where('week', '==', data.week)
            .orderBy('points', 'desc')
            .limit(1)
            .get()
            .then(querySnapshot => querySnapshot.docs
                .map(doc => ({ data: doc.data(), id: doc.id })))
            .then(result => {
                if (result.length === 0) {
                    throw new functions.https.HttpsError('not-found', `No players have been assigned points for week ${data.week}`);
                }
                return db.collection('players').doc(lodash.head(result).data.player_id).get()
                    .then(player => ({
                        name: player.data().name,
                        points: lodash.head(result).data.points
                    }));
            });
    });

exports.pointsForWeek = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('weekly-teams').where('user_id', '==', data.userId)
            .where('week', '==', data.week).get()
            .then(
                result => {
                    if (result.size > 1) {
                        throw new functions.https.HttpsError('invalid-argument', 'Somehow you have multiple weekly teams');
                    }
                    if (result.size === 0) {
                        return [];
                    }
                    const weeklyTeam = result.docs[0];
                    return weeklyTeam.data().player_ids;
                }
            )
            .then(
                playerIds => {
                    const playerPromises = [];
                    playerIds.map(playerId => playerPromises.push(db.collection('player-points').where('player_id', '==', playerId).where('week', '==', data.week)
                        .get()
                        .then(doc => {
                            if (doc.size > 1) {
                                throw new functions.https.HttpsError('invalid-argument', 'Server Error. Cannot have two player points entries in a single week');
                            }
                            if (doc.size === 0) {
                                return {
                                    goals: 0,
                                    assists: 0,
                                    points: 0,
                                    redCard: false,
                                    yellowCard: false,
                                    cleanSheet: false,
                                    playerId
                                };
                            }
                            const weeklyPoints = doc.docs[0];
                            return ({
                                goals: weeklyPoints.data().goals,
                                assists: weeklyPoints.data().assists,
                                points: weeklyPoints.data().points,
                                redCard: weeklyPoints.data().redCard,
                                yellowCard: weeklyPoints.data().yellowCard,
                                cleanSheet: weeklyPoints.data().cleanSheet,
                                playerId
                            });
                        })));
                    return Promise.all(playerPromises).then(result => result);
                }
            )
            .then(
                players => {
                    const playerPromises = [];
                    players.map(player => playerPromises.push(db.collection('players').doc(player.playerId).get()
                        .then(result => ({
                            ...player,
                            name: result.data().name,
                            team: result.data().team,
                            position: result.data().position
                        }))));
                    return Promise.all(playerPromises).then(result => result);
                }
            );
    });

// Creates PlayerPoints entries
// Listeners on those do the rest
exports.submitResult = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);

        if (!common.isIntegerGreaterThanEqualZero(data.week)) {
            throw new functions.https.HttpsError('invalid-argument', 'That is not a valid week');
        }

        return common.isAdmin(context.auth.uid).then(() => {
            const playerIds = Object.keys(data.players);
            const playerPromises = [];

            playerIds.map(playerId => playerPromises.push(db.collection('players')
                .doc(playerId).get()
                .then(player => {
                    if (!player.exists) {
                        throw new functions.https.HttpsError('not-found', `There is no player with that id (${player})`);
                    }
                    return ({ id: playerId, position: player.data().position, ref: player.ref });
                })));

            return Promise.all(playerPromises).then(playerPositionsArray => {
                const playerPositions = playerPositionsArray
                    .reduce((acc, cur) => ({ ...acc, [cur.id]: cur.position.toUpperCase() }), {});
                // Get the goals, assists and position of each player having points added to them
                const playerStats = playerPositionsArray.reduce((acc, cur) => ({
                    ...acc,
                    [cur.id]: ({
                        goals: data.players[cur.id].goals || 0,
                        assists: data.players[cur.id].assists || 0,
                        cleanSheet: data.players[cur.id].cleanSheet || false,
                        redCard: data.players[cur.id].redCard || false,
                        yellowCard: data.players[cur.id].yellowCard || false,
                        manOfTheMatch: data.players[cur.id].manOfTheMatch || false,
                        position: playerPositions[cur.id]
                    })
                }), {});
                // Update or create player points object
                playerIds.forEach(playerId => {
                    const {
                        position, goals, assists, cleanSheet, redCard, yellowCard, manOfTheMatch
                    } = playerStats[playerId];
                    const points = common.calculatePoints(position,
                        goals, assists, cleanSheet, redCard, yellowCard);

                    db.collection('player-points').where('player_id', '==', playerId).where('week', '==', data.week).get()
                        .then(playerDocs => {
                            if (playerDocs.empty) {
                                db.collection('player-points').add({
                                    player_id: playerId,
                                    week: data.week,
                                    goals,
                                    assists,
                                    cleanSheet,
                                    redCard,
                                    yellowCard,
                                    manOfTheMatch,
                                    position,
                                    points
                                });
                            } else if (playerDocs.size > 1) {
                                throw new functions.https.HttpsError('invalid-argument', 'Somehow that player points has multiple entries');
                            }
                            playerDocs.docs[0].ref.update({
                                goals: operations.increment(goals),
                                assists: operations.increment(assists),
                                cleanSheet,
                                redCard,
                                yellowCard,
                                manOfTheMatch,
                                position,
                                points: operations.increment(points)
                            });
                        });
                });
            });
        });
    });
