const admin = require('firebase-admin');
const functions = require('firebase-functions');
const fp = require('lodash/fp');
const lodash = require('lodash');
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

const operations = admin.firestore.FieldValue;

exports.getUserProfile = functions
    .region('europe-west2')
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db
            .collection('users').doc(context.auth.uid).get()
            .then(user => ({ data: user.data(), id: user.id }));
    });
