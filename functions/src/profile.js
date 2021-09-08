const admin = require('firebase-admin');
const functions = require('firebase-functions');
const _ = require('lodash');
const common = require('./common');
const constants = require('./constants');

const db = admin.firestore();

exports.linkFacebookAccount = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return admin.auth().getUser(context.auth.uid).then(
            user => {
                const facebookProfilePicture = user.providerData.find(x => x.providerId === 'facebook.com').photoURL;
                if (facebookProfilePicture) {
                    return common.getCorrectYear(db).collection('users').doc(context.auth.uid).update({
                        photoUrl: facebookProfilePicture
                    });
                }
                return Promise.resolve();
            }
        );
    });

const updateComments = (database, newUrl, userId) => {
    let documentsToUpdate = [];
    return common.getCorrectYear(db).collection(database).get().then(
        documents => documents.docs.forEach(doc => {
            if (doc.data().comments.some(y => y.userId === userId)) {
                documentsToUpdate = _.union(documentsToUpdate, [doc.id]);
            }
            if (doc.data().comments.some(y => y.comments.some(z => z.userId === userId))) {
                documentsToUpdate = _.union(documentsToUpdate, [doc.id]);
            }
        })
    )
        .then(() => {
            const documentPromises = [];
            documentsToUpdate.forEach(x => {
                documentPromises.push(common.getCorrectYear(db).collection(database).doc(x).get()
                    .then(
                        document => {
                            document.ref.update({
                                comments: document.data().comments.map(y => (y.userId === userId ? ({
                                    ...y,
                                    photoUrl: newUrl,
                                    comments: y.comments.map(z => (z.userId === userId ? ({
                                        ...z,
                                        photoUrl: newUrl
                                    }) : z))
                                }) : ({
                                    ...y,
                                    comments: y.comments.map(z => (z.userId === userId ? ({
                                        ...z,
                                        photoUrl: newUrl
                                    }) : y))
                                })))
                            });
                        }
                    ));
            });
            return documentPromises;
        });
};

exports.updateProfilePicture = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return common.getCorrectYear(db).collection('users').doc(context.auth.uid).update({
            photoUrl: data.photoUrl
        })
            .then(() => {
                updateComments('feature-requests', data.photoUrl, context.auth.uid).then(
                    featuresPromises => {
                        Promise.all(featuresPromises);
                    }
                ).then(() => {
                    updateComments('highlights', data.photoUrl, context.auth.uid).then(
                        highlightsPromises => {
                            Promise.all(highlightsPromises);
                        }
                    );
                });
            });
    });

exports.updateDisplayName = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        if (!data.displayName) {
            throw new functions.https.HttpsError('invalid-argument', 'Must provide a valid display name');
        }
        return common.getCorrectYear(db).collection('users').doc(context.auth.uid).update({
            displayName: data.displayName
        })
            .then(
                () => common.getCorrectYear(db).collection('leagues-points').where('user_id', '==', context.auth.uid).get()
                    .then(
                        leagues => leagues.docs.forEach(league => league.ref.update({
                            username: data.displayName
                        }))
                    )
            );
    });

const updateHistoryNames = (collection, documentId, change, year) => {
    if (!change.after.exists || !change.before.exists) {
        return Promise.resolve();
    }

    const displayNameBefore = change.before.data().displayName;
    const displayNameAfter = change.after.data().displayName;
    const userId = change.after.id;

    if (displayNameBefore === displayNameAfter) {
        return Promise.resolve();
    }

    return common.getCorrectYear(db, year).collection(collection).doc(documentId).get()
        .then(history => {
            if (!history.exists) {
                return Promise.resolve();
            }
            return common.getCorrectYear(db, year).collection(collection).doc(documentId).update({
                history: history.data().history.map(entry => {
                    if (_.get(entry, ['author', 'uid']) === userId) {
                        return {
                            ...entry,
                            author: {
                                ...entry.author,
                                displayName: displayNameAfter
                            }
                        };
                    }
                    return entry;
                })
            });
        });
};

// Update club subs history display names
exports.updateClubSubsDisplayNames = functions.region(constants.region).firestore
    .document('fantasy-years/{year}/users/{id}')
    .onWrite((change, context) => {
        const { year } = context.params;
        updateHistoryNames('club-subs', constants.clubSubsHistoryId, change, year);
    });

// Update club subs history display names
exports.updateUserWithRolesDisplayNames = functions.region(constants.region).firestore
    .document('fantasy-years/{year}/users/{id}')
    .onWrite((change, context) => {
        const { year } = context.params;
        if (!change.after.exists || !change.before.exists) {
            return Promise.resolve();
        }

        const displayNameBefore = change.before.data().displayName;
        const displayNameAfter = change.after.data().displayName;
        const userId = change.after.id;

        if (displayNameBefore === displayNameAfter) {
            return Promise.resolve();
        }
        return common.getCorrectYear(db, year).collection('users-with-roles').doc(userId).get()
            .then(userWithRole => {
                if (!userWithRole.exists) {
                    return Promise.resolve();
                }
                return common.getCorrectYear(db, year).collection('users-with-roles').doc(userId).update({
                    displayName: displayNameAfter
                });
            });
    });

// Update results history display names
exports.updateResultsDisplayNames = functions.region(constants.region).firestore
    .document('fantasy-years/{year}/users/{id}')
    .onWrite((change, context) => {
        const { year } = context.params;
        updateHistoryNames('results-history', constants.resultsHistoryId, change, year);
    });

const updateFeaturesAndHighlightsDisplayNames = (collection, change) => {
    if (!change.after.exists || !change.before.exists) {
        return Promise.resolve();
    }
    const displayNameBefore = change.before.data().displayName;
    const displayNameAfter = change.after.data().displayName;
    const userId = change.after.id;

    if (displayNameBefore === displayNameAfter) {
        return Promise.resolve();
    }

    return common.getCorrectYear(db, year).collection(collection).where('userId', '==', userId).get()
        .then(
            result => result.docs.forEach(doc => doc.ref.update({
                displayName: displayNameAfter
            }))
        );
};

// Update features display names
exports.updateFeatures = functions.region(constants.region).firestore
    .document('fantasy-years/{year}/users/{id}')
    .onWrite((change, context) => {
        const { year } = context.params
        updateFeaturesAndHighlightsDisplayNames('feature-requests', change, year);
    });

exports.updateHighlightsDisplayNames = functions.region(constants.region).firestore
    .document('fantasy-years/{year}/users/{id}')
    .onWrite((change, context) => {
        const { year } = context.params
        updateFeaturesAndHighlightsDisplayNames('highlights', change, year);
    });

// Update cup display name mapping
exports.updateCupDisplayNameMapping = functions.region(constants.region).firestore
    .document('fantasy-years/{year}/users/{id}')
    .onWrite((change, context) => {
        const { year } = context.params
        if (!change.after.exists || !change.before.exists) {
            return Promise.resolve();
        }
        const displayNameBefore = change.before.data().displayName;
        const displayNameAfter = change.after.data().displayName;

        if (displayNameBefore === displayNameAfter) {
            return Promise.resolve();
        }

        return common.getCorrectYear(db, year).collection('the-cup').doc(constants.cupDatabaseId).get()
            .then(cup => {
                if (!cup.exists) {
                    return Promise.resolve();
                }

                const userId = change.after.id;
                const { displayNameMappings } = cup.data();
                if (displayNameMappings[userId]) {
                    return cup.ref.update({
                        displayNameMappings: {
                            ...displayNameMappings,
                            [userId]: displayNameAfter
                        }
                    });
                }
                return Promise.resolve();
            });
    });

exports.updateTeamName = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return common.getCorrectYear(db).collection('users').doc(context.auth.uid).update({
            teamName: data.teamName
        })
            .then(() => common.getCorrectYear(db).collection('leagues-points').where('user_id', '==', context.auth.uid).get()
                .then(
                    result => result.docs.forEach(doc => doc.ref.update({
                        teamName: data.teamName
                    }))
                ));
    });
