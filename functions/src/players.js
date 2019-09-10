const admin = require('firebase-admin');
const functions = require('firebase-functions');
const commonFunctions = require('./common');

const db = admin.firestore();

// First check if they are already in that league
// Then check that the league does exist
exports.createPlayer = functions
    .region('europe-west2')
    .https.onCall((data, context) => {
        commonFunctions.isAuthenticated(context);
        const teamExistsRef = db.collection('teams')
            .where('team_name', '==', data.team);
        const playerAlreadyExistsRef = db.collection('players')
            .where('name', '==', data.name)
            .where('position', '==', data.position)
            .where('price', '==', data.price)
            .where('team', '==', data.team);

        return playerAlreadyExistsRef.get().then(doc => (doc.empty ? teamExistsRef.get()
            .then(leagueDoc => (!leagueDoc.empty ? db.collection('players')
                .add({
                    name: data.name,
                    position: data.position,
                    price: data.price,
                    team: data.team,
                    points: 0,
                    goals: 0,
                    assists: 0
                }) : {
                error: true,
                message: 'There is no team with that name',
                code: 'not-found'
            })).catch(error => console.log('Error searching players collection for ', data, error))
            : {
                error: true,
                message: 'That player already exists',
                code: 'already-exists'
            })).catch(err => console.log('Error searching teams collection for team ', data.team, err))
            .then(response => {
                if (response.error) {
                    throw new functions.https.HttpsError(response.code, response.message);
                }
                return response;
            });
    });

exports.getAllPlayers = functions
    .region('europe-west2')
    .https.onCall((data, context) => {
        commonFunctions.isAuthenticated(context);
        return db
            .collection('players')
            .get()
            .then(querySnapshot => querySnapshot.docs
                .map(doc => ({ data: doc.data(), id: doc.id })));
    });
