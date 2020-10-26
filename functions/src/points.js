const admin = require('firebase-admin');
const functions = require('firebase-functions');
const lodash = require('lodash');
const fp = require('lodash/fp');
const common = require('./common');
const constants = require('./constants');

const db = admin.firestore();

const operations = admin.firestore.FieldValue;

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
                    playerIds.map(playerId => playerPromises.push(db.collection('weekly-players')
                        .where('player_id', '==', playerId).where('week', '==', data.week).where('user_id', '==', data.userId)
                        .get()
                        .then(doc => {
                            if (doc.size > 1) {
                                throw new functions.https.HttpsError('invalid-argument', 'Server Error. Cannot have identical weekly player entries in a single week');
                            }
                            if (doc.size === 0) {
                                return {
                                    goals: 0,
                                    assists: 0,
                                    points: 0,
                                    redCard: false,
                                    yellowCard: false,
                                    cleanSheet: false,
                                    player_id: playerId,
                                    isCaptain: false,
                                    manOfTheMatch: false,
                                    dickOfTheDay: false,
                                    ownGoals: 0,
                                    penaltyMisses: 0,
                                    penaltySaves: 0
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
                                player_id: playerId,
                                isCaptain: weeklyPoints.data().isCaptain,
                                manOfTheMatch: weeklyPoints.data().manOfTheMatch,
                                dickOfTheDay: weeklyPoints.data().dickOfTheDay,
                                ownGoals: weeklyPoints.data().ownGoals,
                                penaltyMisses: weeklyPoints.data().penaltyMisses,
                                penaltySaves: weeklyPoints.data().penaltySaves
                            });
                        })));
                    return Promise.all(playerPromises).then(result => result);
                }
            )
            .then(
                players => {
                    const playerPromises = [];
                    players.map(player => playerPromises.push(db.collection('players').doc(player.player_id).get()
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

const getDisplayName = id => db.collection('users').doc(id).get()
    .then(user => ({
        displayName: user.data().displayName,
        email: user.data().email
    }));

const updateResultsHistory = (playerStats, uid, teamId, week) => {
    getDisplayName(uid).then(user => {
        db.collection('results-history').doc(constants.resultsHistoryId).get().then(doc => {
            if (!doc.exists) {
                return Promise.resolve();
            }

            const goalsHistory = [];
            const assistsHistory = [];
            const cleanSheetsHistory = [];
            const teamName = fp.get('team')(fp.head(Object.values(playerStats)));
            let manOfTheMatchHistory = {
                id: null,
                name: null
            };

            let dickOfTheDayHistory = {
                id: null,
                name: null
            };

            Object.keys(playerStats).forEach(key => {
                const {
                    cleanSheet, goals, assists, name, manOfTheMatch, dickOfTheDay
                } = fp.get(key)(playerStats);

                if (cleanSheet) {
                    cleanSheetsHistory.push({
                        id: key,
                        name
                    });
                }
                if (goals) {
                    goalsHistory.push({
                        id: key,
                        name,
                        amount: goals
                    });
                }
                if (assists) {
                    assistsHistory.push({
                        id: key,
                        name,
                        amount: assists
                    });
                }
                if (manOfTheMatch) {
                    manOfTheMatchHistory = {
                        id: key,
                        name
                    };
                }
                if (dickOfTheDay) {
                    dickOfTheDayHistory = {
                        id: key,
                        name
                    };
                }
            });

            const update = {
                assists: assistsHistory,
                author: {
                    uid,
                    displayName: user.displayName,
                    email: user.email
                },
                cleanSheets: cleanSheetsHistory,
                date: new Date(),
                dickOfTheDay: dickOfTheDayHistory,
                goals: goalsHistory,
                manOfTheMatch: manOfTheMatchHistory,
                teamId,
                teamName,
                type: constants.resultHistoryTypes.STANDARD_RESULT,
                week
            };

            return db.collection('results-history').doc(constants.resultsHistoryId).update({
                history: [update, ...doc.data().history]
            });
        });
    });
};

// Creates PlayerPoints entries
// Listeners on those do the rest
exports.submitResult = functions
    .region(constants.region)
    .https.onCall((data, context) => common.hasPermission(context.auth.uid,
        constants.PERMISSIONS.SUBMIT_RESULT).then(() => {
        if (!common.isIntegerGreaterThanEqualZero(data.week)) {
            throw new functions.https.HttpsError('invalid-argument', `That is not a valid week (${data.week})`);
        }

        if (!common.isIntegerGreaterThanEqualZero(data.goalsAgainst)) {
            throw new functions.https.HttpsError('invalid-argument', `That is not a valid value goals against (${data.goalsAgainst})`);
        }

        if (!common.isIntegerGreaterThanEqualZero(data.goalsFor)) {
            throw new functions.https.HttpsError('invalid-argument', `That is not a valid value goals for (${data.goalsFor})`);
        }

        db.collection('teams').doc(data.team).get().then(team => {
            if (team.exists) {
                team.ref.update({
                    goalsFor: operations.increment(data.goalsFor),
                    goalsAgainst: operations.increment(data.goalsAgainst),
                    wins: operations.increment(data.goalsFor > data.goalsAgainst ? 1 : 0),
                    draws: operations.increment(data.goalsFor === data.goalsAgainst ? 1 : 0),
                    losses: operations.increment(data.goalsFor < data.goalsAgainst ? 1 : 0),
                    results: operations.arrayUnion({
                        week: data.week,
                        goalsFor: data.goalsFor,
                        goalsAgainst: data.goalsAgainst
                    })
                });
            }
        });

        const playerIds = Object.keys(data.players);
        const playerPromises = [];

        playerIds.map(playerId => playerPromises.push(db.collection('players')
            .doc(playerId).get()
            .then(player => {
                if (!player.exists) {
                    throw new functions.https.HttpsError('not-found', `There is no player with that id (${player})`);
                }
                return ({
                    id: playerId,
                    position: player.data().position,
                    team: player.data().team,
                    name: player.data().name,
                    ref: player.ref
                });
            })));

        return Promise.all(playerPromises).then(playerPositionsArray => {
            const playerPositions = playerPositionsArray
                .reduce((acc, cur) => ({ ...acc, [cur.id]: cur.position.toUpperCase() }), {});

            const playerTeams = playerPositionsArray
                .reduce((acc, cur) => ({ ...acc, [cur.id]: cur.team }), {});

            const playerNames = playerPositionsArray
                .reduce((acc, cur) => ({ ...acc, [cur.id]: cur.name }), {});

            // Get the goals, assists and position of each player having points added to them
            const playerStats = playerPositionsArray.reduce((acc, cur) => ({
                ...acc,
                [cur.id]: ({
                    goals: data.players[cur.id].goals || 0,
                    assists: data.players[cur.id].assists || 0,
                    ownGoals: data.players[cur.id].ownGoals || 0,
                    cleanSheet: data.players[cur.id].cleanSheet || false,
                    dickOfTheDay: data.players[cur.id].dickOfTheDay || false,
                    redCard: data.players[cur.id].redCard || false,
                    yellowCard: data.players[cur.id].yellowCard || false,
                    manOfTheMatch: data.players[cur.id].manOfTheMatch || false,
                    position: playerPositions[cur.id],
                    team: playerTeams[cur.id],
                    name: playerNames[cur.id]
                })
            }), {});

            updateResultsHistory(playerStats, context.auth.uid, data.team, data.week);

            // Update or create player points object
            playerIds.forEach(playerId => {
                const {
                    position, goals, assists, cleanSheet, redCard, yellowCard,
                    manOfTheMatch, dickOfTheDay, ownGoals, team, name
                } = playerStats[playerId];
                const points = common.calculatePoints(position,
                    goals, assists, cleanSheet, redCard, yellowCard, dickOfTheDay, ownGoals, 0, 0);

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
                                points,
                                dickOfTheDay,
                                ownGoals,
                                team,
                                name,
                                penaltyMisses: 0,
                                penaltySaves: 0
                            });
                        } else if (playerDocs.size > 1) {
                            throw new functions.https.HttpsError('invalid-argument', 'Somehow that player points has multiple entries');
                        } else {
                            playerDocs.docs[0].ref.update({
                                goals: operations.increment(goals),
                                assists: operations.increment(assists),
                                cleanSheet: playerDocs.docs[0].data().cleanSheet || cleanSheet,
                                redCard: playerDocs.docs[0].data().redCard || redCard,
                                yellowCard: playerDocs.docs[0].data().yellowCard || yellowCard,
                                manOfTheMatch: playerDocs.docs[0].data().manOfTheMatch || manOfTheMatch,
                                position,
                                points: operations.increment(points),
                                dickOfTheDay: playerDocs.docs[0].data().dickOfTheDay || dickOfTheDay,
                                ownGoals: operations.increment(ownGoals)
                            });
                        }
                    });
            });
        });
    }));

exports.teamStatsByWeek = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('teams').doc(data.teamId).get().then(result => {
            if (result.exists) {
                return ({ ...result.data(), id: result.id });
            }
            throw new functions.https.HttpsError('not-found', 'No team with that id exists');
        })
            .then(team => db.collection('player-points')
                .where('team', '==', team.team_name)
                .where('week', '<=', data.maxWeek)
                .where('week', '>=', data.minWeek)
                .get()
                .then(
                    result => result.docs.map(doc => ({ ...doc.data(), id: doc.id }))
                ));
    });

const updateExtraResultsHistory = (uid, data) => {
    getDisplayName(uid).then(user => {
        db.collection('results-history').doc(constants.resultsHistoryId).get().then(doc => {
            if (!doc.exists) {
                return Promise.resolve();
            }

            const uniqueKeys = lodash.uniq(Object.keys(data).filter(x => data[x] !== null).filter(x => !common.isNumber(data[x])));
            const playerPromises = [];

            uniqueKeys.map(key => playerPromises.push(db.collection('players').doc(data[key]).get()
                .then(player => {
                    if (player.exists) return ({ name: player.data().name, id: player.id, stat: key });
                    throw new functions.https.HttpsError('not-found', 'Invalid player ID');
                })));

            return Promise.all(playerPromises).then(players => {
                const update = {
                    author: {
                        uid,
                        displayName: user.displayName,
                        email: user.email
                    },
                    date: new Date(),
                    type: constants.resultHistoryTypes.EXTRA_STATS,
                    week: data.gameWeek
                };

                players.forEach(playerStats => {
                    const { stat, ...rest } = playerStats;
                    update[stat] = rest;
                });

                return db.collection('results-history').doc(constants.resultsHistoryId).update({
                    history: [update, ...doc.data().history]
                });
            });
        });
    });
};

// This is used to add own goals, yellow cards, red cards, penalties missed, penalties saved only
exports.submitExtraResults = functions
    .region(constants.region)
    .https.onCall((data, context) => common.hasPermission(context.auth.uid,
        constants.PERMISSIONS.SUBMIT_RESULT)
        .then(() => {
            const uniqueKeys = lodash.uniq(Object.values(data).filter(x => x !== null).filter(x => !common.isNumber(x)));

            uniqueKeys.forEach(id => {
                const points = common.calculatePoints(null,
                    0, 0, false, data.redCard === id, data.yellowCard === id, false, data.ownGoal === id ? 1 : 0,
                    data.penaltySaved === id ? 1 : 0, data.penaltyMissed === id ? 1 : 0);
                db.collection('player-points').where('player_id', '==', id).where('week', '==', data.gameWeek).get()
                    .then(playerDocs => {
                        if (playerDocs.empty) {
                            db.collection('players').doc(id).get().then(player => {
                                db.collection('player-points').add({
                                    player_id: id,
                                    week: data.gameWeek,
                                    goals: 0,
                                    assists: 0,
                                    cleanSheet: false,
                                    redCard: data.redCard === id,
                                    yellowCard: data.yellowCard === id,
                                    manOfTheMatch: false,
                                    position: player.data().position,
                                    points,
                                    dickOfTheDay: false,
                                    ownGoals: data.ownGoal === id ? 1 : 0,
                                    team: player.data().team,
                                    name: player.data().name,
                                    penaltyMisses: data.penaltyMissed === id ? 1 : 0,
                                    penaltySaves: data.penaltySaved === id ? 1 : 0
                                });
                            });
                        } else if (playerDocs.size > 1) {
                            throw new functions.https.HttpsError('invalid-argument', 'Somehow that player points has multiple entries');
                        } else {
                            playerDocs.docs[0].ref.update({
                                redCard: data.redCard === id,
                                yellowCard: data.yellowCard === id,
                                ownGoals: data.ownGoal === id ? operations.increment(1) : operations.increment(0),
                                penaltyMisses: data.penaltyMissed === id ? operations.increment(1) : operations.increment(0),
                                penaltySaves: data.penaltySaved === id ? operations.increment(1) : operations.increment(0),
                                points: operations.increment(points)
                            });
                        }
                    });
            });
            updateExtraResultsHistory(context.auth.uid, data);
            return Promise.resolve();
        }));
