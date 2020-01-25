const admin = require('firebase-admin');
const functions = require('firebase-functions');
const moment = require('moment');
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
                        if (requests.size > 10) {
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

exports.addCommentToFeature = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('feature-requests').doc(data.featureId).get()
            .then(feature => {
                if (!feature.exists) {
                    throw new functions.https.HttpsError('not-found', 'Invalid Feature ID');
                }

                const getDisplayName = id => db.collection('users').doc(id).get()
                    .then(user => user.data().displayName,);

                const { id } = db.collection('feature-requests').doc();

                return getDisplayName(context.auth.uid).then(displayName => feature.ref.update({
                    comments: [...feature.data().comments, {
                        displayName,
                        message: data.comment,
                        date: moment().format(),
                        id,
                        comments: []
                    }]
                }));
            });
    });


exports.addReplyToComment = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('feature-requests').doc(data.featureId).get()
            .then(feature => {
                if (!feature.exists) {
                    throw new functions.https.HttpsError('not-found', 'Invalid Feature ID');
                }

                const getDisplayName = id => db.collection('users').doc(id).get()
                    .then(user => user.data().displayName,);

                return getDisplayName(context.auth.uid)
                    .then(displayName => feature.ref.update({
                        comments: feature.data().comments.map(x => (x.id === data.commentId ? {
                            ...x,
                            comments: [...x.comments, {
                                displayName,
                                message: data.reply,
                                date: moment().format()
                            }]
                        } : x))
                    }));
            });
    });
