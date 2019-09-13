const functions = require('firebase-functions');
const constants = require('./constants');

module.exports.isAuthenticated = context => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'You must be authenticated to call this function');
    }
};

module.exports.calculatePoints = (goals, assists, position) => {
    let total = 0;
    total += goals * constants.points.GOAL[position];
    total += assists * constants.points.ASSIST;
    return total;
};

// https://firebase.google.com/docs/reference/functions/functions.https.HttpsError
