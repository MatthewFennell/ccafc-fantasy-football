const admin = require('firebase-admin');
const functions = require('firebase-functions');
const fp = require('lodash');

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
                return ({ id: playerId, position: player.data().position });
            })));

        Promise.all(playerPromises).then(playerPositionsArray => {
            const playerPositions = playerPositionsArray
                .reduce((acc, cur) => ({ ...acc, [cur.id]: cur.position.toUpperCase() }), {});

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
                            .map(weeklyDoc => ({ data: weeklyDoc.data(), id: weeklyDoc.id, player_id: playerId })))));

                    Promise.all(weeklyTeamsPromises).then(weeklyTeams => {
                        console.log('Number of weekly teams', weeklyTeams.length);
                        console.log('weekly TEAMS pre flat', weeklyTeams);
                        console.log('weekly TEAMS post flat', fp.flattenDeep(weeklyTeams));
                        fp.flattenDeep(weeklyTeams).map(weeklyTeam => {
                            console.log('weekly team', weeklyTeam);
                            console.log('data', data);
                            const numberOfGoals = data.players[weeklyTeam.player_id].goals;
                            console.log('Number of goals = ', numberOfGoals, ' by ', weeklyTeam.player_id);
                        });
                    });
                });
            });
        });
    });
