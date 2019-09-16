const admin = require('firebase-admin');
const functions = require('firebase-functions');
const common = require('./common');

const db = admin.firestore();
const config = functions.config();

exports.userSignUp = functions
    .region('europe-west2')
    .auth.user()
    .onCreate(user => {
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
        db.doc(`users/${user.uid}`).set(userObject)
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
        if (user.email === config.admin.email) {
            return admin.auth().setCustomUserClaims(user.uid, {
                admin: true
            });
        }
        return false;
    });

exports.updateDisplayName = functions
    .region('europe-west2')
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('users').doc(context.auth.uid).update({
            displayName: data.displayName
        });
    });

exports.getUserProfile = functions
    .region('europe-west2')
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db
            .collection('users').doc(context.auth.uid).get()
            .then(user => ({ data: user.data(), id: user.id }));
    });
