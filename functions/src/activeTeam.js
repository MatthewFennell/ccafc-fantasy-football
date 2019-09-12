/* eslint-disable max-len */
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const commonFunctions = require('./common');
const constants = require('./constants');

const db = admin.firestore();

const isValidFormation = players => {
    const positionsCounts = {
        [constants.positions.ATTACKER]: 0,
        [constants.positions.MIDFIELDER]: 0,
        [constants.positions.DEFENDER]: 0,
        [constants.positions.GOALKEEPER]: 0
    };

    players.forEach(player => {
        positionsCounts[player.data.position.toUpperCase()] = (positionsCounts[player
            .data
            .position
            .toUpperCase()] || 0) + 1;
    });

    if (positionsCounts[constants.positions.GOALKEEPER] !== 1) {
        throw new functions.https.HttpsError('invalid-argument', 'You must have exactly one goalkeeper');
    }
    if (positionsCounts[constants.positions.DEFENDER] < 3 || positionsCounts[constants.positions.DEFENDER] > 5) {
        throw new functions.https.HttpsError('invalid-argument', 'You must have between 3 and 5 defenders');
    }
    if (positionsCounts[constants.positions.MIDFIELDER] < 3 || positionsCounts[constants.positions.MIDFIELDER] > 5) {
        throw new functions.https.HttpsError('invalid-argument', 'You must have between 3 and 5 midfielders');
    }
    if (positionsCounts[constants.positions.ATTACKER] < 1 || positionsCounts[constants.positions.ATTACKER] > 3) {
        throw new functions.https.HttpsError('invalid-argument', 'You must have between 1 and 3 attackers');
    }
    if (positionsCounts[constants.positions.ATTACKER]
        + positionsCounts[constants.positions.MIDFIELDER]
         + positionsCounts[constants.positions.DEFENDER]
         + positionsCounts[constants.positions.GOALKEEPER] !== 11) {
        throw new functions.https.HttpsError('invalid-argument', 'Team must have 11 players');
    }
    return true;
};

const isValidNumberInEachTeam = players => {
    const numberInEachTeam = {};
    players.forEach(player => {
        numberInEachTeam[player.data.team] = (numberInEachTeam[player.data.team] || 0) + 1;
    });

    Object.keys(numberInEachTeam).forEach(key => {
        if (numberInEachTeam[key] > constants.maxPlayersPerTeam) {
            throw new functions.https.HttpsError('invalid-argument',
                `Maximum players per team is ${constants.maxPlayersPerTeam}. You have ${numberInEachTeam[key]} players from ${key}`);
        }
    });
};

const hasNoRepeatedPlayers = players => {
    const playersAdded = [];
    players.forEach(player => {
        if (playersAdded.includes(player.id)) {
            throw new functions.https.HttpsError('invalid-argument', `You cannot have a player in your team more than once (${player.data.name})`);
        }
        playersAdded.push(player.id);
    });
};

const isCorrectTeamLength = players => {
    if (players.length !== 11) {
        throw new functions.https.HttpsError('invalid-argument', `Your team must only include 11 players. Yours has ${players.length}`);
    }
};

const isValidPrice = players => {
    const totalPrice = players.reduce((acc, curVal) => acc + curVal.data.price, 0);
    if (totalPrice > 100) {
        throw new functions.https.HttpsError('invalid-argument', `Too expensive. The budget is £100 mil, your team costs £${totalPrice} mil`);
    }
};

const teamIsValid = players => {
    isCorrectTeamLength(players);
    hasNoRepeatedPlayers(players);
    isValidPrice(players);
    isValidNumberInEachTeam(players);
    isValidFormation(players);
    return true;
};

exports.updateActiveTeam = functions
    .region('europe-west2')
    .https.onCall((data, context) => {
        commonFunctions.isAuthenticated(context);
        const activeTeamRef = db.collection('active-teams').where('user_id', '==', context.auth.uid);
        return activeTeamRef.get()
            .then(activeDocs => activeDocs.docs
                .map(doc => ({ player_ids: doc.data().player_ids, id: doc.id })))
            .then(currentTeam => {
                if (currentTeam.length !== 1) {
                    throw new functions.https.HttpsError('not-found', 'Something has gone wrong with your active team');
                }

                const myActiveTeamIds = currentTeam[0].player_ids;
                const activeTeamId = currentTeam[0].id;

                const newPlayers = data.playersToAdd
                    .filter(p => !myActiveTeamIds.includes(p));

                const removedPlayers = data.playersToRemove
                    .filter(p => myActiveTeamIds.includes(p));

                const newTeam = myActiveTeamIds
                    .filter(p => !data.playersToRemove
                        .includes(p)).concat(newPlayers);

                const promises = [];
                newTeam.map(playerId => promises.push(db.collection('players').doc(playerId).get()
                    .then(doc => {
                        if (doc.exists) return ({ data: doc.data(), id: doc.id });
                        throw new functions.https.HttpsError('not-found', 'Invalid player ID');
                    })));

                return Promise.all(promises).then(players => {
                    teamIsValid(players);

                    // Set the player_ids of the active team
                    return db.collection('active-teams').doc(activeTeamId).update({
                        player_ids: newTeam
                    }).then(() => db.collection('active-teams').doc(activeTeamId).collection('players').get()

                    // For each player in the active team, remove if they aren't in the new team
                        .then(activePlayerDocs => activePlayerDocs.docs.forEach(p => {
                            if (!newTeam.includes(p.data().player_id)) {
                                db.collection('active-teams').doc(activeTeamId).collection('players').doc(p.id)
                                    .delete();
                            }
                        }))
                        .then(() => {
                            // Filter players for just the new players being added and add them
                            players.filter(p => newPlayers.includes(p.id)).forEach(p => {
                                db.collection('active-teams').doc(activeTeamId).collection('players').add({
                                    name: p.data.name,
                                    position: p.data.position,
                                    price: p.data.price,
                                    team: p.data.team,
                                    player_id: p.id
                                });
                            });
                        })
                        .then(() => {
                            // Find all of the removed players
                            const playersToRemovePromises = [];
                            removedPlayers.map(playerId => playersToRemovePromises.push(db.collection('players').doc(playerId).get()
                                .then(doc => {
                                    if (doc.exists) return (doc.data().price);
                                    throw new functions.https.HttpsError('not-found', 'Invalid player ID');
                                })));
                            return Promise.all(playersToRemovePromises).then(prices => {
                                const newPlayersPrice = players
                                    .filter(p => newPlayers.includes(p.id))
                                    .reduce((acc, curVal) => acc + curVal.data.price, 0);

                                const removedPlayersPrice = prices
                                    .reduce((acc, curVal) => acc + curVal, 0);

                                db.collection('users').doc(context.auth.uid).get().then(
                                    user => {
                                        // Update the points / transfers / budget of the user
                                        const remainingTransfers = user.data().remaining_transfers;
                                        const numberOfTransfers = removedPlayers.length;
                                        const pointsPenalty = Math.max(
                                            (numberOfTransfers - remainingTransfers)
                                            * constants.transferPointPenalty, 0
                                        );

                                        db.collection('users').doc(context.auth.uid).update({
                                            remaining_budget: admin.firestore.FieldValue
                                                .increment(removedPlayersPrice - newPlayersPrice),
                                            total_points: admin.firestore.FieldValue
                                                .increment(pointsPenalty * -1),
                                            remaining_transfers: Math.max(
                                                0, remainingTransfers - numberOfTransfers
                                            )
                                        });
                                    }
                                );
                                return players;
                            });
                        }));
                });
            }).then(players => players);
    });

exports.fetchMyActiveTeam = functions
    .region('europe-west2')
    .https.onCall((data, context) => {
        const activeTeamRef = db.collection('active-teams').where('user_id', '==', context.auth.uid);
        return activeTeamRef.get()
            .then(activeDocs => activeDocs.docs
                .map(doc => (doc.id)))
            .then(documentIds => {
                if (documentIds.length !== 1) {
                    throw new functions.https.HttpsError('not-found', 'Something has gone wrong with your active team');
                }
                return db.collection('active-teams').doc(documentIds[0]).collection('players').get()
                    .then(playerDocs => playerDocs.docs
                        .map(player => ({ data: player.data(), id: player.id })));
            });
    });
