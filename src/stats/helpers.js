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
        id: 'cleanSheets',
        label: 'Clean Sheets',
        initialActive: false
    },
    {
        id: 'redCards',
        label: 'Reds',
        initialActive: false
    },
    {
        id: 'yellowCards',
        label: 'Yellows',
        initialActive: false
    },
    {
        id: 'motm',
        label: 'MotM',
        initialActive: false
    },
    {
        id: 'dotd',
        label: 'DotD',
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

export const weeksToRequest = (minRequested, maxRequested, minCurrent, maxCurrent) => {
    console.log('stuff');
    const response = {
        minWeek: minRequested,
        maxWeek: maxRequested
    };
    if (minRequested <= minCurrent) {
        fp.set('minWeek', minRequested)(response);
    }
    if (minRequested >= maxCurrent) {
        fp.set('minWeek', maxCurrent)(response);
    }
    if (maxRequested >= maxCurrent) {
        fp.set('maxWeek', maxRequested)(response);
    }
    if (maxRequested <= minCurrent) {
        fp.set('maxWeek', minCurrent)(response);
    }
    console.log('result', response);
    return response;
};
