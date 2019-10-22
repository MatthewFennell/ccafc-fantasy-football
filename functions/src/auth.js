const admin = require('firebase-admin');
const functions = require('firebase-functions');
const common = require('./common');
const constants = require('./constants');

const db = admin.firestore();
const config = functions.config();

exports.userSignUp = functions
    .region(constants.region)
    .auth.user()
    .onCreate(user => {
        if (user.email === config.admin.email) {
            admin.auth().setCustomUserClaims(user.uid, {
                admin: true
            });
            db.collection('users-with-extra-roles').add({
                user_id: user.uid,
                displayName: user.displayName,
                email: user.email,
                roles: [constants.ROLES.ADMIN]
            });
        }
        db.collection('application-info').get().then(
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
        );

        const userObject = {
            displayName: user.displayName,
            email: user.email,
            total_points: 0,
            remaining_transfers: 0,
            remaining_budget: 100
        };
        // If Facebook provider, assume the email is verified
        return db.doc(`users/${user.uid}`).set(userObject)
            .then(() => {
                if (user.providerData.length && user.providerData[0].providerId === 'facebook.com') {
                    admin.auth().updateUser(user.uid, {
                        emailVerified: true
                    });
                }
            })
            .then(() => {
                db.collection('active-teams').add({
                    user_id: user.uid,
                    player_ids: []
                });
            });
    });

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
