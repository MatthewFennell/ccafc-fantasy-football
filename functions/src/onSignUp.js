const admin = require('firebase-admin');
const functions = require('firebase-functions');
const constants = require('./constants');

const db = admin.firestore();
const config = functions.config();

exports.createInitialLeague = functions
    .region(constants.region)
    .auth.user()
    .onCreate(user => db.collection('application-info').get().then(query => {
        if (query.size === 0 || (query.size === 1 && query.docs[0].data().number_of_users <= 1)) {
            return db.collection('leagues').where('name', '==', 'Collingwood').get().then(
                result => {
                    if (result.empty) {
                        return db.collection('leagues').add({
                            owner: user.uid,
                            start_week: 0,
                            name: 'Collingwood'
                        }).then(docRef => db.collection('leagues-points').add({
                            league_id: docRef.id,
                            user_id: user.uid,
                            start_week: 0,
                            name: 'Collingwood',
                            user_points: 0,
                            username: user.displayName,
                            position: 1,
                            teamName: 'Default Team Name'
                        }));
                    }
                    return Promise.resolve();
                }
            );
        }
        return Promise.resolve();
    }));


exports.joinInitialLeague = functions
    .region(constants.region)
    .auth.user()
    .onCreate(user => db.collection('leagues').where('name', '==', 'Collingwood').get().then(
        result => {
            if (result.size === 1) {
                return db.collection('leagues-points')
                    .where('name', '==', 'Collingwood').where('user_id', '==', user.uid)
                    .get()
                    .then(obj => {
                        if (obj.empty) {
                            const league = result.docs[0];
                            return db.collection('leagues-points').where('name', '==', 'Collingwood').get().then(
                                query => db.collection('leagues-points').add({
                                    league_id: league.id,
                                    user_id: user.uid,
                                    start_week: 0,
                                    name: 'Collingwood',
                                    user_points: 0,
                                    username: user.displayName,
                                    position: query.size + 1,
                                    teamName: 'Default Team Name'
                                })
                            );
                        }
                        return Promise.resolve();
                    });
            }
            return Promise.resolve();
        }
    ));

exports.setAdminUserClaims = functions
    .region(constants.region)
    .auth.user()
    .onCreate(user => {
        if (user.email === config.admin.email) {
            return admin.auth().setCustomUserClaims(user.uid, {
                [constants.ROLES.ADMIN]: true
            }).then(() => db.collection('users-with-roles').add({
                displayName: user.displayName,
                email: user.email,
                roles: [constants.ROLES.ADMIN],
                userId: user.uid
            }));
        }
        return Promise.resolve();
    });

exports.increaseNumberOfUsers = functions
    .region(constants.region)
    .auth.user()
    .onCreate(() => db.collection('application-info').get().then(
        appInfo => {
            if (appInfo.empty) {
                db.collection('application-info').add({
                    total_weeks: 0,
                    number_of_users: 1
                });
            } else {
                appInfo.docs.map(doc => doc.ref.update({
                    number_of_users: admin.firestore.FieldValue.increment(1)
                }));
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
        teamName: 'Default Team Name'
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
