const admin = require('firebase-admin');
const functions = require('firebase-functions');
const common = require('./common');
const constants = require('./constants');

const db = admin.firestore();

// First check if they are already in that league
// Then check that the league does exist
exports.createPlayer = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);

        if (!data.name) {
            throw new functions.https.HttpsError('invalid-argument', 'Invalid player name');
        }
        if (!data.position) {
            throw new functions.https.HttpsError('invalid-argument', 'Invalid player position');
        }
        if (!data.position || !common.isValidPosition(data.position.toUpperCase())) {
            throw new functions.https.HttpsError('invalid-argument', 'Invalid player position');
        }
        if (!common.isNumber(data.price)) {
            throw new functions.https.HttpsError('invalid-argument', 'Invalid price');
        }
        const teamExistsRef = db.collection('teams')
            .where('team_name', '==', data.team);
        const playerAlreadyExistsRef = db.collection('players')
            .where('name', '==', data.name)
            .where('team', '==', data.team);
        return playerAlreadyExistsRef.get().then(doc => {
            if (doc.empty) {
                return teamExistsRef.get()
                    .then(leagueDoc => {
                        if (!leagueDoc.empty) {
                            db.collection('players')
                                .add({
                                    name: data.name,
                                    position: data.position,
                                    price: data.price,
                                    team: data.team,
                                    points: 0,
                                    goals: 0,
                                    assists: 0
                                });
                            return Promise.resolve({ message: 'Player created', verified: true });
                        }
                        throw new functions.https.HttpsError('not-found', 'There is no team with that name');
                    });
            }
            throw new functions.https.HttpsError('already-exists', 'That player already exists');
        });
    });

exports.getAllPlayers = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db
            .collection('players')
            .get()
            .then(querySnapshot => querySnapshot.docs
                .map(doc => ({ data: doc.data(), id: doc.id })));
    });


exports.deletePlayer = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        if (!data.playerId) {
            throw new functions.https.HttpsError('invalid-argument', 'Must provide a valid player id');
        }
        return db.collection('weekly-teams').where('player_ids', 'array-contains', data.playerId).get()
            .then(docs => {
                if (docs.size > 0) {
                    throw new functions.https.HttpsError('invalid-argument', 'That player exists in somebodys team. Cannot be deleted');
                }
                return db.collection('players').doc(data.playerId).delete();
            });
    });
