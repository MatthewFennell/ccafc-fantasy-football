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

exports.userInfoForWeek = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('weekly-teams').where('week', '==', data.week).where('user_id', '==', context.auth.uid).get()
            .then(
                query => {
                    if (query.size > 1) {
                        throw new functions.https.HttpsError('invalid-argument', 'Server Error. You should not have more than 1 entry in weekly-teams');
                    }
                    if (query.size === 0) {
                        return ({
                            week_points: 0
                        });
                    }
                    const weekOfInterest = query.docs[0];
                    return ({
                        week_points: weekOfInterest.data().points
                    });
                }
            )
            .then(result => db.collection('weekly-teams').where('week', '==', data.week).get().then(weeklyDocs => {
                if (weeklyDocs.size === 0) {
                    return result;
                }
                const averagePoints = weeklyDocs.docs
                    .reduce((acc, curVal) => acc + curVal.data().points, 0) / weeklyDocs.size;

                const maxPoints = weeklyDocs.docs.reduce((prev, current) => (
                    (prev.data().points > current.data().points) ? prev : current));
                return {
                    ...result,
                    average_points: averagePoints,
                    highest_points: {
                        points: maxPoints.data().points,
                        id: maxPoints.id
                    }
                };
            }));
    });

exports.userStats = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('users').doc(context.auth.uid).get().then(
            user => ({
                remaining_budget: user.data().remaining_budget,
                remaining_transfers: user.data().remaining_transfers,
                total_points: user.data().total_points
            })
        );
    });
