const admin = require('firebase-admin');
const functions = require('firebase-functions');
const common = require('./common');
const constants = require('./constants');

const db = admin.firestore();

const operations = admin.firestore.FieldValue;

exports.submitHighlightForApproval = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('highlight-requests').where('userId', '==', context.auth.uid).get().then(
            requests => {
                if (requests.size >= 3) {
                    throw new functions.https.HttpsError('invalid-argument', 'A maximum 3 requests are allowed to be active');
                }
                return db.collection('highlight-requests').add({
                    userId: context.auth.uid,
                    videoId: data.videoId,
                    title: data.title,
                    email: data.email,
                    dateCreated: operations.serverTimestamp()
                });
            }
        );
    });

exports.getHighlightsForApproval = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);

        const hasPermission = (uid, permission) => admin.auth().getUser(uid).then(user => {
            const userClaims = user.customClaims;
            console.log('user claims', userClaims);
            if (userClaims === undefined) {
                console.log('undefined');
                throw new functions.https.HttpsError('unauthenticated', 'You are not authorized to perform this operation');
            }


            // Iterate over claims (which represent their ROLES)
            // If their role includes the permission, return true
            if (!Object.keys(userClaims).reduce((acc, curVal) => (userClaims[curVal] && constants.ROLE_PERMISSIONS[curVal]
                .includes(permission) ? true : acc), false)) {
                throw new functions.https.HttpsError('unauthenticated', 'You are not authorized to perform this operation');
            }
        });

        return common.hasPermission(context.auth.uid, constants.PERMISSIONS.APPROVE_HIGHLIGHTS)
            .then(() => db.collection('highlight-requests').get()
                .then(result => result.docs.map(x => ({ ...x.data(), id: x.id }))));
    });

exports.getHighlights = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('highlights').orderBy('dateCreated', 'desc').get()
            .then(result => result.docs.map(x => ({ ...x.data(), id: x.id })));
    });

// Requires permission of `APPROVE_HIGHLIGHTS`
exports.approveHighlight = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.hasPermission(context.auth.uid, constants.PERMISSIONS.APPROVE_HIGHLIGHTS)
            .then(() => db.collection('highlight-requests').doc(data.highlightId).get()
                .then(doc => db.collection('highlights').add({ ...doc.data(), upvotes: [], downvotes: [] })
                    .then(() => doc.ref.delete())));
    });

exports.rejectHighlight = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('highlight-requests').doc(data.highlightId).get()
            .then(doc => db.collection('highlights-rejected').add({ ...doc.data(), reason: data.reason })
                .then(() => doc.ref.delete()));
    });

exports.upvoteHighlight = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('highlights').doc(data.highlightId).update({
            upvotes: operations.arrayUnion(context.auth.uid),
            downvotes: operations.arrayRemove(context.auth.uid)
        }).then(() => db.collection('highlights').doc(data.highlightId).get()
            .then(doc => ({ ...doc.data(), id: doc.id })));
    });

exports.downvoteHighlight = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('highlights').doc(data.highlightId).update({
            upvotes: operations.arrayRemove(context.auth.uid),
            downvotes: operations.arrayUnion(context.auth.uid)
        }).then(() => db.collection('highlights').doc(data.highlightId).get()
            .then(doc => ({ ...doc.data(), id: doc.id })));
    });


exports.fetchUserHighlightsToBeApproved = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('highlight-requests').where('userId', '==', context.auth.uid).get()
            .then(result => result.docs.map(x => ({ ...x.data(), id: x.id })));
    });

exports.fetchRejectedHighlights = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('highlights-rejected').where('userId', '==', context.auth.uid).get()
            .then(result => result.docs.map(x => ({ ...x.data(), id: x.id })));
    });
