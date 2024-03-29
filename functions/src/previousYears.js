const admin = require('firebase-admin');
const functions = require('firebase-functions');
const common = require('./common');
const constants = require('./constants');

const db = admin.firestore();

const operations = admin.firestore.FieldValue;

exports.previousYears = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('fantasy-years').get()
            .then(result => result.docs);
    });

exports.getNumberOfYears = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('fantasy-years').doc(constants.numberOfYearsId).get().then(
            numberOfYears => numberOfYears.data().years
        );
    });

exports.getHistoryForYear = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        if (!data.year) {
            throw new functions.https.HttpsError('invalid-argument', 'Must provide a year to fetch');
        }
        common.isAuthenticated(context);
        return common.getCorrectYear(db, data.year).collection('players-blob').doc(constants.playersBlobId).get()
            .then(doc => {
                if (doc.exists) {
                    const { blob } = doc.data();
                    return JSON.parse(blob);
                }
                return Promise.resolve([]);
            });
    });
