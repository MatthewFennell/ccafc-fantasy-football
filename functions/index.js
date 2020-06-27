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

exports.activeTeam = require('./src/activeTeam');
exports.auth = require('./src/auth');
exports.clubSubs = require('./src/clubSubs');
exports.comments = require('./src/comments');
exports.features = require('./src/features');
exports.firestoreExports = require('./src/firestoreExports');
exports.fixtures = require('./src/fixtures');
exports.highlights = require('./src/highlights');
exports.league = require('./src/league');
exports.listeners = require('./src/listeners');
exports.management = require('./src/management');
exports.onDelete = require('./src/onDelete');
exports.onSignUp = require('./src/onSignUp');
exports.player = require('./src/player');
exports.points = require('./src/points');
exports.profile = require('./src/profile');
exports.team = require('./src/teams');
exports.users = require('./src/users');
exports.weeklyTeam = require('./src/weeklyTeam');

const operations = admin.firestore.FieldValue;
// currently at v8.13.0 for node

// // https://firebase.google.com/docs/reference/js/firebase.functions.html#functionserrorcod
