const admin = require('firebase-admin');
const functions = require('firebase-functions');
const common = require('./common');
const constants = require('./constants');

const operations = admin.firestore.FieldValue;
const db = admin.firestore();

const getDisplayName = id => db.collection('users').doc(id).get()
    .then(user => ({
        displayName: user.data().displayName,
        email: user.data().email
    }));

const updateHistory = (uid, week) => {
    getDisplayName(uid).then(user => {
        db.collection('results-history').doc(constants.resultsHistoryId).get().then(doc => {
            const update = {
                author: {
                    displayName: user.displayName,
                    email: user.email,
                    uid
                },
                date: new Date(),
                type: constants.resultHistoryTypes.TRIGGER_WEEK,
                week
            };

            if (!doc.exists) {
                db.collection('results-history').doc(constants.resultsHistoryId).set({
                    history: [update]
                });
            } else {
                db.collection('results-history').doc(constants.resultsHistoryId).update({
                    history: [update, ...doc.data().history]
                });
            }
        });
    });
};

exports.triggerWeeklyTeams = functions
    .region(constants.region)
    .https.onCall((data, context) => common.hasPermission(context.auth.uid,
        constants.PERMISSIONS.TRIGGER_WEEK).then(() => db.collection('application-info').doc(constants.applicationInfoId).get()
        .then(appInfo => {
            if (appInfo.data().total_weeks + 1 !== data.week) {
                throw new functions.https.HttpsError('invalid-argument', `Invalid week. The next week should be ${appInfo.data().total_weeks + 1}`);
            }
            return Promise.resolve();
        })
        .then(() => db.collection('active-teams').get()
            .then(querySnapshot => {
                db.collection('application-info').doc(constants.applicationInfoId).get().then(doc => {
                    if (doc.exists) {
                        doc.ref.update({
                            total_weeks: operations.increment(1)
                        });
                        updateHistory(context.auth.uid, data.week);
                    } else {
                        common.log(context.auth.uid, 'Application Info doc does not exist');
                        throw new functions.https.HttpsError('invalid-argument', 'Server Error. Something has gone wrong');
                    }
                });

                const numberOfBatches = Math.ceil(querySnapshot.docs.length / constants.maxBatchSize);

                const batches = [];
                for (let x = 0; x < numberOfBatches; x += 1) {
                    batches.push(db.batch());
                }

                querySnapshot.docs.forEach((doc, index) => {
                    const batchToTarget = Math.floor(index / constants.maxBatchSize);
                    const weeklyTeamRef = db.collection('weekly-teams').doc();
                    batches[batchToTarget].set(weeklyTeamRef, {
                        user_id: doc.data().user_id,
                        week: data.week,
                        points: 0,
                        player_ids: doc.data().player_ids,
                        captain: doc.data().captain || null
                    });
                });

                batches.forEach((batch, index) => batch.commit().then(() => {
                    console.log('Commited batch at index: ', index, ' for creating weekly teams');
                }));
            }))));
