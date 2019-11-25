/* eslint-disable max-len */
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
    if (!fp.getOr(false, [constants.ROLES.ADMIN])(user.customClaims)) {
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
module.exports.isNumber = value => Boolean((Number(value) && value) >= 0 || Number(value) === 0);

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

const isValidFormation = players => {
    const positionsCounts = {
        [constants.positions.ATTACKER]: 0,
        [constants.positions.MIDFIELDER]: 0,
        [constants.positions.DEFENDER]: 0,
        [constants.positions.GOALKEEPER]: 0
    };

    players.forEach(player => {
        positionsCounts[player.data.position.toUpperCase()] = (positionsCounts[player
            .data
            .position
            .toUpperCase()] || 0) + 1;
    });

    if (positionsCounts[constants.positions.GOALKEEPER] !== 1) {
        throw new functions.https.HttpsError('invalid-argument', 'You must have exactly one goalkeeper');
    }
    if (positionsCounts[constants.positions.DEFENDER] < 3 || positionsCounts[constants.positions.DEFENDER] > 5) {
        throw new functions.https.HttpsError('invalid-argument', 'You must have between 3 and 5 defenders');
    }
    if (positionsCounts[constants.positions.MIDFIELDER] < 3 || positionsCounts[constants.positions.MIDFIELDER] > 5) {
        throw new functions.https.HttpsError('invalid-argument', 'You must have between 3 and 5 midfielders');
    }
    if (positionsCounts[constants.positions.ATTACKER] < 1 || positionsCounts[constants.positions.ATTACKER] > 3) {
        throw new functions.https.HttpsError('invalid-argument', 'You must have between 1 and 3 attackers');
    }
    if (positionsCounts[constants.positions.ATTACKER]
        + positionsCounts[constants.positions.MIDFIELDER]
         + positionsCounts[constants.positions.DEFENDER]
         + positionsCounts[constants.positions.GOALKEEPER] !== 11) {
        throw new functions.https.HttpsError('invalid-argument', 'Team must have 11 players');
    }
    return true;
};

const isValidNumberInEachTeam = players => {
    const numberInEachTeam = {};
    players.forEach(player => {
        numberInEachTeam[player.data.team] = (numberInEachTeam[player.data.team] || 0) + 1;
    });

    Object.keys(numberInEachTeam).forEach(key => {
        if (numberInEachTeam[key] > constants.maxPlayersPerTeam) {
            throw new functions.https.HttpsError('invalid-argument',
                `Maximum players per team is ${constants.maxPlayersPerTeam}. You have ${numberInEachTeam[key]} players from ${key}`);
        }
    });
};

const hasNoRepeatedPlayers = players => {
    const playersAdded = [];
    players.forEach(player => {
        if (playersAdded.includes(player.id)) {
            throw new functions.https.HttpsError('invalid-argument', `You cannot have a player in your team more than once (${player.data.name})`);
        }
        playersAdded.push(player.id);
    });
};

const isCorrectTeamLength = players => {
    if (players.length !== 11) {
        throw new functions.https.HttpsError('invalid-argument', `Your team must only include 11 players. Yours has ${players.length}`);
    }
};

module.exports.teamIsValid = players => {
    isCorrectTeamLength(players);
    hasNoRepeatedPlayers(players);
    isValidNumberInEachTeam(players);
    isValidFormation(players);
    return true;
};
