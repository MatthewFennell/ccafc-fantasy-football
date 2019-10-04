const admin = require('firebase-admin');
const functions = require('firebase-functions');
const fp = require('lodash/fp');
const common = require('./common');
const constants = require('./constants');

const db = admin.firestore();

exports.createLeague = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
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
                    user_points: 0,
                    username: data.username
                });
            });
    });

exports.getAllLeagues = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db
            .collection('leagues-points')
            .get()
            .then(querySnapshot => querySnapshot.docs
                .map(doc => ({ data: doc.data(), id: doc.id })));
    });

exports.getLeaguesIAmIn = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
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
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);

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
                            user_points: 0,
                            username: data.username
                        });
                    });
            }
        );
    });


exports.orderedUsers = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db
            .collection('leagues-points')
            .where('league_id', '==', data.leagueId)
            .orderBy('user_points', 'desc')
            .get()
            .then(querySnapshot => querySnapshot.docs
                .map(doc => ({ data: doc.data(), id: doc.id })));
    });

exports.positionsOfUserInLeagues = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db
            .collection('leagues-points')
            .where('user_id', '==', data.userId)
            .get()
            .then(querySnapshot => querySnapshot.docs
                .map(doc => ({ data: doc.data(), id: doc.id })));
    });


// Adds a position tag to each league to order them correctly
exports.calculatePositions = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db
            .collection('leagues-points')
            .get()
            .then(querySnapshot => querySnapshot.docs
                .map(doc => ({ data: doc.data(), id: doc.id })))
            .then(result => {
                const leaguesAndUsers = {};
                const positions = [];

                result.forEach(league => {
                    const entry = {
                        id: league.id,
                        points: league.data.user_points
                    };

                    if (leaguesAndUsers[league.data.league_id]) {
                        leaguesAndUsers[league.data.league_id].push(entry);
                    } else {
                        leaguesAndUsers[league.data.league_id] = [entry];
                    }
                });

                Object.keys(leaguesAndUsers).forEach(key => {
                    leaguesAndUsers[key] = fp.sortBy('points')(leaguesAndUsers[key]).reverse();
                    leaguesAndUsers[key].forEach((pos, index) => {
                        positions.push({ id: pos.id, position: index + 1 });
                    });
                });

                const leagueUpdatePromises = [];
                positions.map(pos => leagueUpdatePromises.push(db.collection('leagues-points')
                    .doc(pos.id).update({
                        position: pos.position
                    })));

                return Promise.all(leagueUpdatePromises).then(() => 'Successfully updated');
            });
    });
