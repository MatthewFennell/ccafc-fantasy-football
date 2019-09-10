const admin = require('firebase-admin');
const functions = require('firebase-functions');
const commonFunctions = require('./common');

const db = admin.firestore();

exports.triggerWeeklyTeams = functions
    .region('europe-west2')
    .https.onCall((data, context) => {
        commonFunctions.isAuthenticated(context);
        const activeTeamsRef = db.collection('active-teams');

        return activeTeamsRef.get().then(querySnapshot => {
            querySnapshot.docs.map(doc => db.collection('weekly-teams').add({
                user_id: doc.data().user_id,
                week: data.week,
                points: 0
            }).then(() => {
                const activeTeamPlayersRef = db.collection('active-teams').doc(doc.id).collection('players');
                activeTeamPlayersRef.get().then(playerDocs => {
                    playerDocs.docs.map(player => db.collection('weekly-players').add({
                        name: player.data().name,
                        player_id: player.data().player_id,
                        week: data.week,
                        position: player.data().position,
                        price: player.data().price,
                        team: player.data().team,
                        points: 0,
                        user_id: doc.data().user_id
                    }));
                });
            }));
        });
    });


exports.getAllMyWeeklyPlayers = functions
    .region('europe-west2')
    .https.onCall((data, context) => {
        commonFunctions.isAuthenticated(context);
        return db.collection('weekly-players')
            .where('user_id', '==', context.auth.uid)
            .get()
            .then(querySnapshot => querySnapshot.docs
                .map(doc => ({
                    data: doc.data(),
                    id: doc.id
                })));
    });

exports.addPointsToPlayerInWeek = functions
    .region('europe-west2')
    .https.onCall((data, context) => {
        commonFunctions.isAuthenticated(context);
        const matchingPlayer = db.collection('players').doc(data.playerId);
        const matchingWeeklyTeams = db.collection('weekly-teams')
            .where('player_ids', 'array-contains', data.playerId)
            .where('week', '==', data.week);
        return matchingPlayer.get().then(doc => {
            if (doc.exists) {
                return db.collection('players').doc(doc.id).update({
                    points: doc.data().points + data.points
                });
            }
            throw new functions.https.HttpsError('not-found', 'There is no player with that ID');
        }).then(() => matchingWeeklyTeams.get().then(querySnapshot => {
            querySnapshot.docs.map(doc => db.collection('weekly-teams').doc(doc.id).update({
                points: doc.data().points + data.points
            }).then(() => {
                const userRef = db.collection('users').doc(doc.data().user_id);
                userRef.get().then(userDoc => {
                    if (userDoc.exists) {
                        return db.collection('users').doc(doc.data().user_id).update({
                            points: userDoc.data().points + data.points
                        });
                    }
                    throw new functions.https.HttpsError('not-found', 'There is no player with that ID');
                }).then(() => {
                    const leaguesRef = db.collection('leagues-points')
                        .where('start_week', '>=', data.week)
                        .where('user_id', '==', doc.data().user_id);
                    return leaguesRef.get().then(allLeagues => {
                        allLeagues.docs.map(league => db.collection('leagues-points').doc(league.id).update({
                            user_points: league.data().user_points + data.points
                        }));
                    });
                });
            }));
        }));
    });


// exports.triggerWeeklyTeams = functions
// .region('europe-west2')
// .https.onCall((data, context) => {
//     commonFunctions.isAuthenticated(context);
//     const batch = db.batch();
//     return db
//         .collection('active-teams')
//         .get()
//         .then(querySnapshot => querySnapshot.docs
//             .map(doc => {
//                 const weekRef = db.collection('weekly-teams').doc();
//                 return batch.set(weekRef, {
//                     user_id: doc.data().user_id,
//                     week: data.week,
//                     player_ids: doc.data().player_ids,
//                     points: 0,
//                     players: doc.data().players.map(p => ({ ...p, points: 0 }))
//                 });
//             })).then(() => batch.commit());
// });
