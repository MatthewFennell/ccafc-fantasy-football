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

exports.getPlayersInTeam = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        if (!data.teamName) {
            throw new functions.https.HttpsError('invalid-argument', 'You must enter a team name');
        }
        common.isAuthenticated(context);
        return db
            .collection('players').where('team', '==', data.teamName).get()
            .then(docs => docs.docs.map(doc => ({
                name: doc.data().name,
                position: doc.data().position,
                id: doc.id
            })));
    });
