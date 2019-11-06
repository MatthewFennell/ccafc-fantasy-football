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

// Join ascending runs into {min/max} objects
const findAdjacent = input => {
    const result = [];
    let min = 0;
    let max = 0;
    input.forEach((x, i) => {
        if (i === 0) {
            min = x;
            max = x;
            if (input.length === 1) {
                result.push({ min, max });
            }
        } else if (i === (input.length - 1)) {
            if (input[i - 1] + 1 === x) {
                result.push({ min, max: x });
            } else {
                result.push({ min, max });
                result.push({ min: x, max: x });
            }
        } else if (input[i - 1] + 1 === x) {
            max += 1;
        } else {
            result.push({ min, max });
            min = x;
            max = x;
        }
    });
    return result;
};

export const weeksToRequest = (minRequested, maxRequested, weeksFetched) => {
    const range = fp.range(minRequested, maxRequested + 1);
    console.log('range', range);
    console.log('already fetched', weeksFetched);
    const toRequest = range.filter(x => !weeksFetched.includes(x));
    console.log('to request', toRequest);
    const result = findAdjacent(toRequest);
    console.log('result', result);
    return result;
};
