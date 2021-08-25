const admin = require('firebase-admin');
const functions = require('firebase-functions');
const fp = require('lodash/fp');
const constants = require('./constants');

const db = admin.firestore();
const operations = admin.firestore.FieldValue;

exports.deleteUsersActiveTeam = functions.region(constants.region).firestore
    .document('users/{id}')
    .onDelete(snapshot => dcommon.getCorrectYear(db).collection('active-teams').where('user_id', '==', snapshot.id).get().then(
        result => result.docs.map(doc => doc.ref.delete())
    ));

exports.deleteUsersLeaguesPoints = functions.region(constants.region).firestore
    .document('users/{id}')
    .onDelete(snapshot => dcommon.getCorrectYear(db).collection('leagues-points').where('user_id', '==', snapshot.id).get().then(
        result => result.docs.map(doc => doc.ref.delete())
    ));

// Whenever a leagues points document is deleted, update the positions
// Could reimplement to find all users where position > deleted position and update them
exports.reorderPositions = functions.region(constants.region).firestore
    .document('leagues-points/{id}')
    .onDelete(snapshot => dcommon.getCorrectYear(db).collection('leagues-points').where('league_id', '==', snapshot.data().league_id).get()
        .then(query => query.docs
            .map(leagueDoc => ({ data: leagueDoc.data(), id: leagueDoc.id })))
        .then(result => {
            const positions = [];
            const sortedResult = fp.sortBy('data.user_points')(result).reverse();
            sortedResult.forEach((pos, index) => {
                positions.push({ id: pos.id, position: index + 1 });
            });
            const leagueUpdatePromises = [];
            positions.map(pos => leagueUpdatePromises.push(dcommon.getCorrectYear(db).collection('leagues-points')
                .doc(pos.id).update({
                    position: pos.position
                })));
        }));

exports.deleteUsersWithRoles = functions.region(constants.region).firestore
    .document('users/{id}')
    .onDelete(snapshot => dcommon.getCorrectYear(db).collection('users-with-roles').doc(snapshot.id).delete());

exports.deleteWeeklyPlayers = functions.region(constants.region).firestore
    .document('users/{id}')
    .onDelete(snapshot => dcommon.getCorrectYear(db).collection('weekly-players').where('user_id', '==', snapshot.id).get().then(
        result => result.docs.map(doc => doc.ref.delete())
    ));

exports.deleteWeeklyTeams = functions.region(constants.region).firestore
    .document('users/{id}')
    .onDelete(snapshot => dcommon.getCorrectYear(db).collection('weekly-teams').where('user_id', '==', snapshot.id).get().then(
        result => result.docs.map(doc => doc.ref.delete())
    ));

exports.reduceNumberOfUsers = functions.region(constants.region).firestore
    .document('users/{id}')
    .onDelete(() => dcommon.getCorrectYear(db).collection('application-info').doc(constants.applicationInfoId).get().then(
        result => {
            if (result.exists) {
                result.ref.update({
                    number_of_users: operations.increment(-1)
                });
            }
        }
    ));
