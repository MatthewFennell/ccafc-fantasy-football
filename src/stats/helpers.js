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
