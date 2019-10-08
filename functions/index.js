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

const operations = admin.firestore.FieldValue;

exports.createLeague = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        const getDisplayName = id => db.collection('users').doc(id).get().then(user => user.data().displayName);

        if (!data.leagueName) {
            throw new functions.https.HttpsError('invalid-argument', 'Cannot create a league with an empty name');
        }

        return getDisplayName(context.auth.uid).then(displayName => db.collection('leagues')
            .add({
                owner: context.auth.uid,
                start_week: data.startWeek || 0,
                name: data.leagueName
            }).then(docRef => {
                db.collection('leagues-points').add({
                    league_id: docRef.id,
                    user_id: context.auth.uid,
                    start_week: data.startWeek || 0,
                    name: data.leagueName,
                    user_points: 0,
                    username: displayName
                });
            }));
    });
