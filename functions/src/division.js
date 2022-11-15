const _ = require('lodash');
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const common = require('./common');
const constants = require('./constants');

const db = admin.firestore();

const operations = admin.firestore.FieldValue;

exports.addDivision = functions
    .region(constants.region)
    .https.onCall((data, context) => common.hasPermission(context.auth.uid,
        constants.PERMISSIONS.SET_DIVISIONS).then(() => {
        if (!data.link || !data.division) {
            throw new functions.https.HttpsError('invalid-argument', 'Must provide a valid link and division');
        }
        if (!data.link.includes('dur.ac.uk/teamdurham')) {
            throw new functions.https.HttpsError('invalid-argument', 'That does not look like a Team Durham link');
        }
        return common.getCorrectYear(db).collection('divisions').doc(constants.divisionsId).get()
            .then(
                result => {
                    if (!result.exists) {
                        return common.getCorrectYear(db).collection('divisions').doc(constants.divisionsId).set({
                            Divisions: [
                                {
                                    link: data.link,
                                    division: data.division,
                                    isMen: Boolean(data.isMen)
                                }
                            ]
                        });
                    }

                    if (_.some(result.data().Divisions, division => division.link === data.link)) {
                        throw new functions.https.HttpsError('invalid-argument', 'You have already added that division');
                    }

                    return result.ref.update({
                        Divisions: operations.arrayUnion({
                            link: data.link,
                            division: data.division,
                            isMen: Boolean(data.isMen)
                        })
                    });
                }
            );
    }));

exports.deleteDivision = functions
    .region(constants.region)
    .https.onCall((data, context) => common.hasPermission(context.auth.uid,
        constants.PERMISSIONS.SET_DIVISIONS).then(() => {
        if (!data.link) {
            throw new functions.https.HttpsError('invalid-argument', 'Must provide a valid link');
        }
        return common.getCorrectYear(db).collection('divisions').doc(constants.divisionsId).get()
            .then(
                result => {
                    if (!result.exists) {
                        throw new functions.https.HttpsError('invalid-argument', 'Server Error. Something has gone wrong');
                    }

                    if (!_.some(result.data().Divisions, division => division.link === data.link)) {
                        throw new functions.https.HttpsError('invalid-argument', 'There is no division with that link. Contact Matt');
                    }

                    return result.ref.update({
                        Divisions: result.data().Divisions.filter(division => division.link !== data.link)
                    });
                }
            );
    }));
