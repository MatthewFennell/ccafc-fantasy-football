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

exports.getActiveTeam = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('active-teams').where('user_id', '==', data.userId).get().then(
            result => {
                if (result.size > 1) {
                    throw new functions.https.HttpsError('invalid-argument', 'Somehow you have multiple active teams');
                }
                if (result.size === 0) {
                    return [];
                }
                const activeTeam = result.docs[0];
                return activeTeam.data().player_ids;
            }
        )
            .then(
                playerIds => {
                    const playerPromises = [];

                    playerIds.map(playerId => playerPromises.push(db.collection('players').doc(playerId).get().then(doc => ({
                        name: doc.data().name,
                        position: doc.data().position,
                        team: doc.data().team
                    }))));

                    return Promise.all(playerPromises).then(result => result);
                }
            );
    });
