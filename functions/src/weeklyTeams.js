const admin = require('firebase-admin');
const functions = require('firebase-functions');
const common = require('./common');
const constants = require('./constants');

const db = admin.firestore();

exports.addPointsToPlayerInWeek = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
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

exports.triggerWeeklyTeams = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return common.isAdmin(context.auth.uid).then(() => db.collection('application-info').get()
            .then(appInfo => appInfo.docs.map(doc => {
                if (doc.data().total_weeks + 1 !== data.week) {
                    throw new functions.https.HttpsError('invalid-argument', `Invalid week. The next week should be ${doc.data().total_weeks + 1}`);
                }
                return false;
            }))
            .then(() => db.collection('active-teams').get()
                .then(querySnapshot => {
                    db.collection('application-info').get().then(docs => docs.docs.map(doc => doc.ref.update({
                        total_weeks: admin.firestore.FieldValue.increment(1)
                    })));

                    querySnapshot.docs.forEach(doc => db.collection('weekly-teams').add({
                        user_id: doc.data().user_id,
                        week: data.week,
                        points: 0,
                        player_ids: doc.data().player_ids,
                        captain: doc.data().captain || null
                    }).then(() => db.collection('active-teams').doc(doc.id).get().then(
                        result => {
                            const promises = [];
                            result.data().player_ids.forEach(playerId => promises.push(db.collection('players').doc(playerId).get()
                                .then(p => {
                                    if (p.exists) return ({ ...p.data(), id: p.id });
                                    throw new functions.https.HttpsError('not-found', 'Invalid player ID');
                                })));
                            return Promise.all(promises).then(allPlayers => {
                                allPlayers.forEach(p => db.collection('weekly-players').add({
                                    name: p.name,
                                    player_id: p.id,
                                    week: data.week,
                                    position: p.position,
                                    price: p.price,
                                    team: p.team,
                                    points: 0,
                                    user_id: doc.data().user_id,
                                    isCaptain: doc.data().captain === p.id,
                                    goals: 0,
                                    assists: 0,
                                    cleanSheet: false,
                                    manOfTheMatch: false,
                                    dickOfTheDay: false,
                                    redCard: false,
                                    yellowCard: false
                                }));
                            });
                        }
                    )));
                })));
    });
