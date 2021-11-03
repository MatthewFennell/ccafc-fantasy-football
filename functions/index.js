const admin = require('firebase-admin');
const functions = require('firebase-functions');
const fp = require('lodash/fp');
const lodash = require('lodash');
const firestore = require('@google-cloud/firestore');
const moment = require('moment');
const constants = require('./src/constants');
const common = require('./src/common');

// Need to set config for admin email to be my gmail
const config = functions.config();

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.auth = require('./src/auth');
exports.activeTeam = require('./src/activeTeam');
exports.clubSubs = require('./src/clubSubs');
exports.comments = require('./src/comments');
exports.cup = require('./src/cup');
exports.features = require('./src/features');
exports.firestoreExports = require('./src/firestoreExports');

exports.fixtures = require('./src/fixtures');
exports.highlights = require('./src/highlights');
exports.league = require('./src/league');
exports.listeners = require('./src/listeners');

exports.management = require('./src/management');
exports.notification = require('./src/notification');
exports.onDelete = require('./src/onDelete');
exports.onSignUp = require('./src/onSignUp');

exports.player = require('./src/player');
exports.points = require('./src/points');
exports.profile = require('./src/profile');
exports.division = require('./src/division');
exports.team = require('./src/team');
exports.users = require('./src/users');
exports.weeklyTeam = require('./src/weeklyTeam');
