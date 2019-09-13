const admin = require('firebase-admin');
const functions = require('firebase-functions');
const fp = require('lodash');
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

const operations = admin.firestore.FieldValue;

exports.submitResult = functions
    .region('europe-west2')
    .https.onCall((data, context) => {
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

        Promise.all(playerPromises).then(playerPositionsArray => {
            const playerPositions = playerPositionsArray
                .reduce((acc, cur) => ({ ...acc, [cur.id]: cur.position.toUpperCase() }), {});

            // Get the goals, assists and position of each player having points added to them
            const playerStats = playerPositionsArray.reduce((acc, cur) => ({
                ...acc,
                [cur.id]: ({
                    goals: data.players[cur.id].goals || 0,
                    assists: data.players[cur.id].assists || 0,
                    position: playerPositions[cur.id]
                })
            }), {});

            return db.collection('teams').doc(data.team).get().then(doc => {
                if (!doc.exists) {
                    throw new functions.https.HttpsError('not-found', `There is no team with that id (${data.team})`);
                }
                doc.ref.update({
                    goalsFor: operations.increment(data.goalsFor),
                    goalsAgainst: operations.increment(data.goalsAgainst),
                    wins: operations.increment(data.goalsFor > data.goalsAgainst ? 1 : 0),
                    draws: operations.increment(data.goalsFor === data.goalsAgainst ? 1 : 0),
                    losses: operations.increment(data.goalsFor < data.goalsAgainst ? 1 : 0)
                }).then(() => {
                    const weeklyTeamsPromises = [];

                    // All weekly teams that contain a player for a given week
                    // Returns array of arrays
                    playerIds.map(playerId => weeklyTeamsPromises.push(db.collection('weekly-teams')
                        .where('player_ids', 'array-contains', playerId).where('week', '==', data.week).get()
                        .then(weeklyTeamDocs => weeklyTeamDocs.docs
                            .map(weeklyDoc => ({
                                data: weeklyDoc.data(),
                                id: weeklyDoc.id,
                                player_id: playerId
                            })))));

                    // Update all weekly teams points
                    Promise.all(weeklyTeamsPromises).then(weeklyTeams => {
                        fp.flattenDeep(weeklyTeams).forEach(weeklyTeam => {
                            const { goals, assists, position } = playerStats[weeklyTeam.player_id];
                            const pointsIncrease = common.calculatePoints(goals, assists, position);
                            db.collection('weekly-teams').doc(weeklyTeam.id).update({
                                points: admin.firestore.FieldValue.increment(pointsIncrease)
                            });
                        });
                    });
                }).then(() => {
                    // Update the players table
                    playerPositionsArray.forEach(player => {
                        const { goals, assists, position } = playerStats[player.id];
                        const pointsIncrease = common.calculatePoints(goals, assists, position);
                        player.ref.update({
                            goals: admin.firestore.FieldValue.increment(goals),
                            assists: admin.firestore.FieldValue.increment(assists),
                            points: admin.firestore.FieldValue.increment(pointsIncrease)
                        });
                    });
                }).then(() => {
                    const weeklyPlayerPromises = [];
                    playerIds.map(playerId => weeklyPlayerPromises.push(db.collection('weekly-players')
                        .where('player_id', '==', playerId).where('week', '==', data.week).get()
                        .then(weeklyPlayerDoc => weeklyPlayerDoc.docs
                            .map(weeklyDoc => ({
                                data: weeklyDoc.data(),
                                id: weeklyDoc.id,
                                player_id: playerId,
                                user_id: weeklyDoc.data().user_id
                            })))));

                    // Update all weekly players
                    Promise.all(weeklyPlayerPromises).then(weeklyPlayers => {
                        fp.flattenDeep(weeklyPlayers).forEach(weekPlayer => {
                            const { goals, assists, position } = playerStats[weekPlayer.player_id];
                            const pointsIncrease = common.calculatePoints(goals, assists, position);
                            db.collection('weekly-players').doc(weekPlayer.id).update({
                                points: admin.firestore.FieldValue.increment(pointsIncrease)
                            });
                            // Add points to the user
                            db.collection('users').doc(weekPlayer.user_id).get().then(
                                user => {
                                    if (!user.exists) {
                                        throw new functions.https.HttpsError('not-found', 'User does not exist');
                                    }
                                    user.ref.update({
                                        total_points: admin.firestore.FieldValue.increment(pointsIncrease)
                                    });
                                }
                            );
                        });
                    });
                });
            });
        });
    });
