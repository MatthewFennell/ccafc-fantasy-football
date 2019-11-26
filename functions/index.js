/* eslint-disable max-len */
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const fp = require('lodash/fp');
const lodash = require('lodash');
const firestore = require('@google-cloud/firestore');
const constants = require('./src/constants');
const common = require('./src/common');

const client = new firestore.v1.FirestoreAdminClient();
const bucket = 'gs://learning-backups';

const config = functions.config();

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

exports.auth = require('./src/auth');
exports.league = require('./src/leagues');
exports.team = require('./src/teams');
exports.player = require('./src/players');
exports.activeTeam = require('./src/activeTeam');
exports.weeklyTeam = require('./src/weeklyTeams');
exports.points = require('./src/points');
exports.users = require('./src/users');
exports.listeners = require('./src/listeners');
exports.onSignUp = require('./src/onSignUp');
exports.onDelete = require('./src/onDelete');
exports.firestore = require('./src/firestoreExports');
exports.management = require('./src/management');

const operations = admin.firestore.FieldValue;
// currently at v8.13.0 for node

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
        return db.collection('highlight-requests').get()
            .then(result => result.docs.map(x => ({ ...x.data(), id: x.id })));
    });

exports.getHighlights = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('highlights').orderBy('dateCreated', 'desc').get()
            .then(result => result.docs.map(x => ({ ...x.data(), id: x.id })));
    });

exports.approveHighlight = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('highlight-requests').doc(data.highlightId).get()
            .then(doc => db.collection('highlights').add({ ...doc.data(), upvotes: [], downvotes: [] })
                .then(() => doc.ref.delete()));
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
