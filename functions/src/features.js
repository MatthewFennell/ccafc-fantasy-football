const admin = require('firebase-admin');
const functions = require('firebase-functions');
const common = require('./common');
const constants = require('./constants');

const db = admin.firestore();

const operations = admin.firestore.FieldValue;

exports.submitFeature = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);

        const getDisplayName = id => db.collection('users').doc(id).get()
            .then(user => user.data().displayName,);

        return getDisplayName(context.auth.uid)
            .then(displayName => db.collection('feature-requests')
                .where('userId', '==', context.auth.uid).get().then(
                    requests => {
                        if (requests.size >= 10) {
                            throw new functions.https.HttpsError('invalid-argument', 'A maximum 10 requests are allowed to be active');
                        }

                        return db.collection('feature-requests').add({
                            userId: context.auth.uid,
                            description: data.description,
                            dateCreated: operations.serverTimestamp(),
                            displayName,
                            comments: []
                        });
                    }
                ));
    });
