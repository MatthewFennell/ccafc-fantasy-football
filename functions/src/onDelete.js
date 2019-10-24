const admin = require('firebase-admin');
const functions = require('firebase-functions');
const fp = require('lodash/fp');
const constants = require('./constants');

const db = admin.firestore();
const operations = admin.firestore.FieldValue;

exports.deleteUsersActiveTeam = functions.region(constants.region).firestore
    .document('users/{id}')
    .onDelete(snapshot => db.collection('active-teams').where('user_id', '==', snapshot.id).get().then(
        result => result.docs.map(doc => doc.ref.delete())
    ));

exports.deleteUsersLeaguesPoints = functions.region(constants.region).firestore
    .document('users/{id}')
    .onDelete(snapshot => db.collection('leagues-points').where('user_id', '==', snapshot.id).get().then(
        result => result.docs.map(doc => doc.ref.delete())
    ));

// Whenever a leagues points document is deleted, update the positions
exports.reorderPositions = functions.region(constants.region).firestore
    .document('leagues-points/{id}')
    .onDelete(snapshot => db.collection('leagues-points').where('league_id', '==', snapshot.data().league_id).get()
        .then(query => query.docs
            .map(leagueDoc => ({ data: leagueDoc.data(), id: leagueDoc.id })))
        .then(result => {
            const positions = [];
            const sortedResult = fp.sortBy('data.user_points')(result).reverse();
            sortedResult.forEach((pos, index) => {
                positions.push({ id: pos.id, position: index + 1 });
            });
            const leagueUpdatePromises = [];
            positions.map(pos => leagueUpdatePromises.push(db.collection('leagues-points')
                .doc(pos.id).update({
                    position: pos.position
                })));
        }));


exports.deleteUsersWithRoles = functions.region(constants.region).firestore
    .document('users/{id}')
    .onDelete(snapshot => db.collection('users-with-roles').where('userId', '==', snapshot.id).get().then(
        result => result.docs.map(doc => doc.ref.delete())
    ));

exports.deleteWeeklyPlayers = functions.region(constants.region).firestore
    .document('users/{id}')
    .onDelete(snapshot => db.collection('weekly-players').where('user_id', '==', snapshot.id).get().then(
        result => result.docs.map(doc => doc.ref.delete())
    ));

exports.deleteWeeklyTeams = functions.region(constants.region).firestore
    .document('users/{id}')
    .onDelete(snapshot => db.collection('weekly-teams').where('user_id', '==', snapshot.id).get().then(
        result => result.docs.map(doc => doc.ref.delete())
    ));

exports.reduceNumberOfUsers = functions.region(constants.region).firestore
    .document('users/{id}')
    .onDelete(() => db.collection('application-info').get().then(
        result => {
            if (result.size === 1) {
                result.docs[0].ref.update({
                    number_of_users: operations.increment(-1)
                });
            }
        }
    ));
