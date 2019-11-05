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
    if (minCurrent === null && maxCurrent === null) {
        console.log('both null');
        return [{
            minWeek: minRequested,
            maxWeek: maxRequested
        }];
    }

    if (maxRequested <= maxCurrent && minRequested >= minCurrent) {
        return [];
    }

    if (maxRequested > maxCurrent && minRequested < minCurrent) {
        console.log('extended range in both directions');
        return [
            {
                minWeek: minRequested,
                maxWeek: minCurrent - 1
            },
            {
                minWeek: maxCurrent + 1,
                maxWeek: maxRequested
            }
        ];
    }

    if (maxRequested > maxCurrent) {
        console.log('oh');
        return [
            {
                minWeek: maxCurrent + 1,
                maxWeek: maxRequested
            }
        ];
    }
    if (minRequested < minCurrent) {
        console.log('hi');
        return [
            {
                minWeek: minRequested,
                maxWeek: minCurrent - 1
            }
        ];
    }
    return [];
};
