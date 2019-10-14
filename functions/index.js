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
