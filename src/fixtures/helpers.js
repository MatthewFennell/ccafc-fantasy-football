import _ from 'lodash';
import * as helpers from '../helperFunctions';

export const gridStyles = {
    root: {
        width: '100%'
    },
    tableWrapper: {
        overflow: 'auto'
    },
    maxHeightSet: {
        maxHeight: 400
    }
};

export const columns = [
    {
        id: 'teamOne',
        label: 'Home',
        align: 'center'
    },
    {
        id: 'result',
        label: 'Status',
        align: 'center'
    },
    {
        id: 'teamTwo',
        label: 'Away',
        align: 'center'
    },
    {
        id: 'location',
        label: 'Location',
        align: 'center'
    },
    {
        id: 'time',
        label: 'Time',
        align: 'center'
    }
];

export const fixturesFilters = (myTeam, fixtures) => {
    const leagues = fixtures.reduce((prev, curr) => _.uniqBy(
        [...prev, curr.league]
    ), []);

    return [
        {
            radioLabel: 'My Team',
            value: myTeam
        },
        {
            radioLabel: 'All Leagues',
            value: 'All'
        }
    ].concat(leagues.map(x => ({
        radioLabel: x,
        value: x
    })));
};

export const generateCollingwoodTeams = fixtures => fixtures
    .reduce((prev, curr) => _.uniqBy(
        [...prev, curr.teamOne, curr.teamTwo]
    ), [])
    .filter(x => x.includes('Collingwood'))
    .sort()
    .map(x => ({
        id: x,
        value: x,
        text: x
    }));

export const filterFixtures = (fixtures, league, collingwoodOnly, upcomingOnly, teamName) => {
    // My team could be selected - causes the league to be the name of their team
    const leagueFilter = league === 'All' ? () => true
        : x => x.league === league || x.teamOne === league || x.teamTwo === league;

    const collingwoodOnlyFilter = collingwoodOnly
        ? x => x.teamOne.includes('Collingwood') || x.teamTwo.includes('Collingwood') : () => true;

    const upcomingOnlyFilter = upcomingOnly ? x => !x.completed : () => true;

    const teamNameFilter = x => x.teamOne.includes(teamName) || x.teamTwo.includes(teamName);

    const filteredFixtures = fixtures
        .filter(leagueFilter)
        .filter(collingwoodOnlyFilter)
        .filter(upcomingOnlyFilter)
        .filter(teamNameFilter)
        .map(fixture => ({ ...fixture, id: `${fixture.teamOne}-${fixture.teamTwo}` }));

    return helpers.sortMatchesByDate(filteredFixtures, false);
};
