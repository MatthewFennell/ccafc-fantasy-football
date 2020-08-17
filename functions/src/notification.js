const admin = require('firebase-admin');
const functions = require('firebase-functions');
const common = require('./common');

const constants = require('./constants');

const db = admin.firestore();

const operations = admin.firestore.FieldValue;

exports.removeNotification = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);

        if (!data.notification) {
            throw new functions.https.HttpsError('invalid-argument', 'No notification provided');
        }
        return db.collection('users').doc(context.auth.uid).get().then(user => {
            user.ref.update({
                notifications: operations.arrayRemove(data.notification)
            });
        });
    });

exports.addNotification = functions
    .region(constants.region)
    .https.onCall((data, context) => common.hasPermission(context.auth.uid, constants.PERMISSIONS.ADD_NOTIFICATIONS)
        .then(() => {
            if (!data.notification) {
                throw new functions.https.HttpsError('invalid-argument', 'No notification provided');
            }
            return db.collection('users').get().then(users => {
                const numberOfBatches = Math.ceil(users.docs.length / constants.maxBatchSize);
                const userBatches = [];
                for (let x = 0; x < numberOfBatches; x += 1) {
                    userBatches.push(db.batch());
                }
                users.docs.forEach((user, index) => {
                    const batchToTarget = Math.floor(index / constants.maxBatchSize);
                    const docRef = db.collection('users').doc(user.id);
                    userBatches[batchToTarget].update(docRef, {
                        notifications: operations.arrayUnion(data.notification)
                    });
                });
                userBatches.forEach((batch, index) => batch.commit().then(() => {
                    console.log('Commited batch at index: ', index, ' for adding notification');
                }));
            });
        }));
