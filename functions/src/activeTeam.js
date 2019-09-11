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

const teamIsValid = players => {
    isCorrectTeamLength(players);
    hasNoRepeatedPlayers(players);
    isValidNumberInEachTeam(players);
    isValidFormation(players);
    return true;
};


exports.addPlayerToActiveTeam = functions
    .region('europe-west2')
    .https.onCall((data, context) => {
        commonFunctions.isAuthenticated(context);
        const usersActiveTeam = db.collection('active-teams')
            .where('user_id', '==', context.auth.uid);
        const playerRef = db.collection('players').doc(data.playerId);
        return playerRef.get().then(player => (player.exists ? usersActiveTeam.get()
            .then(querySnapshot => {
                querySnapshot.docs.map(doc => db.collection('active-teams').doc(doc.id)
                    .update({
                        player_ids: admin.firestore.FieldValue.arrayUnion(data.playerId)
                    })
                    .then(() => db.collection('active-teams').doc(doc.id).collection('players').add({
                        name: player.data().name,
                        position: player.data().position,
                        price: player.data().price,
                        team: player.data().team,
                        player_id: data.playerId
                    })));
            })
            : false));
    });

exports.setActiveTeam = functions
    .region('europe-west2')
    .https.onCall((data, context) => {
        commonFunctions.isAuthenticated(context);

        // Push the promises to an array
        const promises = [];
        data.activeTeam.map(playerId => promises.push(db.collection('players').doc(playerId).get()
            .then(doc => {
                if (doc.exists) return ({ data: doc.data(), id: doc.id });
                throw new functions.https.HttpsError('not-found', 'Invalid player ID');
            })));

        // Once all of the promises are resolved, then operate on them
        return Promise.all(promises)
            .then(players => {
                if (teamIsValid(players)) {
                    const usersActiveTeamRef = db.collection('active-teams')
                        .where('user_id', '==', context.auth.uid);
                    usersActiveTeamRef.get().then(teamRef => {
                        teamRef.docs.map(doc => db.collection('active-teams').doc(doc.id).update({
                            player_ids: players.map(player => player.id)
                        }).then(() => {
                            players.forEach(player => {
                                db.collection('active-teams').doc(doc.id).collection('players').add({
                                    name: player.data.name,
                                    position: player.data.position,
                                    price: player.data.price,
                                    team: player.data.team,
                                    player_id: player.id
                                });
                            });
                        }));
                    }).then(() => {
                        const sum = players.reduce((acc, curVal) => acc + curVal.data.price, 0);
                        db.collection('users').doc(context.auth.uid).update({
                            remaining_budget: admin.firestore.FieldValue.increment(sum * -1)
                        });
                    });
                }
            })
            .catch(error => {
                throw new functions.https.HttpsError(error.code, error.message);
            });
    });
