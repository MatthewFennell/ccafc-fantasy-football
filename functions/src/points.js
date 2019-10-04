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

            Promise.all(playerPromises).then(playerPositionsArray => {
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
                    doc.ref.update({
                        goalsFor: operations.increment(data.goalsFor),
                        goalsAgainst: operations.increment(data.goalsAgainst),
                        wins: operations.increment(data.goalsFor > data.goalsAgainst ? 1 : 0),
                        draws: operations.increment(data.goalsFor === data.goalsAgainst ? 1 : 0),
                        losses: operations.increment(data.goalsFor < data.goalsAgainst ? 1 : 0)
                    });
                })
                    .then(() => {
                    // Update or create player points object
                        playerIds.forEach(playerId => {
                            const {
                                position, goals, assists, cleanSheet, redCard, yellowCard
                            } = playerStats[playerId];
                            const points = common.calculatePoints(position,
                                goals, assists, cleanSheet, redCard, yellowCard);
                            db.collection('player-points').where('player_id', '==', playerId).get().then(
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
                    })
                    .then(() => {
                        const weeklyTeamsPromises = [];

                        // All weekly teams that contain a player for a given week
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
                            lodash.flattenDeep(weeklyTeams).forEach(weeklyTeam => {
                                const {
                                    position, goals, assists, cleanSheet, redCard, yellowCard
                                } = playerStats[weeklyTeam.player_id];
                                const pointsIncrease = common.calculatePoints(position,
                                    goals, assists, cleanSheet, redCard, yellowCard);
                                db.collection('weekly-teams').doc(weeklyTeam.id).update({
                                    points: operations.increment(pointsIncrease)
                                });
                            });
                        });
                    })
                    .then(() => {
                    // Update the players table
                        playerPositionsArray.forEach(player => {
                            const {
                                position, goals, assists, cleanSheet, redCard, yellowCard
                            } = playerStats[player.id];
                            const pointsIncrease = common.calculatePoints(position,
                                goals, assists, cleanSheet, redCard, yellowCard);
                            player.ref.update({
                                goals: operations.increment(goals),
                                assists: operations.increment(assists),
                                points: operations.increment(pointsIncrease)
                            });
                        });
                    })
                    .then(() => {
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
                            const userLeaguesPromises = [];
                            lodash.flattenDeep(weeklyPlayers).forEach(weekPlayer => {
                                const {
                                    position, goals, assists, cleanSheet, redCard, yellowCard
                                } = playerStats[weekPlayer.player_id];
                                const pointsIncrease = common.calculatePoints(position,
                                    goals, assists, cleanSheet, redCard, yellowCard);
                                db.collection('weekly-players').doc(weekPlayer.id).update({
                                    points: operations.increment(pointsIncrease)
                                });
                                // Add points to the user
                                db.collection('users').doc(weekPlayer.user_id).get().then(
                                    user => {
                                        if (!user.exists) {
                                            throw new functions.https.HttpsError('not-found', 'User does not exist');
                                        }
                                        user.ref.update({
                                            total_points: operations.increment(pointsIncrease)
                                        });
                                    }
                                );
                                userLeaguesPromises.push(db.collection('leagues-points')
                                    .where('user_id', '==', weekPlayer.user_id).where('start_week', '<=', data.week).get()
                                    .then(
                                        userLeagues => userLeagues.docs.map(
                                            leagueDoc => ({
                                                data: leagueDoc.data(),
                                                id: leagueDoc.id,
                                                player_id: weekPlayer.player_id,
                                                ref: leagueDoc.ref
                                            })
                                        )
                                    ));
                            });

                            // Update all the leagues for each user
                            Promise.all(userLeaguesPromises).then(userLeagues => {
                                lodash.flattenDeep(userLeagues).forEach(league => {
                                    const {
                                        position, goals, assists, cleanSheet, redCard, yellowCard
                                    } = playerStats[league.player_id];
                                    const incr = common.calculatePoints(position,
                                        goals, assists, cleanSheet, redCard, yellowCard);
                                    league.ref.update({
                                        user_points: operations.increment(incr)
                                    });
                                });
                            });
                        });
                    });
            });
        });
    });
