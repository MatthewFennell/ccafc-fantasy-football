/* eslint-disable max-len */
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const fp = require('lodash/fp');
const lodash = require('lodash');
const constants = require('./src/constants');
const common = require('./src/common');

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
exports.on = require('./src/onDelete');

const operations = admin.firestore.FieldValue;

exports.teamStatsByWeek = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('teams').doc(data.teamId).get().then(result => {
            if (result.exists) {
                return ({ ...result.data(), id: result.id });
            }
            throw new functions.https.HttpsError('not-found', 'No team with that id exists');
        })
            .then(team => db.collection('player-points').where('team', '==', team.team_name).where('week', '==', data.week).get()
                .then(
                    result => result.docs.map(doc => ({ ...doc.data(), id: doc.id }))
                ));
    });
