import _ from 'lodash';
import moment from 'moment';
import * as helpers from '../helperFunctions';

export const gridStyles = () => ({
    root: {
        width: '100%'
    },
    tableWrapper: {
        overflow: 'auto'
    },
    maxHeightSet: {
        maxHeight: 600
    }
});

export const columns = [
    {
        id: 'teamOne',
        label: 'Home',
        align: 'center'
    },
    {
        id: 'result',
        label: 'Result',
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
            text: 'My Team',
            id: myTeam,
            value: myTeam
        },
        {
            text: 'All Leagues',
            id: 'All',
            value: 'All'
        }
    ].concat(leagues.map(x => ({
        text: x,
        id: x,
        value: x
    }))).filter(x => x.value !== 'No team set' && x.value);
};

export const generateCollingwoodTeams = (fixtures, isMen = true) => fixtures
    .reduce((prev, curr) => _.uniqBy(
        [...prev, curr.teamOne, curr.teamTwo]
    ), [])
    .filter(x => x.includes(process.env.REACT_APP_COLLEGE_NAME))
    .sort()
    .map(x => ({
        id: isMen ? x : `${x} (Women)`,
        value: isMen ? x : `${x} (Women)`,
        text: isMen ? x : `${x} (Women)`
    }));

export const generateBothCollingwoodTeams = fixtures => {
    const mens = generateCollingwoodTeams(fixtures.filter(x => x.isMen), true);
    const womens = generateCollingwoodTeams(fixtures.filter(x => !x.isMen), false);
    return mens.concat(womens);
};

const isDateInFuture = date => helpers.convertToDate(date).isAfter(moment());

const transformTeamName = (teamName, isMen) => {
    if (teamName.includes(process.env.REACT_APP_COLLEGE_NAME) && !isMen) {
        return `${teamName} (Women)`;
    }
    return teamName;
};

export const filterFixtures = (fixtures, league, collingwoodOnly, upcomingOnly, teamName) => {
    // My team could be selected - causes the league to be the name of their team
    const leagueFilter = x => {
        let copyLeague = league;
        if (copyLeague === 'All' || copyLeague === '') {
            return true;
        }
        if (copyLeague && copyLeague.includes(' (Women')) {
            copyLeague = league.replace(' (Women)', '');
        }
        return x.league === copyLeague || x.teamOne === copyLeague || x.teamTwo === copyLeague;
    };

    const collingwoodOnlyFilter = collingwoodOnly
        ? x => x.teamOne.includes(process.env.REACT_APP_COLLEGE_NAME)
        || x.teamTwo.includes(process.env.REACT_APP_COLLEGE_NAME) : () => true;

    const upcomingOnlyFilter = upcomingOnly ? x => !x.completed && isDateInFuture(x.time)
        : () => true;

    const teamNameFilter = x => {
        const teamOneName = x.isMen ? x.teamOne : `${x} (Women)`;
        const teamTwoName = x.isMen ? x.teamTwo : `${x} (Women)`;
        return teamOneName.toLowerCase().includes(teamName.toLowerCase())
        || teamTwoName.toLowerCase().includes(teamName.toLowerCase());
    };

    const getTime = time => moment(time, 'YYYY-MM-DD hh:mma').format('LLL');

    const isWomens = x => {
        if (!league) {
            return true;
        }
        if (league === 'All') {
            return true;
        }
        if (league.includes(' (Women)')) {
            return !x.isMen;
        }
        return x.isMen;
    };

    const filteredFixtures = fixtures
        .filter(leagueFilter)
        .filter(collingwoodOnlyFilter)
        .filter(upcomingOnlyFilter)
        .filter(teamNameFilter)
        .filter(isWomens)
        .map(fixture => ({
            ...fixture,
            teamOne: transformTeamName(fixture.teamOne, fixture.isMen),
            teamTwo: transformTeamName(fixture.teamTwo, fixture.isMen),
            id: `${fixture.teamOne} vs ${fixture.teamTwo}-${fixture.time}`
        }));

    return helpers.sortMatchesByDate(filteredFixtures, false).map(fixture => ({
        ...fixture,
        time: getTime(fixture.time)
    }));
};
