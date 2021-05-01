const admin = require('firebase-admin');
const functions = require('firebase-functions');
const common = require('./common');

const config = functions.config();
const constants = require('./constants');

const db = admin.firestore();

exports.rollOverToNextYear = functions
    .region(constants.region)
    .https.onCall((data, context) => common.isAdmin(context.auth.uid)
        .then(() => db.collection('players').get().then(players => {
            const numberOfBatches = Math.ceil(players.docs.length / constants.maxBatchSize);
            const playerBatches = [];
            for (let x = 0; x < numberOfBatches; x += 1) {
                playerBatches.push(db.batch());
            }
            players.docs.forEach((player, index) => {
                const batchToTarget = Math.floor(index / constants.maxBatchSize);
                playerBatches[batchToTarget].delete(player.ref);
            });

            playerBatches.forEach((batch, index) => batch.commit().then(() => {
                console.log('Commited batch at index: ', index, ' for rolling over to next year - Deleting Players');
            }));
        })
            .then(() => db.collection('teams').get().then(teams => {
                const numberOfBatches = Math.ceil(teams.docs.length / constants.maxBatchSize);
                const teamBatches = [];
                for (let x = 0; x < numberOfBatches; x += 1) {
                    teamBatches.push(db.batch());
                }
                teams.docs.forEach((team, index) => {
                    const batchToTarget = Math.floor(index / constants.maxBatchSize);
                    teamBatches[batchToTarget].delete(team.ref);
                });

                teamBatches.forEach((batch, index) => batch.commit().then(() => {
                    console.log('Commited batch at index: ', index, ' for rolling over to next year - Deleting Teams');
                }));
            }))
            .then(() => db.collection('the-cup').doc(constants.cupDatabaseId).get().then(doc => {
                if (doc.exists) {
                    doc.ref.delete();
                }
            }))
            .then(() => db.collection('weekly-teams').get().then(weeklyTeams => {
                const numberOfBatches = Math.ceil(weeklyTeams.docs.length / constants.maxBatchSize);
                const weeklyTeamBatches = [];
                for (let x = 0; x < numberOfBatches; x += 1) {
                    weeklyTeamBatches.push(db.batch());
                }
                weeklyTeams.docs.forEach((weeklyTeam, index) => {
                    const batchToTarget = Math.floor(index / constants.maxBatchSize);
                    weeklyTeamBatches[batchToTarget].delete(weeklyTeam.ref);
                });

                weeklyTeamBatches.forEach((batch, index) => batch.commit().then(() => {
                    console.log('Commited batch at index: ', index, ' for rolling over to next year - Deleting Weekly Teams');
                }));
            }))
            .then(() => db.collection('weekly-players').get().then(weeklyPlayers => {
                const numberOfBatches = Math.ceil(weeklyPlayers.docs.length / constants.maxBatchSize);
                const weeklyPlayerBatches = [];
                for (let x = 0; x < numberOfBatches; x += 1) {
                    weeklyPlayerBatches.push(db.batch());
                }
                weeklyPlayers.docs.forEach((weeklyPlayer, index) => {
                    const batchToTarget = Math.floor(index / constants.maxBatchSize);
                    weeklyPlayerBatches[batchToTarget].delete(weeklyPlayer.ref);
                });

                weeklyPlayerBatches.forEach((batch, index) => batch.commit().then(() => {
                    console.log('Commited batch at index: ', index, ' for rolling over to next year - Deleting Weekly Players');
                }));
            }))
            .then(() => db.collection('leagues-points').get().then(leaguesPoints => {
                const numberOfBatches = Math.ceil(leaguesPoints.docs.length / constants.maxBatchSize);
                const leaguesPointsBatches = [];
                for (let x = 0; x < numberOfBatches; x += 1) {
                    leaguesPointsBatches.push(db.batch());
                }
                leaguesPoints.docs.forEach((leaguePoints, index) => {
                    const batchToTarget = Math.floor(index / constants.maxBatchSize);
                    leaguesPointsBatches[batchToTarget].delete(leaguePoints.ref);
                });

                leaguesPointsBatches.forEach((batch, index) => batch.commit().then(() => {
                    console.log('Commited batch at index: ', index, ' for rolling over to next year - Deleting League Points');
                }));
            }))
            .then(() => db.collection('player-points').get().then(playerPointsDocs => {
                const numberOfBatches = Math.ceil(playerPointsDocs.docs.length / constants.maxBatchSize);
                const playerPointsBatches = [];
                for (let x = 0; x < numberOfBatches; x += 1) {
                    playerPointsBatches.push(db.batch());
                }
                playerPointsDocs.docs.forEach((playerPoints, index) => {
                    const batchToTarget = Math.floor(index / constants.maxBatchSize);
                    playerPointsBatches[batchToTarget].delete(playerPoints.ref);
                });

                playerPointsBatches.forEach((batch, index) => batch.commit().then(() => {
                    console.log('Commited batch at index: ', index, ' for rolling over to next year - Deleting Player Points');
                }));
            }))
            .then(() => db.collection('leagues').get().then(leaguesDocs => {
                const numberOfBatches = Math.ceil(leaguesDocs.docs.length / constants.maxBatchSize);
                const leaguesBatches = [];
                for (let x = 0; x < numberOfBatches; x += 1) {
                    leaguesBatches.push(db.batch());
                }
                leaguesDocs.docs.forEach((league, index) => {
                    const batchToTarget = Math.floor(index / constants.maxBatchSize);
                    if (league.data().name !== config.league.name) {
                        leaguesBatches[batchToTarget].delete(league.ref);
                    }
                });

                leaguesBatches.forEach((batch, index) => batch.commit().then(() => {
                    console.log('Commited batch at index: ', index, ' for rolling over to next year - Deleting Leagues');
                }));
            }))
            .then(() => db.collection('users-teams').get().then(usersTeamsDocs => {
                const numberOfBatches = Math.ceil(usersTeamsDocs.docs.length / constants.maxBatchSize);
                const usersTeamsBatches = [];
                for (let x = 0; x < numberOfBatches; x += 1) {
                    usersTeamsBatches.push(db.batch());
                }
                usersTeamsDocs.docs.forEach((userTeam, index) => {
                    const batchToTarget = Math.floor(index / constants.maxBatchSize);
                    usersTeamsBatches[batchToTarget].delete(userTeam.ref);
                });

                usersTeamsBatches.forEach((batch, index) => batch.commit().then(() => {
                    console.log('Commited batch at index: ', index, ' for rolling over to next year - Deleting Users Teams');
                }));
            }))
            .then(() => db.collection('users').get().then(userDocs => {
                const numberOfBatches = Math.ceil(userDocs.docs.length / constants.maxBatchSize);
                const userBatches = [];
                const userLeagueBatches = [];
                for (let x = 0; x < numberOfBatches; x += 1) {
                    userBatches.push(db.batch());
                    userLeagueBatches.push(db.batch());
                }
                userDocs.docs.forEach((user, index) => {
                    const batchToTarget = Math.floor(index / constants.maxBatchSize);
                    const docRef = db.collection('users').doc(user.id);
                    userBatches[batchToTarget].update(docRef, {
                        remaining_budget: 100,
                        remaining_transfers: 0,
                        total_points: 0,
                        notifications: []
                    });
                    const leaguePointsRef = db.collection('leagues-points').doc();
                    userLeagueBatches[batchToTarget].set(leaguePointsRef, {
                        league_id: constants.collingwoodLeagueId,
                        user_id: user.id,
                        start_week: 0,
                        name: config.league.name,
                        user_points: 0,
                        username: user.data().displayName,
                        position: index + 1,
                        teamName: 'Default Team Name'
                    });
                });

                userBatches.forEach((batch, index) => batch.commit().then(() => {
                    console.log('Commited batch at index: ', index, ' for rolling over to next year - Updating Users');
                }));
                userLeagueBatches.forEach((batch, index) => batch.commit().then(() => {
                    console.log('Commited batch at index: ', index, ' for rolling over to next year - Generating League Points');
                }));
            }))
            .then(() => db.collection('active-teams').get().then(activeTeamDocs => {
                const numberOfBatches = Math.ceil(activeTeamDocs.docs.length / constants.maxBatchSize);
                const activeTeamBatches = [];
                for (let x = 0; x < numberOfBatches; x += 1) {
                    activeTeamBatches.push(db.batch());
                }
                activeTeamDocs.docs.forEach((activeTeam, index) => {
                    const batchToTarget = Math.floor(index / constants.maxBatchSize);
                    const docRef = db.collection('active-teams').doc(activeTeam.id);
                    activeTeamBatches[batchToTarget].update(docRef, {
                        player_ids: [],
                        captain: ''
                    });
                });

                activeTeamBatches.forEach((batch, index) => batch.commit().then(() => {
                    console.log('Commited batch at index: ', index, ' for rolling over to next year - Updating Active Teams');
                }));
            }))
            .then(() => db.collection('club-subs').doc(constants.clubSubsHistoryId).delete().then(() => {
                console.log('Deleting club subs history');
            }))
            .then(() => db.collection('results-history').doc(constants.resultsHistoryId).delete().then(() => {
                console.log('Deleting results history');
            }))
            .then(() => db.collection('players-blob').doc(constants.playersBlobId).delete().then(() => {
                console.log('Deleting players blob');
            }))
            .then(() => db.collection('users-with-roles').get().then(userRolesDocs => {
                const numberOfBatches = Math.ceil(userRolesDocs.docs.length / constants.maxBatchSize);
                const userRolesBatches = [];
                for (let x = 0; x < numberOfBatches; x += 1) {
                    userRolesBatches.push(db.batch());
                }
                userRolesDocs.docs.forEach((userRoles, index) => {
                    const batchToTarget = Math.floor(index / constants.maxBatchSize);
                    const { email } = userRoles.data();
                    if (email !== config.admin.email) {
                        admin.auth().getUserByEmail(email).then(user => admin.auth()
                            .setCustomUserClaims(user.uid, null))
                            .then(() => {
                                console.log('clear auth claims');
                            });
                        userRolesBatches[batchToTarget].delete(userRoles.ref);
                    }
                });

                userRolesBatches.forEach((batch, index) => batch.commit().then(() => {
                    console.log('Commited batch at index: ', index, ' for rolling over to next year - Removing User Roles');
                }));
            }))));

// Deletes all users who have an empty active team
exports.deleteAllOldUsers = functions
    .region(constants.region)
    .https.onCall((data, context) => common.isAdmin(context.auth.uid).then(() => {
        db.collection('active-teams').get().then(activeTeams => {
            activeTeams.docs.forEach(team => {
                if (team.data().player_ids && team.data().player_ids.length === 0) {
                    admin.auth().deleteUser(team.data().user_id).then(
                        () => db.collection('users').doc(team.data().user_id).delete()
                    );
                    team.ref.delete();
                }
            });
        });
    }));
