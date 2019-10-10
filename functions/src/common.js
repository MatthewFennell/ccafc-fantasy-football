const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fp = require('lodash/fp');
const constants = require('./constants');

module.exports.isAuthenticated = context => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'You must be authenticated to call this function');
    }
};

module.exports.isAdmin = uid => admin.auth().getUser(uid).then(user => {
    if (!fp.getOr(false, 'customClaims.admin')(user)) {
        throw new functions.https.HttpsError('unauthenticated', 'You are not authorized to perform this operation');
    }
});

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

module.exports.isIntegerGreaterThanEqualZero = value => Number.isInteger(value) && value >= 0;
module.exports.isNumber = value => Boolean(Number(value) && value >= 0);

module.exports.isValidPosition = pos => Boolean(fp.getOr(false, pos)(constants.positions));
