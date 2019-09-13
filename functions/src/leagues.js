const admin = require('firebase-admin');
const functions = require('firebase-functions');
const commonFunctions = require('./common');

const db = admin.firestore();

exports.createLeague = functions
    .region('europe-west2')
    .https.onCall((data, context) => {
        commonFunctions.isAuthenticated(context);
        if (!data.leagueName) {
            throw new functions.https.HttpsError('invalid-argument', 'Cannot create a league with an empty name');
        }
        db.collection('leagues')
            .add({
                owner: context.auth.uid,
                start_week: 0,
                name: data.leagueName
            }).then(docRef => {
                db.collection('leagues-points').add({
                    league_id: docRef.id,
                    user_id: context.auth.uid,
                    start_week: 0,
                    name: data.leagueName,
                    user_points: 0
                });
            });
    });

exports.getAllLeagues = functions
    .region('europe-west2')
    .https.onCall((data, context) => {
        commonFunctions.isAuthenticated(context);
        return db
            .collection('leagues-points')
            .get()
            .then(querySnapshot => querySnapshot.docs
                .map(doc => ({ data: doc.data(), id: doc.id })));
    });

exports.getLeaguesIAmIn = functions
    .region('europe-west2')
    .https.onCall((data, context) => {
        commonFunctions.isAuthenticated(context);
        return db
            .collection('leagues-points')
            .where('user_id', '==', context.auth.uid)
            .get()
            .then(querySnapshot => querySnapshot.docs
                .map(doc => ({ data: doc.data(), id: doc.id })));
    });


// First check if they are already in that league
// Then check that the league does exist
exports.addUserToLeague = functions
    .region('europe-west2')
    .https.onCall((data, context) => {
        commonFunctions.isAuthenticated(context);

        return db.collection('leagues').doc(data.leagueId).get().then(
            league => {
                if (!league.exists) {
                    throw new functions.https.HttpsError('not-found', `Invalid league id (${data.leagueId})`);
                }
                return db.collection('leagues-points')
                    .where('league_id', '==', data.leagueId).where('user_id', '==', context.auth.uid).get()
                    .then(leagues => {
                        if (!leagues.empty) {
                            throw new functions.https.HttpsError('already-exists', 'User already exists in that league');
                        }
                        db.collection('leagues-points').add({
                            league_id: data.leagueId,
                            user_id: context.auth.uid,
                            start_week: 0,
                            name: league.data().name,
                            user_points: 0
                        });
                    });
            }
        );
    });
