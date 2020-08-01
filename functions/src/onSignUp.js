const admin = require('firebase-admin');
const functions = require('firebase-functions');
const constants = require('./constants');

const db = admin.firestore();
const config = functions.config();

const operations = admin.firestore.FieldValue;

exports.createInitialLeague = functions
    .region(constants.region)
    .auth.user()
    .onCreate(user => db.collection('leagues').doc(constants.collingwoodLeagueId).get().then(
        result => {
            if (!result.exists) {
                return db.collection('leagues').doc(constants.collingwoodLeagueId).set({
                    owner: user.uid,
                    start_week: 0,
                    name: constants.collingwoodLeagueName,
                    number_of_users: 0
                });
            }
            return Promise.resolve();
        }
    ));

exports.joinInitialLeague = functions
    .region(constants.region)
    .auth.user()
    .onCreate(user => db.collection('leagues-points')
        .where('name', '==', constants.collingwoodLeagueName).where('user_id', '==', user.uid)
        .get()
        .then(result => {
            if (result.empty) {
                return db.collection('leagues-points').where('name', '==', constants.collingwoodLeagueName).get().then(
                    query => db.collection('leagues-points').add({
                        league_id: constants.collingwoodLeagueId,
                        user_id: user.uid,
                        start_week: 0,
                        name: constants.collingwoodLeagueName,
                        user_points: 0,
                        username: user.displayName,
                        position: query.size + 1,
                        teamName: 'Default Team Name'
                    })
                );
            }
            return Promise.resolve();
        }));

exports.setAdminUserClaims = functions
    .region(constants.region)
    .auth.user()
    .onCreate(user => {
        if (user.email === config.admin.email) {
            return admin.auth().setCustomUserClaims(user.uid, {
                [constants.ROLES.ADMIN]: true
            }).then(() => db.collection('users-with-roles').doc(user.uid).get().then(
                doc => {
                    if (doc.exists) {
                        return doc.ref.update({
                            roles: operations.arrayUnion(constants.ROLES.ADMIN)
                        });
                    }
                    return db.collection('users-with-roles').doc(user.uid).set({
                        displayName: user.displayName,
                        email: user.email,
                        roles: [constants.ROLES.ADMIN]
                    });
                }
            ));
        }
        return Promise.resolve();
    });

exports.increaseNumberOfUsers = functions
    .region(constants.region)
    .auth.user()
    .onCreate(() => db.collection('application-info').doc(constants.applicationInfoId).get().then(
        appInfo => {
            if (!appInfo.exists) {
                db.collection('application-info').doc(constants.applicationInfoId).set({
                    total_weeks: 0,
                    number_of_users: 1
                });
            } else {
                appInfo.ref.update({
                    number_of_users: operations.increment(1)
                });
            }
        }
    ));

exports.createUserAccount = functions
    .region(constants.region)
    .auth.user()
    .onCreate(user => db.doc(`users/${user.uid}`).set({
        displayName: user.displayName,
        email: user.email,
        total_points: 0,
        remaining_transfers: 0,
        remaining_budget: 100,
        teamName: 'Default Team Name',
        photoUrl: user.photoURL
    }));

exports.verifyFacebookEmail = functions
    .region(constants.region)
    .auth.user()
    .onCreate(user => {
        if (user.providerData.length && user.providerData[0].providerId === 'facebook.com') {
            return admin.auth().updateUser(user.uid, {
                emailVerified: true
            });
        }
        return Promise.resolve();
    });

// Change these to listen for changes to users
