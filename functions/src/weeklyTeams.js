const admin = require('firebase-admin');
const functions = require('firebase-functions');
const common = require('./common');
const constants = require('./constants');

const db = admin.firestore();

exports.triggerWeeklyTeams = functions
    .region(constants.region)
    .https.onCall((data, context) => common.hasPermission(context.auth.uid,
        constants.PERMISSIONS.TRIGGER_WEEK).then(() => db.collection('application-info').get()
        .then(appInfo => appInfo.docs.map(doc => {
            if (doc.data().total_weeks + 1 !== data.week) {
                throw new functions.https.HttpsError('invalid-argument', `Invalid week. The next week should be ${doc.data().total_weeks + 1}`);
            }
            return Promise.resolve();
        }))
        .then(() => db.collection('active-teams').get()
            .then(querySnapshot => {
                db.collection('application-info').get().then(docs => docs.docs.map(doc => doc.ref.update({
                    total_weeks: admin.firestore.FieldValue.increment(1)
                })));

                const batchSize = 500;
                const numberOfBatches = Math.ceil(querySnapshot.docs.length / batchSize);

                const batches = [];
                for (let x = 0; x < numberOfBatches; x += 1) {
                    batches.push(db.batch());
                }

                querySnapshot.docs.forEach((doc, index) => {
                    const batchToTarget = Math.floor(index / batchSize);
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
                    console.log('Commited batch at index: ', index);
                }));
            }))));
