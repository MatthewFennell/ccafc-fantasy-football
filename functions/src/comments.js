const admin = require('firebase-admin');
const functions = require('firebase-functions');
const moment = require('moment');
const common = require('./common');
const constants = require('./constants');

const db = admin.firestore();

// data.collection = firestore collection to add to
// data.collectionId = id of item in that collection
exports.addComment = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection(data.collection).doc(data.collectionId).get()
            .then(item => {
                if (!item.exists) {
                    throw new functions.https.HttpsError('not-found', 'Invalid ID');
                }
                const getDisplayName = id => db.collection('users').doc(id).get()
                    .then(user => user.data().displayName,);

                const { id } = db.collection('users').doc();
                return getDisplayName(context.auth.uid)
                    .then(displayName => item.ref.update({
                        comments: [...item.data().comments, {
                            displayName,
                            message: data.comment,
                            date: moment().format(),
                            id,
                            userId: context.auth.uid,
                            comments: []
                        }]
                    }));
            })
            .then(() => db.collection(data.collection).doc(data.collectionId).get().then(item => ({
                ...item.data(), id: item.id
            })));
    });


exports.addReply = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection(data.collection).doc(data.collectionId).get()
            .then(item => {
                if (!item.exists) {
                    throw new functions.https.HttpsError('not-found', 'Invalid ID');
                }
                const getDisplayName = id => db.collection('users').doc(id).get()
                    .then(user => user.data().displayName);
                return getDisplayName(context.auth.uid)
                    .then(displayName => item.ref.update({
                        comments: item.data().comments.map(x => (x.id === data.commentId ? {
                            ...x,
                            comments: [...x.comments, {
                                displayName,
                                userId: context.auth.uid,
                                message: data.reply,
                                date: moment().format()
                            }]
                        } : x))
                    }));
            })
            .then(() => db.collection(data.collection).doc(data.collectionId).get().then(item => ({
                ...item.data(), id: item.id
            })));
    });
