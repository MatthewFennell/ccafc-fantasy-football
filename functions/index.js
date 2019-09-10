const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);

const settings = { timestampsInSnapshots: true };
admin.firestore().settings(settings);
const db = admin.firestore();

exports.getDatabase = functions
    .region('europe-west2')
    .https.onCall((data, context) => db
        .collection('projects')
        .get()
        .then(querySnapshot => querySnapshot.docs.map(doc => doc.data())));

exports.addCity = functions
    .region('europe-west2')
    .https.onCall((data, context) => db
        .collection('cities')
        .add({
            name: 'Tokyo',
            country: 'Japan'
        })
        .then(docRef => {
            console.log('Document written with ID: ', docRef.id);
        })
        .catch(error => {
            console.error('Error adding document: ', error);
        }));

exports.userSignUp = functions
    .region('europe-west2')
    .auth.user()
    .onCreate(user => {
        const userObject = {
            displayName: user.displayName,
            email: user.email
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

exports.league = require('./src/leagues');
exports.team = require('./src/teams');
exports.player = require('./src/players');
exports.activeTeam = require('./src/activeTeam');
exports.weeklyTeam = require('./src/weeklyTeams');
