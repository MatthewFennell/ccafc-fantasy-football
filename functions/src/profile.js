const admin = require('firebase-admin');
const functions = require('firebase-functions');
const lodash = require('lodash');
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
                    return db.collection('users').doc(context.auth.uid).update({
                        photoUrl: facebookProfilePicture
                    });
                }
                return Promise.resolve();
            }
        );
    });


const updateComments = (database, newUrl, userId) => {
    let documentsToUpdate = [];
    return db.collection(database).get().then(
        documents => documents.docs.forEach(doc => {
            if (doc.data().comments.some(y => y.userId === userId)) {
                documentsToUpdate = lodash.union(documentsToUpdate, [doc.id]);
            }
            if (doc.data().comments.some(y => y.comments.some(z => z.userId === userId))) {
                documentsToUpdate = lodash.union(documentsToUpdate, [doc.id]);
            }
        })
    ).then(() => {
        const documentPromises = [];
        documentsToUpdate.forEach(x => {
            documentPromises.push(db.collection(database).doc(x).get().then(
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
        return db.collection('users').doc(context.auth.uid).update({
            photoUrl: data.photoUrl
        }).then(() => {
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
        if (!data.displayName) {
            throw new functions.https.HttpsError('invalid-argument', 'Must provide a valid display name');
        }
        common.isAuthenticated(context);
        return db.collection('users').doc(context.auth.uid).update({
            displayName: data.displayName
        }).then(
            () => db.collection('leagues-points').where('user_id', '==', context.auth.uid).get().then(
                leagues => leagues.docs.forEach(league => league.ref.update({
                    username: data.displayName
                }))
            )
        );
    });

exports.updateTeamName = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('users').doc(context.auth.uid).update({
            teamName: data.teamName
        }).then(() => db.collection('leagues-points').where('user_id', '==', context.auth.uid).get().then(
            result => result.docs.forEach(doc => doc.ref.update({
                teamName: data.teamName
            }))
        ));
    });