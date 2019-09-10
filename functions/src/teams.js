const admin = require('firebase-admin');
const functions = require('firebase-functions');
const commonFunctions = require('./common');

const db = admin.firestore();

exports.createTeam = functions
    .region('europe-west2')
    .https.onCall((data, context) => {
        commonFunctions.isAuthenticated(context);
        if (!data.teamName) {
            throw new functions.https.HttpsError('invalid-argument', 'Cannot have an empty team name');
        }
        const alreadyExistsRef = db.collection('teams')
            .where('team_name', '==', data.teamName);
        return alreadyExistsRef.get().then(doc => {
            if (doc.empty) {
                return db.collection('teams').add({
                    team_name: data.teamName,
                    wins: 0,
                    draws: 0,
                    losses: 0,
                    goalsFor: 0,
                    goalsAgainst: 0
                });
            }
            throw new functions.https.HttpsError('invalid-argument', 'A team with that name already exists');
        });
    });
