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

exports.editPlayerStats = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        console.log('difference', data.difference);
        return db.collection('player-points').where('player_id', '==', data.playerId).where('week', '==', data.week).get()
            .then(
                result => {
                    if (result.size === 0) {
                        db.collection('player-points').add({
                            week: data.week,
                            player_id: data.playerId,
                            goals: fp.has('goals')(data.difference) ? data.difference.goals : 0,
                            assists: fp.has('assists')(data.difference) ? data.difference.assists : 0,
                            cleanSheet: fp.has('cleanSheet')(data.difference) ? data.difference.cleanSheet : false,
                            redCard: fp.has('redCard')(data.difference) ? data.difference.redCard : false,
                            yellowCard: fp.has('yellowCard')(data.difference) ? data.difference.yellowCard : false,
                            manOfTheMatch: fp.has('manOfTheMatch')(data.difference) ? data.difference.manOfTheMatch : false
                        });
                    }
                    if (result.size > 1) {
                        throw new functions.https.HttpsError('invalid-argument', 'There are multiple player points entries');
                    }

                    const doc = result.docs[0];

                    return result.docs[0].ref.update({
                        goals: fp.has('goals')(data.difference) ? data.difference.goals : doc.data().goals,
                        assists: fp.has('assists')(data.difference) ? data.difference.assists : doc.data().assists,
                        cleanSheet: fp.has('cleanSheet')(data.difference) ? data.difference.cleanSheet : doc.data().cleanSheet,
                        redCard: fp.has('redCard')(data.difference) ? data.difference.redCard : doc.data().redCard,
                        yellowCard: fp.has('yellowCard')(data.difference) ? data.difference.yellowCard : doc.data().yellowCard,
                        manOfTheMatch: fp.has('manOfTheMatch')(data.difference) ? data.difference.manOfTheMatch : doc.data().manOfTheMatch
                    });
                }
            );
    });
