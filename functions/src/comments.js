const admin = require('firebase-admin');
const functions = require('firebase-functions');
const moment = require('moment');
const lodash = require('lodash');
const fp = require('lodash/fp');
const common = require('./common');
const constants = require('./constants');

const db = admin.firestore();

// data.collection = firestore collection to add to
// data.collectionId = id of item in that collection
exports.addComment = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        if (!data.comment) {
            throw new functions.https.HttpsError('invalid-argument', 'Must provide a valid comment');
        }
        common.isAuthenticated(context);
        return common.getCorrectYear(db).collection(data.collection).doc(data.collectionId).get()
            .then(item => {
                if (!item.exists) {
                    common.log(context.auth.uid, 'Item to comment on not found',
                        { Collection: data.collection, CollectionID: data.collectionId });
                    throw new functions.https.HttpsError('not-found', 'Invalid ID');
                }
                const getDisplayName = id => common.getCorrectYear(db).collection('users').doc(id).get()
                    .then(user => ({
                        displayName: user.data().displayName,
                        photoUrl: user.data().photoUrl
                    }));

                const { id } = common.getCorrectYear(db).collection('users').doc();
                return getDisplayName(context.auth.uid)
                    .then(user => item.ref.update({
                        comments: [...item.data().comments, {
                            displayName: user.displayName,
                            message: data.comment,
                            date: moment().format(),
                            id,
                            userId: context.auth.uid,
                            comments: [],
                            photoUrl: user.photoUrl
                        }]
                    }));
            })
            .then(() => common.getCorrectYear(db).collection(data.collection).doc(data.collectionId).get()
                .then(item => ({
                    ...item.data(), id: item.id
                })));
    });

exports.addReply = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);

        if (!data.reply) {
            throw new functions.https.HttpsError('invalid-argument', 'Must provide a valid reply');
        }

        return common.getCorrectYear(db).collection(data.collection).doc(data.collectionId).get()
            .then(item => {
                if (!item.exists) {
                    common.log(context.auth.uid, 'Item to comment on not found',
                        { Collection: data.collection, CollectionID: data.collectionId });
                    throw new functions.https.HttpsError('not-found', 'Invalid ID');
                }
                const getDisplayName = id => common.getCorrectYear(db).collection('users').doc(id).get()
                    .then(user => ({
                        displayName: user.data().displayName,
                        photoUrl: user.data().photoUrl
                    }));
                const { id } = common.getCorrectYear(db).collection('users').doc();
                return getDisplayName(context.auth.uid)
                    .then(user => item.ref.update({
                        comments: item.data().comments.map(x => (x.id === data.commentId ? {
                            ...x,
                            comments: [...x.comments, {
                                displayName: user.displayName,
                                userId: context.auth.uid,
                                message: data.reply,
                                date: moment().format(),
                                id,
                                photoUrl: user.photoUrl
                            }]
                        } : x))
                    }));
            })
            .then(() => common.getCorrectYear(db).collection(data.collection).doc(data.collectionId).get()
                .then(item => ({
                    ...item.data(), id: item.id
                })));
    });

exports.deleteComment = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return common.getCorrectYear(db).collection(data.collection).doc(data.collectionId).get()
            .then(item => {
                if (!item.exists) {
                    common.log(context.auth.uid, 'Item to comment on not found',
                        { Collection: data.collection, CollectionID: data.collectionId });
                    throw new functions.https.HttpsError('not-found', 'Invalid ID');
                }
                if (!lodash.get(item.data().comments.find(x => x.id === data.commentId), 'userId') === context.auth.uid) {
                    throw new functions.https.HttpsError('unauthenticated', 'You are not authorized to perform this operation');
                }
                return item.ref.update({
                    comments: item.data().comments.filter(x => x.id !== data.commentId)
                });
            });
    });

exports.deleteReply = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return common.getCorrectYear(db).collection(data.collection).doc(data.collectionId).get()
            .then(item => {
                if (!item.exists) {
                    common.log(context.auth.uid, 'Item to comment on not found',
                        { Collection: data.collection, CollectionID: data.collectionId });
                    throw new functions.https.HttpsError('not-found', 'Invalid ID');
                }

                const id = fp.flow(
                    fp.get('comments'),
                    fp.find(x => x.id === data.replyId),
                    fp.get('userId')
                )(item.data().comments.find(x => x.id === data.commentId));

                if (id !== context.auth.uid) {
                    throw new functions.https.HttpsError('unauthenticated', 'You are not authorized to perform this operation');
                }

                return item.ref.update({
                    comments: item.data().comments.map(x => (x.id === data.commentId ? {
                        ...x,
                        comments: x.comments.filter(y => y.id !== data.replyId)
                    } : x))
                });
            });
    });
