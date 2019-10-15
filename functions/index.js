const admin = require('firebase-admin');
const functions = require('firebase-functions');
const fp = require('lodash/fp');
const lodash = require('lodash');
const constants = require('./src/constants');
const common = require('./src/common');

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

exports.auth = require('./src/auth');
exports.league = require('./src/leagues');
exports.team = require('./src/teams');
exports.player = require('./src/players');
exports.activeTeam = require('./src/activeTeam');
exports.weeklyTeam = require('./src/weeklyTeams');
exports.points = require('./src/points');
exports.users = require('./src/users');

const operations = admin.firestore.FieldValue;

exports.addStatsToPlayer = functions.region(constants.region).firestore
    .document('player-points/{id}')
    .onWrite((change, context) => {
        const difference = common.calculateDifference(change.before.data(), change.after.data());
        return db.collection('players').doc(change.after.data().player_id).get().then(doc => {
            const points = common.calculatePointDifference(difference, doc.data().position);
            return doc.ref.update({
                goals: operations.increment(difference.goals),
                assists: operations.increment(difference.assists),
                points: operations.increment(points)
            });
        });
    });

exports.submitResult = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
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
                        position: playerPositions[cur.id],
                        goals: data.players[cur.id].goals || 0,
                        assists: data.players[cur.id].assists || 0,
                        cleanSheet: data.players[cur.id].cleanSheet || false,
                        redCard: data.players[cur.id].redCard || false,
                        yellowCard: data.players[cur.id].yellowCard || false,
                        manOfTheMatch: data.players[cur.id].manOfTheMatch || false
                    })
                }), {});

                return db.collection('teams').doc(data.team).get().then(doc => {
                    if (!doc.exists) {
                        throw new functions.https.HttpsError('not-found', `There is no team with that id (${data.team})`);
                    }
                    // doc.ref.update({
                    //     goalsFor: operations.increment(data.goalsFor),
                    //     goalsAgainst: operations.increment(data.goalsAgainst),
                    //     wins: operations.increment(data.goalsFor > data.goalsAgainst ? 1 : 0),
                    //     draws: operations.increment(data.goalsFor === data.goalsAgainst ? 1 : 0),
                    //     losses: operations.increment(data.goalsFor < data.goalsAgainst ? 1 : 0)
                    // });
                })
                    .then(() => {
                    // Update or create player points object
                        playerIds.forEach(playerId => {
                            const {
                                position, goals, assists, cleanSheet, redCard, yellowCard
                            } = playerStats[playerId];
                            const points = common.calculatePoints(position,
                                goals, assists, cleanSheet, redCard, yellowCard);
                            console.log('goals', goals);
                            console.log('assists', assists);
                            console.log('goals', goals);
                            console.log('points', points);

                            db.collection('player-points').where('player_id', '==', playerId).where('week', '==', data.week).get()
                                .then(
                                    playerDocs => (playerDocs.empty
                                        ? db.collection('player-points').add({
                                            player_id: playerId,
                                            week: data.week,
                                            goals,
                                            assists,
                                            points,
                                            cleanSheet,
                                            redCard,
                                            yellowCard
                                        })
                                        : playerDocs.docs.forEach(doc => {
                                            doc.ref.update({
                                                goals: operations.increment(goals),
                                                assists: operations.increment(assists),
                                                points: operations.increment(points),
                                                cleanSheet,
                                                redCard,
                                                yellowCard
                                            });
                                        }))
                                );
                        });
                    });
            });
        });
    });
