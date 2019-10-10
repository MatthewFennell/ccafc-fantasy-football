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

exports.deletePlayer = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        if (!data.playerId) {
            throw new functions.https.HttpsError('invalid-argument', 'Must provide a player id');
        }
        return db.collection('weekly-teams').where('player_ids', 'array-contains', data.playerId).get()
            .then(docs => {
                if (docs.size > 0) {
                    throw new functions.https.HttpsError('invalid-argument', 'That player exists in somebodys team. Cannot be deleted');
                }
                return db.collection('players').doc(data.playerId).delete();
            });
    });
