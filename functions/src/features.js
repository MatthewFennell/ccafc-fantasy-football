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

        const getDisplayName = id => common.getCorrectYear(db).collection('users').doc(id).get()
            .then(user => user.data().displayName);

        return getDisplayName(context.auth.uid)
            .then(displayName => common.getCorrectYear(db).collection('feature-requests')
                .where('userId', '==', context.auth.uid).get()
                .then(
                    requests => {
                        console.log("displayName", displayName);
                        console.log("isBug", data.isBug);
                        console.log("description", data.description);
                        console.log("dateCreated", operations.serverTimestamp());
                        if (requests.size >= 10) {
                            throw new functions.https.HttpsError('invalid-argument', 'A maximum 10 requests are allowed to be active');
                        }

                        common.getCorrectYear(db).collection('feature-requests').add({
                            isBug: data.isBug,
                            userId: context.auth.uid,
                            description: data.description,
                            dateCreated: operations.serverTimestamp(),
                            displayName,
                            comments: []
                        });
                    }
                ));
    });

exports.deleteFeatureRequest = functions
    .region(constants.region)
    .https.onCall((data, context) => common.hasPermission(context.auth.uid,
        constants.PERMISSIONS.MANAGE_BUGS)
        .then(() => {
            common.isAuthenticated(context);
            return common.getCorrectYear(db).collection('feature-requests').doc(data.featureId).delete();
        }));
