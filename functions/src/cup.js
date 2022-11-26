const admin = require('firebase-admin');
const functions = require('firebase-functions');
const fp = require('lodash/fp');
const common = require('./common');
const constants = require('./constants');

const db = admin.firestore();

const isPowerOfTwo = x => (x & (x - 1)) === 0;

const findNearestPowerOfTwo = input => {
    for (let x = input - 1; x >= 0; x -= 1) {
        if (isPowerOfTwo(x)) {
            return x;
        }
    }
    return 0;
};

const numberOfMatchesThatNeedToBePlayed = n => {
    const nearestPowerOf2 = findNearestPowerOfTwo(n);
    if (nearestPowerOf2 === n) {
        return n / 2;
    }
    return n - nearestPowerOf2;
};

const generatePairingsAndByes = playerIds => {
    const numMatches = numberOfMatchesThatNeedToBePlayed(playerIds.length);
    const numByes = playerIds.length - numMatches * 2;
    const byes = [];
    const pairings = [];

    for (let x = 0; x < numByes; x += 1) {
        byes.push(playerIds[x]);
    }

    for (let x = numByes; x < playerIds.length; x += 2) {
        pairings.push({
            playerOneId: playerIds[x],
            playerTwoId: playerIds[x + 1]
        });
    }

    return { byes, pairings };
};

const createInitialPairings = (year, previousWeek, documentId, startingWeek) => common.getCorrectYear(db, year).collection('weekly-teams')
    .where('week', '==', previousWeek).where('points', '>', 0)
    .get()
    .then(weeklyDocs => {
        const userIds = fp.shuffle(weeklyDocs.docs.map(doc => doc.data().user_id));

        const promises = userIds.map(id => common.getCorrectYear(db, year).collection('users').doc(id).get()
            .then(user => ({
                userId: id,
                displayName: user.data().displayName
            })));

        return Promise.all(promises).then(mappings => {
            const displayNameMappings = mappings.reduce((acc, cur) => ({
                ...acc,
                [cur.userId]: cur.displayName
            }), {});

            const { byes, pairings } = generatePairingsAndByes(userIds);

            return common.getCorrectYear(db, year).collection('the-cup').doc(documentId).set({
                [startingWeek]: {
                    pairings,
                    byes
                },
                displayNameMappings,
                hasFinished: false,
                winner: null
            });
        });
    });

const updateResults = (year, previousWeek, newWeek, documentId) => common.getCorrectYear(db, year).collection('the-cup').doc(documentId).get()
    .then(
        doc => {
            if (!doc.exists) {
                return Promise.resolve();
            }

            const { hasFinished } = doc.data();
            if (hasFinished) {
                return Promise.resolve();
            }
            return common.getCorrectYear(db, year).collection('weekly-teams').where('week', '==', previousWeek).get()
                .then(
                    weeklyDocs => {
                        const docsWithScore = fp.shuffle(weeklyDocs.docs.map(x => ({
                            userId: x.data().user_id,
                            points: x.data().points
                        })));
                        const { pairings, byes } = doc.data()[previousWeek];

                        const updatedPairings = pairings.map(pairing => ({
                            ...pairing,
                            playerOneScore: docsWithScore.find(x => x.userId === pairing.playerOneId).points,
                            playerTwoScore: docsWithScore.find(x => x.userId === pairing.playerTwoId).points
                        }));

                        const remainingPlayers = updatedPairings.reduce((acc, cur) => {
                            if (cur.playerOneScore > cur.playerTwoScore) {
                                return [...acc, cur.playerOneId];
                            }
                            if (cur.playerTwoScore > cur.playerOneScore) {
                                return [...acc, cur.playerTwoId];
                            }
                            if (cur.playerTwoScore === cur.playerOneScore) {
                                const randomNumber = Math.floor(Math.random() * 10);
                                if (randomNumber % 2 === 0) {
                                    return [...acc, cur.playerOneId];
                                }
                                return [...acc, cur.playerTwoId];
                            }
                            // If they are the final 2 and they draw - cant have no winner
                            if (updatedPairings.length === 1) {
                                return [cur.playerOneId, cur.playerTwoId];
                            }
                            return acc;
                        }, []).concat(byes);

                        if (remainingPlayers.length === 1) {
                            return common.getCorrectYear(db, year).collection('the-cup').doc(documentId).update({
                                [previousWeek]: {
                                    ...doc.data()[previousWeek],
                                    pairings: updatedPairings
                                },
                                hasFinished: true,
                                winner: remainingPlayers[0]
                            });
                        }

                        const newResult = generatePairingsAndByes(remainingPlayers);

                        return common.getCorrectYear(db, year).collection('the-cup').doc(documentId).update({
                            [previousWeek]: {
                                ...doc.data()[previousWeek],
                                pairings: updatedPairings
                            },
                            [newWeek]: {
                                byes: newResult.byes,
                                pairings: newResult.pairings
                            }
                        });
                    }
                );
        }
    );

exports.manageCup = functions.region(constants.region).firestore
    .document('fantasy-years/{year}/application-info/{id}')
    .onWrite((change, context) => {
        const { year } = context.params;
        if (!change.after.exists) {
            return Promise.resolve();
        }
        const previousWeek = change.before.data().total_weeks;
        const newWeek = change.after.data().total_weeks;

        if (previousWeek === newWeek) {
            return Promise.resolve();
        }

        return common.getCorrectYear(db, year).collection('the-cup').doc(constants.cupDatabaseId).get()
            .then(originalDoc => {
                // If the first cup has finished, start a 2nd cup
                if (originalDoc.data().hasFinished) {
                    return common.getCorrectYear(db, year).collection('the-cup').doc(constants.cupDatabaseIdRoundTwo).get()
                        .then(newCup => {
                            if (!newCup.exists) {
                                return createInitialPairings(year, previousWeek, constants.cupDatabaseIdRoundTwo, newWeek);
                            }
                            return updateResults(year, previousWeek, newWeek, constants.cupDatabaseIdRoundTwo);
                        });
                }

                if (newWeek === constants.cupStartingWeek) {
                    return createInitialPairings(year, previousWeek, constants.cupDatabaseId, constants.cupStartingWeek);
                    // Change >= 0
                }
                // return updateResults(year, previousWeek, newWeek, constants.cupDatabaseId);
                return common.getCorrectYear(db, year).collection('the-cup').doc(constants.cupDatabaseId).get()
                    .then(
                        doc => {
                            if (!doc.exists) {
                                return Promise.resolve();
                            }

                            const { hasFinished } = doc.data();
                            if (hasFinished) {
                                return Promise.resolve();
                            }

                            return common.getCorrectYear(db, year).collection('weekly-teams').where('week', '==', previousWeek).get()
                                .then(
                                    weeklyDocs => {
                                        const docsWithScore = fp.shuffle(weeklyDocs.docs.map(x => ({
                                            userId: x.data().user_id,
                                            points: x.data().points
                                        })));
                                        const { pairings, byes } = doc.data()[previousWeek];

                                        const updatedPairings = pairings.map(pairing => ({
                                            ...pairing,
                                            playerOneScore: docsWithScore.find(x => x.userId === pairing.playerOneId).points,
                                            playerTwoScore: docsWithScore.find(x => x.userId === pairing.playerTwoId).points
                                        }));

                                        const remainingPlayers = updatedPairings.reduce((acc, cur) => {
                                            if (cur.playerOneScore > cur.playerTwoScore) {
                                                return [...acc, cur.playerOneId];
                                            }
                                            if (cur.playerTwoScore > cur.playerOneScore) {
                                                return [...acc, cur.playerTwoId];
                                            }
                                            if (cur.playerTwoScore === cur.playerOneScore) {
                                                const randomNumber = Math.floor(Math.random() * 10);
                                                if (randomNumber % 2 === 0) {
                                                    return [...acc, cur.playerOneId];
                                                }
                                                return [...acc, cur.playerTwoId];
                                            }
                                            // If they are the final 2 and they draw - cant have no winner
                                            if (updatedPairings.length === 1) {
                                                return [cur.playerOneId, cur.playerTwoId];
                                            }
                                            return acc;
                                        }, []).concat(byes);

                                        if (remainingPlayers.length === 1) {
                                            return common.getCorrectYear(db, year).collection('the-cup').doc(constants.cupDatabaseId).update({
                                                [previousWeek]: {
                                                    ...doc.data()[previousWeek],
                                                    pairings: updatedPairings
                                                },
                                                hasFinished: true,
                                                winner: remainingPlayers[0]
                                            });
                                        }

                                        const newResult = generatePairingsAndByes(remainingPlayers);

                                        return common.getCorrectYear(db, year).collection('the-cup').doc(constants.cupDatabaseId).update({
                                            [previousWeek]: {
                                                ...doc.data()[previousWeek],
                                                pairings: updatedPairings
                                            },
                                            [newWeek]: {
                                                byes: newResult.byes,
                                                pairings: newResult.pairings
                                            }
                                        });
                                    }
                                );
                        }
                    );
            });
    });

exports.fetchCup = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return common.getCorrectYear(db).collection('the-cup').doc(constants.cupDatabaseId).get()
            .then(response => common.getCorrectYear(db).collection('the-cup').doc(constants.cupDatabaseIdRoundTwo).get()
                .then(res => ({
                    cupOne: response.exists ? response.data() : null,
                    cupTwo: res.exists ? res.data() : null
                })));
    });

exports.updateLeaguesPoints = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return common.getCorrectYear(db).collection('leagues-points')
            .where('position', '<', 101).get()
            .then(docs => {
                console.log('docs length', docs.docs.length);
                return docs.docs.forEach(doc => {
                    const { user_id } = doc.data();
                    console.log('Checking doc for ', user_id);
                    return common.getCorrectYear(db).collection('active-teams').where('user_id', '==', user_id).get()
                        .then(
                            activeTeams => {
                                if (activeTeams.docs.length === 0) {
                                    return Promise.resolve();
                                }
                                const activeTeam = activeTeams.docs[0];
                                const { player_ids } = activeTeam.data();
                                console.log('Updating to be', player_ids.length > 0);
                                return doc.ref.update({
                                    hasPlayerInActiveTeam: player_ids.length > 0
                                });
                            }
                        );
                });
            });
    });
