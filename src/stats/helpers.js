import fp from 'lodash/fp';

export const columns = [
    {
        id: 'goals',
        label: 'Goals',
        initialActive: true
    },
    {
        id: 'assists',
        label: 'Assists',
        initialActive: true
    },
    {
        id: 'cleanSheet',
        label: 'Clean Sheets',
        initialActive: false
    },
    {
        id: 'redCard',
        label: 'Reds',
        initialActive: false
    },
    {
        id: 'yellowCard',
        label: 'Yellows',
        initialActive: false
    },
    {
        id: 'manOfTheMatch',
        label: 'MotM',
        initialActive: false
    },
    {
        id: 'dickOfTheDay',
        label: 'DotD',
        initialActive: false
    },
    {
        id: 'ownGoals',
        label: 'Own Goals',
        initialActive: false
    }
];

export const marks = [
    {
        value: 0,
        label: '0'
    },
    {
        value: 2,
        label: '2'
    },
    {
        value: 4,
        label: '4'
    },
    {
        value: 6,
        label: '6'
    },
    {
        value: 8,
        label: '8'
    },
    {
        value: 10,
        label: '10'
    }
];

// Join ascending runs into {min/max} objects
const findAdjacent = input => input.reduce((acc, curVal) => {
    if (curVal === fp.get('max')(acc[acc.length - 1]) + 1) {
        return acc.map((x, i) => (i === acc.length - 1 ? ({ ...x, max: curVal }) : x));
    }
    return [...acc, { min: curVal, max: curVal }];
}, []);

export const weeksToRequest = (minRequested, maxRequested, weeksFetched) => {
    const range = fp.range(minRequested, maxRequested + 1);
    const toRequest = range.filter(x => !weeksFetched.includes(x));
    const result = findAdjacent(toRequest);
    return result;
};

export const combinePlayers = players => {
    let output = [];
    players.forEach(player => {
        if (output.some(x => x.player_id === player.player_id)) {
            output = output.map(x => (x.player_id === player.player_id ? ({
                ...player,
                goals: x.goals + player.goals,
                assists: x.assists + player.assists,
                cleanSheet: player.cleanSheet ? x.cleanSheet + 1 : x.cleanSheet,
                redCard: player.redCard ? x.redCard + 1 : x.redCard,
                yellowCard: player.yellowCard ? x.yellowCard + 1 : x.yellowCard,
                manOfTheMatch: player.manOfTheMatch ? x.manOfTheMatch + 1 : x.manOfTheMatch,
                dickOfTheDay: player.dickOfTheDay ? x.dickOfTheDay + 1 : x.dickOfTheDay
            }) : x));
        } else {
            output.push({
                ...player,
                cleanSheet: player.cleanSheet ? 1 : 0,
                redCard: player.redCard ? 1 : 0,
                yellowCard: player.yellowCard ? 1 : 0,
                manOfTheMatch: player.manOfTheMatch ? 1 : 0,
                dickOfTheDay: player.dickOfTheDay ? 1 : 0
            });
        }
    });
    return output;
};
