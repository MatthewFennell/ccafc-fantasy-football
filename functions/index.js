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

exports.deleteTeam = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        if (!data.teamName || !data.teamId) {
            throw new functions.https.HttpsError('invalid-argument', 'Must provide a valid team id and name');
        }
        return db.collection('players').where('team', '==', data.teamName).get()
            .then(docs => {
                if (docs.size > 0) {
                    throw new functions.https.HttpsError('invalid-argument', 'A player is associated with that team, so it cannot be deleted');
                }
                return db.collection('teams').doc(data.teamId).delete();
            });
    });
