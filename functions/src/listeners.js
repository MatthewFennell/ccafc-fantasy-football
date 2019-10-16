const admin = require('firebase-admin');
const functions = require('firebase-functions');
const constants = require('./constants');
const common = require('./common');

const db = admin.firestore();

const operations = admin.firestore.FieldValue;

exports.addStatsToPlayer = functions.region(constants.region).firestore
    .document('player-points/{id}')
    .onWrite(change => {
        const difference = common.calculateDifference(change.before.data(), change.after.data());
        return db.collection('players').doc(change.after.data().player_id).get().then(doc => {
            const points = common.calculatePointDifference(difference,
                change.after.data().position);
            return doc.ref.update({
                goals: operations.increment(difference.goals),
                assists: operations.increment(difference.assists),
                points: operations.increment(points)
            });
        });
    });

exports.updateWeeklyTeams = functions.region(constants.region).firestore
    .document('player-points/{id}')
    .onWrite(change => {
        const difference = common.calculateDifference(change.before.data(), change.after.data());
        const points = common.calculatePointDifference(difference,
            change.after.data().position);
        return db.collection('weekly-teams').where('week', '==', change.after.data().week)
            .where('player_ids', 'array-contains', change.after.data().player_id)
            .get()
            .then(result => {
                result.docs.forEach(x => x.ref.update({
                    points: operations.increment(points)
                }));
            });
    });

exports.updateWeeklyPlayers = functions.region(constants.region).firestore
    .document('player-points/{id}')
    .onWrite(change => {
        const difference = common.calculateDifference(change.before.data(), change.after.data());
        const points = common.calculatePointDifference(difference,
            change.after.data().position);
        return db.collection('weekly-players').where('player_id', '==', change.after.data().player_id)
            .where('week', '==', change.after.data().week).get()
            .then(
                result => {
                    if (result.size > 1) {
                        throw new functions.https.HttpsError('invalid-argument', `Weekly player with id ${change.after.data().player_id} exists twice`);
                    }
                    if (result.size === 0) {
                        return null;
                    }
                    return result.docs[0].ref.update({
                        points: operations.increment(points)
                    });
                }
            );
    });

// Can merge this into function above if struggling on reads
exports.updateUserScores = functions.region(constants.region).firestore
    .document('player-points/{id}')
    .onWrite(change => {
        const difference = common.calculateDifference(change.before.data(), change.after.data());
        const points = common.calculatePointDifference(difference,
            change.after.data().position);
        return db.collection('weekly-teams').where('player_ids', 'array-contains', change.after.data().player_id)
            .where('week', '==', change.after.data().week).get()
            .then(result => result.docs.map(id => id.data().user_id))
            .then(
                result => result.forEach(userId => db.collection('users').doc(userId).update({
                    total_points: operations.increment(points)
                }))
            );
    });

// Can merge this one too
exports.updateLeaguesPoints = functions.region(constants.region).firestore
    .document('player-points/{id}')
    .onWrite(change => {
        const difference = common.calculateDifference(change.before.data(), change.after.data());
        const points = common.calculatePointDifference(difference,
            change.after.data().position);
        return db.collection('weekly-players').where('player_id', '==', change.after.data().player_id)
            .where('week', '==', change.after.data().week).get()
            .then(result => result.docs.map(id => id.data().user_id))
            .then(
                result => result.forEach(userId => db.collection('leagues-points')
                    .where('user_id', '==', userId).where('start_week', '<=', change.after.data().week)
                    .get()
                    .then(leagues => leagues.docs.forEach(league => league.ref.update({
                        user_points: operations.increment(points)
                    }))))
            );
    });
