const admin = require('firebase-admin');
const functions = require('firebase-functions');
const common = require('./common');
const constants = require('./constants');

const db = admin.firestore();

const getUpdate = changes => {
    const havePaid = changes.filter(c => c.hasPaidSubs).map(p => p.name);
    const haveNotPaid = changes.filter(c => !c.hasPaidSubs).map(p => p.name);
    return {
        havePaid,
        haveNotPaid
    };
};

exports.setHasPaidSubs = functions
    .region(constants.region)
    .https.onCall((data, context) => common.hasPermission(context.auth.uid, constants.PERMISSIONS.MANAGE_SUBS)
        .then(() => {
            const setPaidSubsPromises = [];
            data.changes.forEach(change => {
                setPaidSubsPromises.push(common.getCorrectYear(db).collection('players').doc(change.playerId).get().then(
                    player => {
                        if (!player.exists) {
                            common.log(context.auth.uid, 'Invalid Player ID', { PlayerId: change.playerId });
                            throw new functions.https.HttpsError('not-found', 'Invalid player ID');
                        }
                        return player.ref.update({
                            hasPaidSubs: change.hasPaidSubs
                        });
                    }
                ));
            });

            const getDisplayName = id => common.getCorrectYear(db).collection('users').doc(id).get()
                .then(user => ({
                    displayName: user.data().displayName,
                    email: user.data().email
                }));

            return Promise.all(setPaidSubsPromises).then(() => common.getCorrectYear(db).collection('club-subs').doc(constants.clubSubsHistoryId).get()
                .then(doc => getDisplayName(context.auth.uid).then(user => {
                    const update = {
                        ...getUpdate(data.changes),
                        date: new Date(),
                        author: {
                            displayName: user.displayName,
                            email: user.email,
                            uid: context.auth.uid
                        }
                    };
                    if (!doc.exists) {
                        return common.getCorrectYear(db).collection('club-subs').doc(constants.clubSubsHistoryId).set({
                            history: [update]
                        });
                    }
                    return common.getCorrectYear(db).collection('club-subs').doc(constants.clubSubsHistoryId).update({
                        history: [update, ...doc.data().history]
                    });
                })));
        }));
