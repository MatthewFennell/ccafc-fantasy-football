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
exports.profile = require('./src/profile');
exports.clubSubs = require('./src/clubSubs');

const operations = admin.firestore.FieldValue;
// currently at v8.13.0 for node

// // https://firebase.google.com/docs/reference/js/firebase.functions.html#functionserrorcod

exports.editDisabledPages = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        if (!data.page) {
            throw new functions.https.HttpsError('invalid-argument', 'Invalid page');
        }
        return db.collection('application-info').get().then(
            result => {
                if (result.size !== 1) {
                    throw new functions.https.HttpsError('invalid-argument', 'Server Error. Something has gone terribly wrong');
                }
                const { disabledPages } = result.docs[0].data();
                if (data.isDisabled) {
                    console.log('in here', data);
                    console.log('data object', result.docs[0].data());
                    return result.docs[0].ref.update({
                        disabledPages: operations.arrayUnion(data.page)
                    });
                }
                return result.docs[0].ref.update({
                    disabledPages: disabledPages.filter(page => page !== data.page)
                });
            }
        );
    });
