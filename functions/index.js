const admin = require('firebase-admin');
const functions = require('firebase-functions');
const fp = require('lodash/fp');
const lodash = require('lodash');
const constants = require('./src/constants');
const common = require('./src/common');

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

const operations = admin.firestore.FieldValue;

exports.usersWithExtraRoles = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('users-with-roles').get().then(
            result => result.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        );
    });

exports.addUserRole = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('users').doc(data.userId).get().then(doc => {
            if (doc.data().roles.includes(data.role)) {
                return null;
            }
            return doc.ref.update({
                roles: operations.arrayUnion(data.role),
                number_of_roles: operations.increment(1)
            });
        });
    });

exports.removeUserRole = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('users').doc(data.userId).get().then(doc => {
            if (doc.data().roles.includes(data.role)) {
                return doc.ref.update({
                    roles: operations.arrayRemove(data.role),
                    number_of_roles: operations.increment(-1)
                });
            }
            return null;
        });
    });
