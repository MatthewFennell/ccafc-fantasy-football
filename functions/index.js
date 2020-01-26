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
exports.features = require('./src/features');
exports.comments = require('./src/comments');

const operations = admin.firestore.FieldValue;
// currently at v8.13.0 for node

// // https://firebase.google.com/docs/reference/js/firebase.functions.html#functionserrorcod

exports.linkFacebookAccount = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return admin.auth().getUser(context.auth.uid).then(
            user => {
                const facebookProfilePicture = user.providerData.find(x => x.providerId === 'facebook.com').photoURL;
                if (facebookProfilePicture) {
                    return db.collection('users').doc(context.auth.uid).update({
                        photoUrl: facebookProfilePicture
                    });
                }
                return Promise.resolve();
            }
        );
    });


const updateComments = (database, newUrl, userId) => {
    let documentsToUpdate = [];
    return db.collection(database).get().then(
        documents => documents.docs.forEach(doc => {
            if (doc.data().comments.some(y => y.userId === userId)) {
                documentsToUpdate = lodash.union(documentsToUpdate, [doc.id]);
            }
            if (doc.data().comments.some(y => y.comments.some(z => z.userId === userId))) {
                documentsToUpdate = lodash.union(documentsToUpdate, [doc.id]);
            }
        })
    ).then(() => {
        const documentPromises = [];
        documentsToUpdate.forEach(x => {
            documentPromises.push(db.collection(database).doc(x).get().then(
                document => {
                    document.ref.update({
                        comments: document.data().comments.map(y => (y.userId === userId ? ({
                            ...y,
                            photoUrl: newUrl,
                            comments: y.comments.map(z => (z.userId === userId ? ({
                                ...z,
                                photoUrl: newUrl
                            }) : z))
                        }) : ({
                            ...y,
                            comments: y.comments.map(z => (z.userId === userId ? ({
                                ...z,
                                photoUrl: newUrl
                            }) : y))
                        })))
                    });
                }
            ));
        });
        return documentPromises;
    });
};

exports.updateProfilePicture = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('users').doc(context.auth.uid).update({
            photoUrl: data.photoUrl
        }).then(() => {
            updateComments('feature-requests', data.photoUrl, context.auth.uid).then(
                featuresPromises => {
                    Promise.all(featuresPromises);
                }
            ).then(() => {
                updateComments('highlights', data.photoUrl, context.auth.uid).then(
                    highlightsPromises => {
                        Promise.all(highlightsPromises);
                    }
                );
            });
        });
    });
