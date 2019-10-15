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

module.exports.calculateDifference = (before, after) => {
    if (before === undefined) {
        return after;
    }
    const shouldUpdate = (field, valBefore, valAfter) => {
        if (valBefore !== null && valBefore !== valAfter) {
            return fp.set(field, valAfter);
        }
        return fp.identity;
    };

    return fp.flow(
        fp.set('goals', after.goals - before.goals),
        fp.set('assists', after.assists - before.assists),
        fp.set('points', after.points - before.points),
        shouldUpdate('cleanSheet', before.cleanSheet, after.cleanSheet),
        shouldUpdate('redCard', before.redCard, after.redCard),
        shouldUpdate('manOfTheMatch', before.manOfTheMatch, after.manOfTheMatch),
    )({});
};

module.exports.calculatePointDifference = (diff, position) => {
    const redCardPoints = redCard => {
        if (redCard === undefined) {
            return 0;
        }
        if (redCard) {
            return constants.points.RED_CARD;
        }
        return constants.points.RED_CARD * -1;
    };

    const cleanSheetPoints = (cleanSheet, pos) => {
        if (cleanSheet === undefined) {
            return 0;
        }
        if (cleanSheet) {
            return constants.points.CLEAN_SHEET[pos];
        }
        return constants.points.CLEAN_SHEET[pos] * -1;
    };

    return fp.flow(
        x => x + (diff.goals || 0) * constants.points.GOAL[position],
        x => x + (diff.assists || 0) * constants.points.ASSIST,
        x => x + cleanSheetPoints(diff.cleanSheet, position),
        x => x + redCardPoints(diff.redCard)
    )(0);
};
