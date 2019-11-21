/* eslint-disable max-len */
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const fp = require('lodash/fp');
const lodash = require('lodash');
const firestore = require('@google-cloud/firestore');
const constants = require('./src/constants');
const common = require('./src/common');

const client = new firestore.v1.FirestoreAdminClient();
const bucket = 'gs://learning-backups';

const config = functions.config();

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

exports.auth = require('./src/auth');
exports.league = require('./src/leagues');
exports.team = require('./src/teams');
exports.player = require('./src/players');
exports.activeTeam = require('./src/activeTeam');
exports.weeklyTeam = require('./src/weeklyTeams');
exports.points = require('./src/points');
exports.users = require('./src/users');
exports.listeners = require('./src/listeners');
exports.onSignUp = require('./src/onSignUp');
exports.onDelete = require('./src/onDelete');
exports.firestore = require('./src/firestoreExports');

const operations = admin.firestore.FieldValue;
// currently at v8.13.0 for node

exports.rollOverToNextYear = functions
    .region(constants.region)
    .https.onCall((data, context) => common.isAdmin(context.auth.uid).then(() => {
        const currentYear = new Date().getFullYear();

        // Copy players across to the next year
        db.collection('players').get().then(players => {
            players.docs.forEach(player => db.collection(`players-${currentYear}`)
                .doc(player.id)
                .set({
                    ...player.data()
                }).then(() => {
                    console.log('deleting player', player.id);
                    player.ref.delete();
                }));
        });

        // Copy teams across to next year
        db.collection('teams').get().then(teams => {
            teams.docs.forEach(team => db.collection(`teams-${currentYear}`)
                .doc(team.id)
                .set({
                    ...team.data()
                }).then(() => team.ref.delete()));
        });

        // Reset all active teams
        db.collection('active-teams').get().then(activeTeams => {
            activeTeams.docs.forEach(team => team.ref.update({
                captain: null,
                player_ids: []
            }));
        });

        // Set number of weeks back to 0
        db.collection('application-info').get().then(apps => {
            apps.docs.forEach(app => app.ref.update({
                total_weeks: 0
            }));
        });

        // Reset users points and budget
        db.collection('users').get().then(users => {
            users.docs.forEach(user => user.ref.update({
                total_points: 0,
                remaining_budget: 100
            }));
        });

        // Delete all weekly teams
        db.collection('weekly-teams').get().then(weeklyTeams => {
            weeklyTeams.docs.map(weeklyTeam => weeklyTeam.ref.delete());
        });

        // Delete all weekly players
        db.collection('weekly-players').get().then(weeklyPlayers => {
            weeklyPlayers.docs.map(weeklyPlayer => weeklyPlayer.ref.delete());
        });

        // Delete all player-points
        db.collection('player-points').get().then(playerPoints => {
            playerPoints.docs.map(points => points.ref.delete());
        });

        // Delete all leagues that aren't the original league
        db.collection('leagues').get().then(leagues => {
            leagues.docs.forEach(league => {
                if (!league.data().name === 'Collingwood') {
                    league.ref.delete();
                }
            });
        });

        // Delete all leagues-points
        const leaguePointsDeletionPromises = [];
        db.collection('leagues-points').get().then(leaguePoints => {
            leaguePoints.docs.map(league => db.collection('leagues-points').doc(league.id).delete());
        });

        // Once deleting all leagues points, find league with name Collingwood
        // Then add each user to that league
        Promise.all(leaguePointsDeletionPromises).then(() => {
            db.collection('leagues').where('name', '==', 'Collingwood').get().then(league => {
                if (league.size === 1) {
                    db.collection('users').get().then(users => {
                        users.docs.forEach((user, index) => {
                            console.log('adding user', user.id);
                            db.collection('leagues-points').add({
                                league_id: league.docs[0].id,
                                user_id: user.id,
                                start_week: 0,
                                name: 'Collingwood',
                                user_points: 0,
                                username: user.data().displayName,
                                position: (index + 1),
                                teamName: user.data().teamName
                            });
                        });
                    });
                }
            });
        });
    }));


// Deletes all users who have an empty active team
exports.deleteAllOldUsers = functions
    .region(constants.region)
    .https.onCall((data, context) => common.isAdmin(context.auth.uid).then(() => {
        db.collection('active-teams').get().then(activeTeams => {
            activeTeams.docs.forEach(team => {
                if (team.data().player_ids && team.data().player_ids.length === 0) {
                    console.log(`deleting user with id ${team.data().user_id}`);
                    admin.auth().deleteUser(team.data().user_id).then(
                        () => db.collection('users').doc(team.data().user_id).delete()
                    );
                    team.ref.delete();
                }
            });
        });
    }));
