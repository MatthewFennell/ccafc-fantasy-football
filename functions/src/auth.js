const admin = require('firebase-admin');
const functions = require('firebase-functions');
const fp = require('lodash/fp');
const common = require('./common');
const constants = require('./constants');

const config = functions.config();

const db = admin.firestore();

const operations = admin.firestore.FieldValue;

exports.usersWithExtraRoles = functions
    .region(constants.region)
    .https.onCall((data, context) => common.hasPermission(context.auth.uid, constants.PERMISSIONS.MANAGE_USERS)
        .then(() => {
            common.isAuthenticated(context);
            return db.collection('users-with-roles').get().then(
                result => result.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            );
        }));

exports.addUserRole = functions
    .region(constants.region)
    .https.onCall((data, context) => common.hasPermission(context.auth.uid,
        constants.PERMISSIONS.MANAGE_USERS)
        .then(() => {
            if (!Object.values(constants.ROLES).includes(data.role)) {
                common.log(context.auth.uid, 'Unknown role', { Role: data.role });
                throw new functions.https.HttpsError('not-found', 'That is not a known role');
            }
            return admin.auth().getUserByEmail(data.email)
                .then(user => db.collection('users-with-roles').where('email', '==', data.email).get()
                    .then(result => {
                        if (result.size > 1) {
                            common.log(context.auth.uid, 'Duplicate entry', { Email: data.email });
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
        }));

// Removing role `ALL` removes all of their roles
exports.removeUserRole = functions
    .region(constants.region)
    .https.onCall((data, context) => common.hasPermission(context.auth.uid,
        constants.PERMISSIONS.MANAGE_USERS).then(() => {
        if (!Object.values(constants.ROLES).includes(data.role) && data.role !== 'ALL') {
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
    }));

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
            // If admin, return all the mappings
            if (user.customClaims[constants.ROLES.ADMIN]) {
                return {
                    mappings: constants.ROLE_PERMISSIONS,
                    allRoles: Object.keys(constants.ROLES)
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

exports.deleteUser = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return admin.auth().getUser(context.auth.uid).then(user => {
            if (user.email === data.email) {
                return admin.auth().deleteUser(context.auth.uid).then(
                    () => db.collection('users').doc(context.auth.uid).delete()
                );
            }
            throw new functions.https.HttpsError('not-found', 'That is not your email');
        });
    });

// Cleans literally everything
exports.clearDatabase = functions
    .region(constants.region)
    .https.onCall((data, context) => common.hasPermission(context.auth.uid,
        constants.PERMISSIONS.ROLL_OVER_YEAR)
        .then(() => {
            db.collection('active-teams').get().then(teams => teams.forEach(team => team.ref.delete()));
            db.collection('application-info').get().then(appInfo => appInfo.forEach(app => app.ref.delete()));
            db.collection('leagues').get().then(leagues => leagues.forEach(league => league.ref.delete()));
            db.collection('players').get().then(players => players.forEach(player => player.ref.delete()));
            db.collection('leagues-points').get().then(leaguesPoints => leaguesPoints.forEach(league => league.ref.delete()));
            db.collection('teams').get().then(teams => teams.forEach(team => team.ref.delete()));
            db.collection('player-points').get().then(players => players.forEach(player => player.ref.delete()));
            db.collection('users').get().then(users => users.forEach(user => {
                admin.auth().deleteUser(user.id);
                user.ref.delete();
            }));
            db.collection('users-with-roles').get().then(usersWithRoles => usersWithRoles.forEach(user => user.ref.delete()));
            db.collection('weekly-teams').get().then(weeklyTeams => weeklyTeams.forEach(team => team.ref.delete()));
            db.collection('highlights').get().then(highlights => highlights.forEach(highlight => highlight.ref.delete()));
            db.collection('highlights-rejected').get().then(highlights => highlights.forEach(highlight => highlight.ref.delete()));
            db.collection('highlight-requests').get().then(highlights => highlights.forEach(highlight => highlight.ref.delete()));
            db.collection('feature-requests').get().then(features => features.forEach(feature => feature.ref.delete()));
            db.collection('users-teams').get().then(users => users.forEach(userTeam => userTeam.ref.delete()));
        }));

exports.editDisabledPages = functions
    .region(constants.region)
    .https.onCall((data, context) => common.hasPermission(context.auth.uid,
        constants.PERMISSIONS.MANAGE_USERS).then(() => {
        if (!data.page) {
            throw new functions.https.HttpsError('invalid-argument', 'Invalid page');
        }
        return db.collection('application-info').doc(constants.applicationInfoId).get().then(
            result => {
                if (!result.exists) {
                    throw new functions.https.HttpsError('invalid-argument', 'Server Error. Something has gone wrong');
                }

                const { disabledPages } = result.data();
                if (data.isDisabled) {
                    return result.ref.update({
                        disabledPages: operations.arrayUnion(data.page)
                    });
                }
                return result.ref.update({
                    disabledPages: disabledPages.filter(page => page !== data.page)
                });
            }
        );
    }));
