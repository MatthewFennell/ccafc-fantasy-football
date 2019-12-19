const admin = require('firebase-admin');
const functions = require('firebase-functions');
const common = require('./common');
const constants = require('./constants');

const db = admin.firestore();

exports.triggerWeeklyTeams = functions
    .region(constants.region)
    .https.onCall((data, context) => common.hasPermission(context.auth.uid,
        constants.PERMISSIONS.TRIGGER_WEEK).then(() => db.collection('application-info').get()
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
                                yellowCard: false,
                                ownGoals: 0,
                                penaltySaves: 0,
                                penaltyMisses: 0
                            }));
                        });
                    }
                )));
            }))));
