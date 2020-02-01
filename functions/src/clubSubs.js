const admin = require('firebase-admin');
const functions = require('firebase-functions');
const common = require('./common');
const constants = require('./constants');

const db = admin.firestore();

// TO;DO permissions for this function
exports.setHasPaidSubs = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        const setPaidSubsPromises = [];
        data.changes.forEach(change => {
            setPaidSubsPromises.push(db.collection('players').doc(change.playerId).get().then(
                player => {
                    if (!player.exists) {
                        throw new functions.https.HttpsError('not-found', 'Invalid player ID');
                    }
                    return player.ref.update({
                        hasPaidSubs: change.hasPaidSubs
                    });
                }
            ));
        });
        Promise.all(setPaidSubsPromises);
    });
