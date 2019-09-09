const admin = require('firebase-admin');
const functions = require('firebase-functions');
const commonFunctions = require('./common');

const db = admin.firestore();

exports.triggerWeeklyTeams = functions
    .region('europe-west2')
    .https.onCall((data, context) => {
        commonFunctions.isAuthenticated(context);
        const batch = db.batch();
        return db
            .collection('active-teams')
            .get()
            .then(querySnapshot => querySnapshot.docs
                .map(doc => {
                    const weekRef = db.collection('weekly-teams').doc();
                    return batch.set(weekRef, {
                        user_id: doc.data().user_id,
                        week: data.week,
                        participants: doc.data().participants,
                        points: 0
                    });
                })).then(() => batch.commit());
    });
