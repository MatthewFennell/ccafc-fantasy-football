const admin = require('firebase-admin');
const functions = require('firebase-functions');

const db = admin.firestore();

const isAuthenticated = context => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'You must be authenticated to call this function');
    }
};

exports.createTeam = functions
    .region('europe-west2')
    .https.onCall((data, context) => {
        isAuthenticated(context);
        if (!data.teamName) {
            throw new functions.https.HttpsError('invalid-argument', 'Cannot have an empty team name');
        }

        const alreadyExistsRef = db.collection('teams')
            .where('team_name', '==', data.teamName);

        return alreadyExistsRef.get().then(doc => (doc.empty ? db.collection('teams')
            .add({
                team_name: data.teamName,
                wins: 0,
                draws: 0,
                losses: 0,
                goalsFor: 0,
                goalsAgainst: 0
            }) : {
            error: true,
            message: 'A team with that name already exists',
            code: 'invalid-argument'
        }))
            .catch(err => console.log(`Error creating team with name ${data.teamName}`, err))
            .then(response => {
                if (response.error) {
                    throw new functions.https.HttpsError(response.code, response.message);
                }
                return response;
            });
    });

// https://firebase.google.com/docs/reference/functions/functions.https.HttpsError
