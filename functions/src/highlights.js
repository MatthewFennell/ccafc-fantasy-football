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
        return admin.auth().getUser(context.auth.uid)
            .then(user => common.getCorrectYear(db).collection('highlight-requests').where('userId', '==', context.auth.uid).get()
                .then(
                    requests => {
                        if (requests.size >= 3) {
                            throw new functions.https.HttpsError('invalid-argument', 'A maximum 3 requests are allowed to be active');
                        }
                        return common.getCorrectYear(db).collection('highlight-requests').add({
                            userId: context.auth.uid,
                            videoId: data.videoId,
                            title: data.title,
                            email: user.email,
                            dateCreated: operations.serverTimestamp(),
                            upvotes: [context.auth.uid],
                            downvotes: [],
                            displayName: user.displayName,
                            comments: []
                        });
                    }
                ));
    });

exports.getHighlightsForApproval = functions
    .region(constants.region)
    .https.onCall((data, context) => common.hasPermission(context.auth.uid,
        constants.PERMISSIONS.APPROVE_HIGHLIGHTS)
        .then(() => common.getCorrectYear(db).collection('highlight-requests').get()
            .then(result => result.docs.map(x => ({ ...x.data(), id: x.id })))));

exports.getHighlights = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return common.getCorrectYear(db).collection('highlights').orderBy('dateCreated', 'desc').get()
            .then(result => result.docs.map(x => ({ ...x.data(), id: x.id })));
    });

exports.approveHighlight = functions
    .region(constants.region)
    .https.onCall((data, context) => common.hasPermission(context.auth.uid,
        constants.PERMISSIONS.APPROVE_HIGHLIGHTS)
        .then(() => common.getCorrectYear(db).collection('highlight-requests').doc(data.highlightId).get()
            .then(doc => common.getCorrectYear(db).collection('highlights').doc(doc.id).set({ ...doc.data() })
                .then(() => doc.ref.delete())
                .then(() => ({ ...doc.data(), id: doc.id })))));

exports.rejectHighlight = functions
    .region(constants.region)
    .https.onCall((data, context) => common.hasPermission(context.auth.uid,
        constants.PERMISSIONS.APPROVE_HIGHLIGHTS)
        .then(() => common.getCorrectYear(db).collection('highlight-requests').doc(data.highlightId).get()
            .then(doc => admin.auth().getUser(context.auth.uid).then(user => user.email)
                .then(email => common.getCorrectYear(db).collection('highlights-rejected')
                    .add({
                        ...doc.data(), rejectedBy: email, reason: data.reason
                    })
                    .then(() => doc.ref.delete())
                    .then(() => ({ ...doc.data(), id: doc.id }))))));

exports.upvoteHighlight = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return common.getCorrectYear(db).collection('highlights').doc(data.highlightId).update({
            upvotes: operations.arrayUnion(context.auth.uid),
            downvotes: operations.arrayRemove(context.auth.uid)
        })
            .then(() => common.getCorrectYear(db).collection('highlights').doc(data.highlightId).get()
                .then(doc => ({ ...doc.data(), id: doc.id })));
    });

exports.downvoteHighlight = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return common.getCorrectYear(db).collection('highlights').doc(data.highlightId).update({
            upvotes: operations.arrayRemove(context.auth.uid),
            downvotes: operations.arrayUnion(context.auth.uid)
        })
            .then(() => common.getCorrectYear(db).collection('highlights').doc(data.highlightId).get()
                .then(doc => ({ ...doc.data(), id: doc.id })));
    });

exports.fetchUserHighlightsToBeApproved = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return common.getCorrectYear(db).collection('highlight-requests').where('userId', '==', context.auth.uid).get()
            .then(result => result.docs.map(x => ({ ...x.data(), id: x.id })));
    });

exports.fetchRejectedHighlights = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return common.getCorrectYear(db).collection('highlights-rejected').where('userId', '==', context.auth.uid).get()
            .then(result => result.docs.map(x => ({ ...x.data(), id: x.id })));
    });

exports.deleteHighlight = functions
    .region(constants.region)
    .https.onCall((data, context) => common.hasPermission(context.auth.uid,
        constants.PERMISSIONS.APPROVE_HIGHLIGHTS)
        .then(() => common.getCorrectYear(db).collection('highlights').doc(data.highlightId).get()
            .then(doc => admin.auth().getUser(context.auth.uid).then(user => user.email)
                .then(email => common.getCorrectYear(db).collection('highlights-rejected').add({ ...doc.data(), rejectedBy: email, reason: data.reason })
                    .then(() => doc.ref.delete())
                    .then(() => ({ ...doc.data(), id: doc.id }))))));

exports.getRejectedHighlights = functions
    .region(constants.region)
    .https.onCall((data, context) => common.hasPermission(context.auth.uid,
        constants.PERMISSIONS.APPROVE_HIGHLIGHTS)
        .then(() => common.getCorrectYear(db).collection('highlights-rejected').get()
            .then(result => result.docs.map(x => ({ ...x.data(), id: x.id })))));

exports.reapproveRejectedHighlight = functions
    .region(constants.region)
    .https.onCall((data, context) => common.hasPermission(context.auth.uid,
        constants.PERMISSIONS.APPROVE_HIGHLIGHTS)
        .then(() => common.getCorrectYear(db).collection('highlights-rejected').doc(data.highlightId).get()
            .then(doc => common.getCorrectYear(db).collection('highlights').add({
                userId: doc.data().userId,
                title: doc.data().title,
                email: doc.data().email,
                upvotes: doc.data().upvotes,
                downvotes: doc.data().downvotes,
                dateCreated: doc.data().dateCreated
            }).then(() => doc.ref.delete()
                .then(() => ({ ...doc.data(), id: doc.id }))))));

// Currently just set to delete ones 24 hours old
exports.cleanupRejectedHighlights = functions.region(constants.region).pubsub
    .schedule('every 24 hours')
    .onRun(() => {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        const lastMonth = admin.firestore.Timestamp.fromDate(date);
        return common.getCorrectYear(db).collection('highlights-rejected').where('dateCreated', '<=', lastMonth).get()
            .then(result => result.docs.forEach(doc => doc.ref.delete()));
    });
