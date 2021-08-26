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

exports.manageCup = functions.region(constants.region).firestore
    .document('fantasy-years/{year}/application-info/{id}')
    .onWrite((change, context) => {
        const { year } = context.params
        if (!change.after.exists) {
            return Promise.resolve();
        }
        const previousWeek = change.before.data().total_weeks;
        const newWeek = change.after.data().total_weeks;

        if (change.after.data().hasFinished) {
            return Promise.resolve();
        }

        if (previousWeek === newWeek) {
            return Promise.resolve();
        }

        if (newWeek === constants.cupStartingWeek) {
            // Change >= 0
            return common.getCorrectYear(db, year).collection('weekly-teams').where('week', '==', previousWeek).where('points', '>', 0)
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

                        return common.getCorrectYear(db, year).collection('the-cup').doc(constants.cupDatabaseId).set({
                            [constants.cupStartingWeek]: {
                                pairings,
                                byes
                            },
                            displayNameMappings,
                            hasFinished: false,
                            winner: null
                        });
                    });
                });
        }
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

exports.fetchCup = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return common.getCorrectYear(db).collection('the-cup').doc(constants.cupDatabaseId).get()
            .then(response => response.data());
    });
