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

module.exports.calculatePoints = (position, goals, assists, cleanSheet,
    redCard, yellowCard, dickOfTheDay, ownGoals) => {
    let total = 0;
    total += goals * constants.points.GOAL[position];
    total += assists * constants.points.ASSIST;
    total += ownGoals * constants.points.OWN_GOAL;
    if (cleanSheet) {
        total += constants.points.CLEAN_SHEET[position];
    }
    if (redCard) {
        total += constants.points.RED_CARD;
    }
    if (yellowCard) {
        total += constants.points.YELLOW_CARD;
    }
    if (dickOfTheDay) {
        total += constants.points.DOTD;
    }
    return total;
};

module.exports.isIntegerGreaterThanEqualZero = value => Number.isInteger(value) && value >= 0;
module.exports.isNumber = value => Boolean(Number(value) && value >= 0);

module.exports.isValidPosition = pos => Boolean(fp.getOr(false, pos)(constants.positions));

module.exports.calculateDifference = (before, after) => {
    const shouldUpdate = (field, valBefore, valAfter) => {
        if (valBefore !== null && valBefore !== valAfter) {
            return fp.set(field, valAfter);
        }
        return fp.identity;
    };

    if (before === undefined) {
        return fp.flow(
            fp.set('goals', after.goals),
            fp.set('assists', after.assists),
            fp.set('ownGoals', after.ownGoals),
            shouldUpdate('cleanSheet', false, after.cleanSheet),
            shouldUpdate('redCard', false, after.redCard),
            shouldUpdate('yellowCard', false, after.yellowCard),
            shouldUpdate('manOfTheMatch', false, after.manOfTheMatch),
            shouldUpdate('dickOfTheDay', false, after.dickOfTheDay),
        )({});
    }

    return fp.flow(
        fp.set('goals', after.goals - before.goals),
        fp.set('assists', after.assists - before.assists),
        fp.set('ownGoals', after.ownGoals - before.ownGoals),
        shouldUpdate('cleanSheet', before.cleanSheet, after.cleanSheet),
        shouldUpdate('redCard', before.redCard, after.redCard),
        shouldUpdate('yellowCard', before.yellowCard, after.yellowCard),
        shouldUpdate('manOfTheMatch', before.manOfTheMatch, after.manOfTheMatch),
        shouldUpdate('dickOfTheDay', before.dickOfTheDay, after.dickOfTheDay),
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

    const manOfTheMatchPoints = motm => {
        if (motm === undefined) {
            return 0;
        }
        if (motm) {
            return constants.points.MOTM;
        }
        return constants.points.MOTM * -1;
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

    const yellowCardPoints = yellowCard => {
        if (yellowCard === undefined) {
            return 0;
        }
        if (yellowCard) {
            return constants.points.YELLOW_CARD;
        }
        return constants.points.YELLOW_CARD * -1;
    };

    const dickOfTheDayPoints = dotd => {
        if (dotd === undefined) {
            return 0;
        }
        if (dotd) {
            return constants.points.DOTD;
        }
        return constants.points.DOTD * -1;
    };

    return fp.flow(
        x => x + (diff.goals || 0) * constants.points.GOAL[position],
        x => x + (diff.assists || 0) * constants.points.ASSIST,
        x => x + (diff.ownGoals || 0) * constants.points.OWN_GOAL,
        x => x + cleanSheetPoints(diff.cleanSheet, position),
        x => x + redCardPoints(diff.redCard),
        x => x + manOfTheMatchPoints(diff.manOfTheMatch),
        x => x + yellowCardPoints(diff.yellowCard),
        x => x + dickOfTheDayPoints(diff.dickOfTheDay),
    )(0);
};
