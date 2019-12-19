/* eslint-disable max-len */
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const fp = require('lodash/fp');
const lodash = require('lodash');
const firestore = require('@google-cloud/firestore');
const constants = require('./src/constants');
const common = require('./src/common');

const client = new firestore.v1.FirestoreAdminClient();
const bucket = 'gs://learning-backups';

const config = functions.config();

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
exports.listeners = require('./src/listeners');
exports.onSignUp = require('./src/onSignUp');
exports.onDelete = require('./src/onDelete');
exports.firestore = require('./src/firestoreExports');
exports.management = require('./src/management');
exports.highlights = require('./src/highlights');

const operations = admin.firestore.FieldValue;
// currently at v8.13.0 for node

// // https://firebase.google.com/docs/reference/js/firebase.functions.html#functionserrorcod

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
            return Promise.resolve();
        }));
