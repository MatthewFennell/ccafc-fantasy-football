const admin = require('firebase-admin');
const functions = require('firebase-functions');

const db = admin.firestore();

exports.userSignUp = functions
    .region('europe-west2')
    .auth.user()
    .onCreate(user => {
        const userObject = {
            displayName: user.displayName,
            email: user.email,
            total_points: 0,
            remaining_transfers: 0,
            remaining_budget: 100
        };
        // If Facebook provider, assume the email is verified
        return db.doc(`users/${user.uid}`).set(userObject).then(() => (user.providerData.length
      && user.providerData[0].providerId === 'facebook.com' ? admin.auth().updateUser(user.uid, {
                emailVerified: true
            }) : false)).then(() => {
            db.collection('active-teams').add({
                user_id: user.uid,
                player_ids: []
            });
        });
    });
