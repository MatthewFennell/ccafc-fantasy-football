const admin = require('firebase-admin');
const functions = require('firebase-functions');
const commonFunctions = require('./common');

const db = admin.firestore();

exports.addPlayerToActiveTeam = functions
    .region('europe-west2')
    .https.onCall((data, context) => {
        commonFunctions.isAuthenticated(context);
        const usersActiveTeam = db.collection('active-teams')
            .where('user_id', '==', context.auth.uid);
        return usersActiveTeam.get().then(querySnapshot => {
            querySnapshot.docs.map(doc => db.collection('active-teams').doc(doc.id).update({
                participants: admin.firestore.FieldValue.arrayUnion(data.playerId)
            }));
            return false;
        });
    });
