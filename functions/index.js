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

exports.userInfo = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('users').doc(context.auth.uid).get().then(
            user => ({
                remaining_budget: user.data().remaining_budget,
                remaining_transfers: user.data().remaining_transfers,
                total_points: user.data().total_points
            })
        )
            .then(result => db.collection('application-info').get().then(
                docs => {
                    if (docs.size !== 1) {
                        throw new functions.https.HttpsError('invalid-argument', 'Server Error. Too many application info documents');
                    }
                    const applicationInfoDoc = docs.docs[0];
                    return ({
                        ...result,
                        game_week: applicationInfoDoc.data().total_weeks
                    });
                }
            ))
            .then(result => db.collection('weekly-teams').where('week', '==', result.game_week).where('user_id', '==', context.auth.uid).get()
                .then(docs => {
                    if (docs.size !== 1) {
                        throw new functions.https.HttpsError('invalid-argument', 'Server Error. You should only have 1 entry in weekly-teams');
                    }
                    const weekOfInterest = docs.docs[0];
                    return ({
                        ...result,
                        week_points: weekOfInterest.data().points
                    });
                }));
    });
