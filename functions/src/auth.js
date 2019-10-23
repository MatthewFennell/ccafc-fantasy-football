const admin = require('firebase-admin');
const functions = require('firebase-functions');
const fp = require('lodash/fp');
const common = require('./common');
const constants = require('./constants');

const config = functions.config();

const db = admin.firestore();

const operations = admin.firestore.FieldValue;

exports.updateDisplayName = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        if (!data.displayName) {
            throw new functions.https.HttpsError('invalid-argument', 'Must provide a valid display name');
        }
        common.isAuthenticated(context);
        return db.collection('users').doc(context.auth.uid).update({
            displayName: data.displayName
        }).then(
            () => db.collection('leagues-points').where('user_id', '==', context.auth.uid).get().then(
                leagues => leagues.docs.forEach(league => league.ref.update({
                    username: data.displayName
                }))
            )
        );
    });

exports.getUserProfile = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db
            .collection('users').doc(context.auth.uid).get()
            .then(user => ({ data: user.data(), id: user.id }));
    });


exports.updateTeamName = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('users').doc(context.auth.uid).update({
            teamName: data.teamName
        }).then(() => db.collection('leagues-points').where('user_id', '==', context.auth.uid).get().then(
            result => result.docs.forEach(doc => doc.ref.update({
                teamName: data.teamName
            }))
        ));
    });

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

        if (!Object.values(constants.ROLES).includes(data.role)) {
            throw new functions.https.HttpsError('not-found', 'That is not a known role');
        }

        return admin.auth().getUserByEmail(data.email)
            .then(user => db.collection('users-with-roles').where('email', '==', data.email).get()
                .then(result => {
                    if (result.size > 1) {
                        throw new functions.https.HttpsError('invalid-argument', 'Duplicate entries');
                    }

                    if (result.size === 0) {
                        return db.collection('users-with-roles').add({
                            roles: [data.role],
                            email: data.email,
                            displayName: user.displayName
                        });
                    }
                    return result.docs[0].ref.update({
                        roles: operations.arrayUnion(data.role)
                    });
                })
                .then(() => admin.auth().setCustomUserClaims(user.uid, {
                    ...user.customClaims,
                    [data.role]: true
                })));
    });


// Removing role `ALL` removes all of their roles
exports.removeUserRole = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        if (!Object.values(constants.ROLES).includes(data.role)) {
            throw new functions.https.HttpsError('not-found', 'That is not a known role');
        }
        if (data.email === config.admin.email) {
            throw new functions.https.HttpsError('invalid-argument', 'Cannot remove role from that user');
        }
        return db.collection('users-with-roles').where('email', '==', data.email).get()
            .then(result => {
                if (result.size === 0) {
                    throw new functions.https.HttpsError('not-found', 'No user with that email');
                }
                if (result.size > 1) {
                    throw new functions.https.HttpsError('invalid-argument', 'Duplicate entries');
                }

                const { roles } = result.docs[0].data();

                if ((roles.includes(data.role) && roles.length <= 1) || data.role === 'ALL') {
                    return result.docs[0].ref.delete();
                }
                if (roles.includes(data.role)) {
                    return result.docs[0].ref.update({
                        roles: operations.arrayRemove(data.role)
                    });
                }
                throw new functions.https.HttpsError('not-found', 'They do not have that role');
            })
            .then(() => admin.auth().getUserByEmail(data.email))
            .then(
                user => admin.auth().setCustomUserClaims(user.uid,
                    fp.unset(data.role)(user.customClaims))
            );
    });


// Only get the permissions that they can use
exports.getRolePermissions = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return admin.auth().getUser(context.auth.uid).then(user => {
            if (user.customClaims === undefined) {
                return {
                    mappings: {},
                    allRoles: []
                };
            }
            const mappings = {};
            Object.values(constants.ROLES).forEach(role => {
                if (user.customClaims[role]) {
                    mappings[role] = constants.ROLE_PERMISSIONS[role];
                }
            });
            return {
                mappings,
                allRoles: Object.keys(constants.ROLES)
            };
        });
    });
