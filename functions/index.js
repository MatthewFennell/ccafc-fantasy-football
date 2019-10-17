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

exports.updateDisplayName = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        if (!data.displayName) {
            throw new functions.https.HttpsError('invalid-argument', 'Must provide a valid display name');
        }
        common.isAuthenticated(context);
        return db.collection('users').doc(context.auth.uid).update({
            displayName: data.displayName
        }).then(
            () => db.collection('leagues-points').where('user_id', '==', context.auth.uid).get().then(
                leagues => leagues.docs.map(league => league.ref.update({
                    username: data.displayName
                }))
            )
        );
    });
