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
exports.listeners = require('./src/listeners');

const operations = admin.firestore.FieldValue;

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
                            yellowCard: false
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
                        yellowCard: result.docs[0].data().yellowCard
                    });
                }
            );
    });
