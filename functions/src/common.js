const functions = require('firebase-functions');
const constants = require('./constants');

module.exports.isAuthenticated = context => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'You must be authenticated to call this function');
    }
};

module.exports.calculatePoints = (position, goals, assists, cleanSheet, redCard, yellowCard) => {
    let total = 0;
    total += goals * constants.points.GOAL[position];
    total += assists * constants.points.ASSIST;
    if (cleanSheet) {
        total += constants.points.CLEAN_SHEET[position];
    }
    if (redCard) {
        total += constants.points.RED_CARD;
    }
    if (yellowCard) {
        total += constants.points.YELLOW_CARD;
    }
    return total;
};

// https://firebase.google.com/docs/reference/functions/functions.https.HttpsError
