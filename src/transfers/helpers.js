import fp from 'lodash/fp';
import * as constants from '../constants';

export const generateTeamOptions = teams => teams.map(team => ({
    id: team.id,
    text: team.team_name,
    value: team.team_name
}));

export const positions = Object.keys(constants.POSITIONS).map(pos => ({
    id: pos,
    text: pos[0] + pos.slice(1).toLowerCase(),
    value: pos[0] + pos.slice(1).toLowerCase()
}));

export const sortByOptions = [
    {
        id: 'points',
        text: 'Points',
        value: 'points'
    },
    {
        id: 'goals',
        text: 'Goals',
        value: 'goals'
    },
    {
        id: 'assists',
        text: 'Assists',
        value: 'assists'
    },
    {
        id: 'price',
        text: 'Price',
        value: 'price'
    }
];

export const numberRange = (min, max, interval) => {
    const result = [];
    for (let x = min; x <= max; x += interval) {
        result.push({
            id: x.toFixed(1),
            text: x.toFixed(1),
            value: x.toFixed(1)
        });
    }
    return result;
};


export const columns = [
    {
        id: 'name',
        label: 'Player',
        align: 'center'
    },
    {
        id: 'position',
        label: 'Position',
        align: 'center'
    },
    {
        id: 'team',
        label: 'Team',
        align: 'center'
    },
    {
        id: 'price',
        label: 'Price',
        align: 'center'
    },
    {
        id: 'goals',
        label: 'Goals',
        align: 'center'
    },
    {
        id: 'assists',
        label: 'Assists',
        align: 'center'
    },
    {
        id: 'points',
        label: 'Points',
        align: 'center'
    }
];

export const filterPlayers = (players, team, position, minPrice, maxPrice, sortBy) => {
    const sortByVal = val => (val !== '' ? fp.orderBy(val, 'desc') : fp.identity);

    const shouldFilter = (key, val) => (val !== '' ? fp.filter(x => x[key] === val)
        : fp.identity);

    return fp.flow(
        sortByVal(sortBy),
        shouldFilter('team', team),
        shouldFilter('position', position),
        minPrice !== '' ? fp.filter(x => x.price >= minPrice) : fp.identity,
        maxPrice !== '' ? fp.filter(x => x.price <= maxPrice) : fp.identity,
    )(players);
};

const error = (code, message) => ({
    code,
    message
});

export const canAddPlayer = (player, currentTeam) => {
    const numberInPosition = position => currentTeam
        .filter(x => x.position.toUpperCase() === position.toUpperCase()).length;

    const playerPos = player.position.toUpperCase();

    console.log('current team', currentTeam);
    console.log('player to add', player);


    if (currentTeam.length >= 11) {
        return error('overflow', 'Too many players');
    }

    if (currentTeam.find(x => x.id === player.id)) {
        return error('already-found', 'You already have that player selected');
    }

    if (numberInPosition(playerPos) >= constants.maxPerPosition[playerPos]) {
        return error('max in pos', 'Too many players in that position');
    }


    return true;
};
