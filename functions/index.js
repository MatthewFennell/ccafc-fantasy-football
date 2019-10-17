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

exports.makeCaptain = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('active-teams').where('user_id', '==', context.auth.uid).get().then(
            result => {
                if (result.size > 1) {
                    throw new functions.https.HttpsError('invalid-argument', 'Server Error. You have multiple active teams');
                }
                if (result.size === 0) {
                    throw new functions.https.HttpsError('invalid-argument', 'Server Error. You don\'t have an active team');
                }
                return result.docs[0].ref.update({
                    captain: data.playerId
                });
            }
        );
    });
