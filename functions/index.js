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

const operations = admin.firestore.FieldValue;

exports.addResultToTeam = functions.region(constants.region).firestore
    .document('teams/{id}')
    .onWrite(change => {
        const calculateDiff = (before, after) => ({
            goalsAgainst: after.data().goalsAgainst - before.data().goalsAgainst,
            goalsFor: after.data().goalsFor - before.data().goalsFor
        });

        if (change.before.exists) {
            console.log('before data', change.before.data());
            console.log('after data', change.after.data());
            const diff = calculateDiff(change.before, change.after);
            console.log('diff', diff);
        } else {
            console.log('did not have a team before');
            return Promise.resolve();
        }
    });

// currently at v8.13.0 for node
