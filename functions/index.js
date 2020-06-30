const admin = require('firebase-admin');
const functions = require('firebase-functions');
const fp = require('lodash/fp');
const lodash = require('lodash');
const firestore = require('@google-cloud/firestore');
const moment = require('moment');
const constants = require('./src/constants');
const common = require('./src/common');

const client = new firestore.v1.FirestoreAdminClient();
const bucket = 'gs://learning-backups';

const config = functions.config();

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

exports.activeTeam = require('./src/activeTeam');
exports.auth = require('./src/auth');
exports.clubSubs = require('./src/clubSubs');
exports.comments = require('./src/comments');
exports.features = require('./src/features');
exports.firestoreExports = require('./src/firestoreExports');
exports.fixtures = require('./src/fixtures');
exports.highlights = require('./src/highlights');
exports.league = require('./src/league');
exports.listeners = require('./src/listeners');
exports.management = require('./src/management');
exports.onDelete = require('./src/onDelete');
exports.onSignUp = require('./src/onSignUp');
exports.player = require('./src/player');
exports.points = require('./src/points');
exports.profile = require('./src/profile');
exports.team = require('./src/teams');
exports.users = require('./src/users');
exports.weeklyTeam = require('./src/weeklyTeam');

const operations = admin.firestore.FieldValue;
// currently at v8.13.0 for node

// // https://firebase.google.com/docs/reference/js/firebase.functions.html#functionserrorcod

const cupStartingWeek = 2;

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
    .document('application-info/{id}')
    .onWrite(change => {
        const previousWeek = change.before.data().total_weeks;
        const newWeek = change.after.data().total_weeks;
        console.log('previous week', previousWeek);
        console.log('next week', newWeek);

        if (newWeek === cupStartingWeek) {
            console.log('initialising cup');
            // Change >= 0
            return db.collection('weekly-teams').where('week', '==', previousWeek).where('points', '>=', 0).get()
                .then(weeklyDocs => {
                    const userIds = weeklyDocs.docs.map(doc => doc.data().user_id);

                    const promises = userIds.map(id => db.collection('users').doc(id).get().then(user => ({
                        userId: id,
                        displayName: user.data().displayName
                    })));

                    return Promise.all(promises).then(mappings => {
                        console.log('mappings', mappings);
                        const displayNameMappings = mappings.reduce((acc, cur) => ({
                            ...acc,
                            [cur.userId]: cur.displayName
                        }), {});

                        const { byes, pairings } = generatePairingsAndByes(userIds);

                        return db.collection('the-cup').doc(constants.cupDatabaseId).set({
                            [cupStartingWeek]: {
                                pairings,
                                byes
                            },
                            displayNameMappings
                        });
                    });
                });
        }
        return db.collection('the-cup').doc(constants.cupDatabaseId).get().then(
            doc => {
                const { hasFinished } = doc.data();
                if (hasFinished) {
                    return Promise.resolve();
                }

                return db.collection('weekly-teams').where('week', '==', previousWeek).get().then(
                    weeklyDocs => {
                        const docsWithScore = weeklyDocs.docs.map(x => ({
                            userId: x.data().user_id,
                            points: x.data().points
                        }));
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
                            return acc;
                        }, []).concat(byes);

                        const newResult = generatePairingsAndByes(remainingPlayers);

                        return db.collection('the-cup').doc(constants.cupDatabaseId).update({
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
        return db.collection('the-cup').doc(constants.cupDatabaseId).get().then(response => response.data());
    });
