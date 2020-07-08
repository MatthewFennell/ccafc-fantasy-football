const admin = require('firebase-admin');
const functions = require('firebase-functions');
const common = require('./common');
const constants = require('./constants');

const db = admin.firestore();

exports.createTeam = functions
    .region(constants.region)
    .https.onCall((data, context) => common.hasPermission(context.auth.uid,
        constants.PERMISSIONS.CREATE_TEAM).then(() => {
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
                    goalsAgainst: 0,
                    results: []
                });
            }
            throw new functions.https.HttpsError('invalid-argument', 'A team with that name already exists');
        });
    }));

exports.getAllTeams = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db
            .collection('teams')
            .get()
            .then(querySnapshot => querySnapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() })));
    });

exports.getPlayersInTeam = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        if (!data.teamName) {
            throw new functions.https.HttpsError('invalid-argument', 'You must enter a team name');
        }
        common.isAuthenticated(context);
        return db
            .collection('players').where('team', '==', data.teamName).get()
            .then(docs => docs.docs.map(doc => ({
                name: doc.data().name,
                position: doc.data().position,
                id: doc.id
            })));
    });

exports.deleteTeam = functions
    .region(constants.region)
    .https.onCall((data, context) => common.hasPermission(context.auth.uid,
        constants.PERMISSIONS.DELETE_TEAM).then(() => {
        if (!data.teamName || !data.teamId) {
            throw new functions.https.HttpsError('invalid-argument', 'Must provide a valid team id and name');
        }
        return db.collection('players').where('team', '==', data.teamName).get()
            .then(docs => {
                if (docs.size > 0) {
                    throw new functions.https.HttpsError('invalid-argument', 'A player is associated with that team, so it cannot be deleted');
                }
                return db.collection('teams').doc(data.teamId).delete();
            });
    }));
