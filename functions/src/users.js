const admin = require('firebase-admin');
const functions = require('firebase-functions');
const common = require('./common');
const constants = require('./constants');

const db = admin.firestore();

exports.userInfoForWeek = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('weekly-teams').where('week', '==', data.week).where('user_id', '==', data.userId).get()
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
                    return {
                        ...result,
                        average_points: 0,
                        highest_points: {
                            points: 0,
                            userId: context.auth.uid
                        }
                    };
                }
                const numberOfRealTeams = weeklyDocs.docs
                    .filter(x => x.data().player_ids.length > 0).length || 1;

                const averagePoints = weeklyDocs.docs
                    .reduce((acc, curVal) => acc + curVal.data().points, 0) / numberOfRealTeams;

                const maxPoints = weeklyDocs.docs.reduce((prev, current) => (
                    (prev.data().points > current.data().points) ? prev : current));
                return {
                    ...result,
                    average_points: averagePoints,
                    highest_points: {
                        points: maxPoints.data().points,
                        id: maxPoints.id,
                        userId: maxPoints.data().user_id
                    }
                };
            }));
    });

exports.userStats = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('users').doc(data.userId).get().then(
            user => {
                if (!user.exists) {
                    return ({
                        remaining_budget: 0,
                        remaining_transfers: 0,
                        total_points: 0
                    });
                }
                return ({
                    remaining_budget: user.data().remaining_budget,
                    remaining_transfers: user.data().remaining_transfers,
                    total_points: user.data().total_points
                });
            }
        );
    });

exports.maxGameWeek = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('application-info').doc(constants.applicationInfoId).get().then(
            result => {
                if (!result.exists) {
                    throw new functions.https.HttpsError('invalid-argument', 'Server Error. Something has gone wrong');
                }
                return result.data().total_weeks;
            }
        );
    });

exports.getUser = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('users').doc(data.userId).get().then(doc => {
            if (doc.exists) {
                const { displayName, teamName, photoUrl } = doc.data();

                return ({
                    displayName,
                    teamName,
                    photoUrl
                });
            }
            throw new functions.https.HttpsError('invalid-argument', 'Server Error. User does not exist');
        });
    });
