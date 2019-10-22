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

        return admin.auth().getUserByEmail(data.email).then(user => db.collection('users-with-roles').where('email', '==', data.email).get()
            .then(result => {
                if (result.size === 0) {
                    return db.collection('users-with-roles').add({
                        roles: [data.role],
                        email: data.email,
                        displayName: user.displayName
                    });
                }
                if (result.size > 1) {
                    throw new functions.https.HttpsError('invalid-argument', 'Duplicate entries');
                }
                return result.docs[0].ref.update({
                    roles: operations.arrayUnion(data.role)
                });
            }));
    });

exports.removeUserRole = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('users-with-roles').where('email', '==', data.email).get()
            .then(result => {
                if (result.size === 0) {
                    throw new functions.https.HttpsError('not-found', 'No user with that email');
                }
                if (result.size > 1) {
                    throw new functions.https.HttpsError('invalid-argument', 'Duplicate entries');
                }
                if (result.docs[0].data().roles.includes(data.role)) {
                    if (result.docs[0].data().roles.length <= 1) {
                        return result.docs[0].ref.delete();
                    }
                    return result.docs[0].ref.update({
                        roles: operations.arrayRemove(data.role)
                    });
                }
                throw new functions.https.HttpsError('not-found', 'They do not have that role');
            });
    });
