/* eslint-disable max-len */
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const fp = require('lodash/fp');
const lodash = require('lodash');
const firestore = require('@google-cloud/firestore');
const moment = require('moment');
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
exports.highlights = require('./src/highlights');
exports.fixtures = require('./src/fixtures');

const operations = admin.firestore.FieldValue;
// currently at v8.13.0 for node

// // https://firebase.google.com/docs/reference/js/firebase.functions.html#functionserrorcod

exports.setMyTeam = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('users-teams').doc(context.auth.uid).set({
            team: data.team
        });
    });

exports.getMyTeam = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('users-teams').doc(context.auth.uid).get().then(
            doc => {
                if (doc.exists) {
                    return doc.data().team || 'No team set';
                }
                return 'No team set';
            }
        );
    });


// https://accounts.google.com/b/0/DisplayUnlockCaptcha
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
