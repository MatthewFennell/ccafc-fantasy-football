import * as helpers from './helpers';

const fixturesWithDuplicates = [
    {
        teamOne: 'Collingwood A',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '2023-10-22 07:45PM',
        completed: true,
        league: 'Premiership',
        isCup: false,
        isMen: true
    },
    {
        teamOne: 'Collingwood A',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '2023-10-22 07:45PM',
        completed: true,
        league: 'Premiership',
        isCup: false,
        isMen: true
    },
    {
        teamOne: 'Collingwood D',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '2023-10-22 07:45PM',
        completed: true,
        league: 'Premiership',
        isCup: false,
        isMen: true
    }
];

const fixturesWithUnsorted = [
    {
        teamOne: 'Collingwood Z',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '2023-10-22 07:45PM',
        completed: true,
        league: 'Premiership',
        isCup: false,
        isMen: true
    },
    {
        teamOne: 'Collingwood F',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '2023-10-22 07:45PM',
        completed: true,
        league: 'Premiership',
        isCup: false,
        isMen: true
    },
    {
        teamOne: 'Collingwood K',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '2023-10-22 07:45PM',
        completed: true,
        league: 'Premiership',
        isCup: false,
        isMen: true
    }
];

const fixturesWithMultipleLeagues = [
    {
        teamOne: 'Collingwood A',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '2023-10-22 07:45PM',
        completed: true,
        league: 'Premiership',
        isCup: false,
        isMen: true
    },
    {
        teamOne: 'Collingwood B',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '2023-10-22 07:45PM',
        completed: true,
        league: 'League One',
        isCup: false,
        isMen: true
    },
    {
        teamOne: 'Collingwood B',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '2023-10-22 07:45PM',
        completed: true,
        league: 'League Two',
        isCup: false,
        isMen: true
    }
];

const fixturesWithDuplicateLeagues = [
    {
        teamOne: 'Collingwood A',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '2023-10-22 07:45PM',
        completed: true,
        league: 'Premiership',
        isCup: false,
        isMen: true
    },
    {
        teamOne: 'Collingwood B',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '2023-10-22 07:45PM',
        completed: true,
        league: 'Premiership',
        isCup: false,
        isMen: true
    },
    {
        teamOne: 'Collingwood B',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '2023-10-22 07:45PM',
        completed: true,
        league: 'League Two',
        isCup: false,
        isMen: true
    }
];

const fixturesWithUncompletedMatches = [
    {
        teamOne: 'Collingwood A',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '1000-10-22 07:45PM',
        completed: false,
        league: 'Premiership',
        isCup: false,
        isMen: true
    },
    {
        teamOne: 'Collingwood B',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '1000-10-22 07:45PM',
        completed: false,
        league: 'Premiership',
        isCup: false,
        isMen: true
    },
    {
        teamOne: 'Collingwood B',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '1000-10-22 07:45PM',
        completed: true,
        league: 'League Two',
        isCup: false,
        isMen: true
    }
];

const fixturesWithNonCollingwoodMatches = [
    {
        teamOne: 'Collingwood A',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '2023-10-22 07:45PM',
        completed: false,
        league: 'Premiership',
        isCup: false,
        isMen: true
    },
    {
        teamOne: 'Trevs',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '2023-10-22 07:45PM',
        completed: false,
        league: 'Premiership',
        isCup: false,
        isMen: true
    },
    {
        teamOne: 'Mildert',
        result: '1 - 2',
        teamTwo: 'Collingwood A',
        location: 'Rubber Crumb 1 (Old)',
        time: '2023-10-22 07:45PM',
        completed: true,
        league: 'League Two',
        isCup: false,
        isMen: true
    }
];

const fixturesWithSearchString = [
    {
        teamOne: 'pre abcdef after',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '2023-10-22 07:45PM',
        completed: false,
        league: 'Premiership',
        isCup: false,
        isMen: true
    },
    {
        teamOne: 'Collingwood B',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '2023-10-22 07:45PM',
        completed: false,
        league: 'Premiership',
        isCup: false,
        isMen: true
    },
    {
        teamOne: 'Collingwood B',
        result: '1 - 2',
        teamTwo: 'abcdef and stuff',
        location: 'Rubber Crumb 1 (Old)',
        time: '2023-10-22 07:45PM',
        completed: true,
        league: 'League Two',
        isCup: false,
        isMen: true
    }
];

const myTeam = 'Collingwood A';

describe('Generates Collingwood teams from all fixtures correctly', () => {
    beforeEach(() => {
        process.env.REACT_APP_COLLEGE_NAME = 'Collingwood';
        process.env.REACT_APP_COLLEGE_ACRONYM = 'CCAFC';
    });

    afterEach(() => {
        delete process.env.REACT_APP_COLLEGE_NAME;
        delete process.env.REACT_APP_COLLEGE_ACRONYM;
    });
    it('returns empty array', () => {
        expect(helpers.generateCollingwoodTeams([])).toEqual([]);
    });

    it('Removes duplicates', () => {
        expect(helpers.generateCollingwoodTeams(fixturesWithDuplicates)).toEqual([{
            id: 'Collingwood A',
            value: 'Collingwood A',
            text: 'Collingwood A'
        },
        {
            id: 'Collingwood D',
            value: 'Collingwood D',
            text: 'Collingwood D'
        }]);
    });

    it('Sorts teams by alphabet', () => {
        expect(helpers.generateCollingwoodTeams(fixturesWithUnsorted)).toEqual([{
            id: 'Collingwood F',
            value: 'Collingwood F',
            text: 'Collingwood F'
        }, {
            id: 'Collingwood K',
            value: 'Collingwood K',
            text: 'Collingwood K'
        },
        {
            id: 'Collingwood Z',
            value: 'Collingwood Z',
            text: 'Collingwood Z'
        }]);
    });
});

// ------------------------------------------------------------------------- //

describe('Generates Radio Options for filtering fixtures', () => {
    it('Includes All Leagues and my team whe non null', () => {
        expect(helpers.fixturesFilters(myTeam, fixturesWithMultipleLeagues)).toEqual([
            {
                text: 'My Team',
                id: myTeam,
                value: myTeam
            },
            {
                text: 'All Leagues',
                id: 'All',
                value: 'All'
            },
            {
                text: 'Premiership',
                id: 'Premiership',
                value: 'Premiership'
            },
            {
                text: 'League One',
                id: 'League One',
                value: 'League One'
            },
            {
                text: 'League Two',
                id: 'League Two',
                value: 'League Two'
            }
        ]);
    });

    it('Does not show leagues multiple times', () => {
        expect(helpers.fixturesFilters(myTeam, fixturesWithDuplicateLeagues)).toEqual([
            {
                text: 'My Team',
                id: myTeam,
                value: myTeam
            },
            {
                text: 'All Leagues',
                id: 'All',
                value: 'All'
            },
            {
                text: 'Premiership',
                id: 'Premiership',
                value: 'Premiership'
            },
            {
                text: 'League Two',
                id: 'League Two',
                value: 'League Two'
            }
        ]);
    });

    it('Does not include my team when value is "No team set"', () => {
        expect(helpers.fixturesFilters('No team set', fixturesWithMultipleLeagues)).toEqual([
            {
                text: 'All Leagues',
                id: 'All',
                value: 'All'
            },
            {
                text: 'Premiership',
                id: 'Premiership',
                value: 'Premiership'
            },
            {
                text: 'League One',
                id: 'League One',
                value: 'League One'
            },
            {
                text: 'League Two',
                id: 'League Two',
                value: 'League Two'
            }
        ]);
    });

    it('Does not include my team when value is empty', () => {
        expect(helpers.fixturesFilters('', fixturesWithMultipleLeagues)).toEqual([
            {
                text: 'All Leagues',
                id: 'All',
                value: 'All'
            },
            {
                text: 'Premiership',
                id: 'Premiership',
                value: 'Premiership'
            },
            {
                text: 'League One',
                id: 'League One',
                value: 'League One'
            },
            {
                text: 'League Two',
                id: 'League Two',
                value: 'League Two'
            }
        ]);
    });
});

// ------------------------------------------------------------------------- //

describe('Filtering fixtures', () => {
    beforeEach(() => {
        process.env.REACT_APP_COLLEGE_NAME = 'Collingwood';
        process.env.REACT_APP_COLLEGE_ACRONYM = 'CCAFC';
    });

    afterEach(() => {
        delete process.env.REACT_APP_COLLEGE_NAME;
        delete process.env.REACT_APP_COLLEGE_ACRONYM;
    });
    it('Does not remove any fixtures when league filter is all', () => {
        expect(helpers.filterFixtures(fixturesWithUncompletedMatches, 'All', false, false, ''))
            .toEqual([
                {
                    teamOne: 'Collingwood A',
                    result: '1 - 2',
                    teamTwo: 'St. Aidan\'s A',
                    location: 'Rubber Crumb 1 (Old)',
                    time: 'October 22, 1000 7:45 PM',
                    completed: false,
                    league: 'Premiership',
                    isCup: false,
                    isMen: true,
                    id: 'Collingwood A vs St. Aidan\'s A-1000-10-22 07:45PM'
                },
                {
                    teamOne: 'Collingwood B',
                    result: '1 - 2',
                    teamTwo: 'St. Aidan\'s A',
                    location: 'Rubber Crumb 1 (Old)',
                    time: 'October 22, 1000 7:45 PM',
                    completed: false,
                    league: 'Premiership',
                    isCup: false,
                    isMen: true,
                    id: 'Collingwood B vs St. Aidan\'s A-1000-10-22 07:45PM'
                },
                {
                    teamOne: 'Collingwood B',
                    result: '1 - 2',
                    teamTwo: 'St. Aidan\'s A',
                    location: 'Rubber Crumb 1 (Old)',
                    time: 'October 22, 1000 7:45 PM',
                    completed: true,
                    league: 'League Two',
                    isCup: false,
                    isMen: true,
                    id: 'Collingwood B vs St. Aidan\'s A-1000-10-22 07:45PM'
                }
            ]);
    });

    it('Selecting a league only returns fixtures in that league', () => {
        expect(helpers.filterFixtures(fixturesWithUncompletedMatches, 'League Two', false, false, ''))
            .toEqual([
                {
                    teamOne: 'Collingwood B',
                    result: '1 - 2',
                    teamTwo: 'St. Aidan\'s A',
                    location: 'Rubber Crumb 1 (Old)',
                    time: 'October 22, 1000 7:45 PM',
                    completed: true,
                    league: 'League Two',
                    isCup: false,
                    isMen: true,
                    id: 'Collingwood B vs St. Aidan\'s A-1000-10-22 07:45PM'
                }
            ]);
    });

    it('Collingwood only removes non collingwood matches', () => {
        expect(helpers.filterFixtures(fixturesWithNonCollingwoodMatches, 'All', true, false, ''))
            .toEqual([
                {
                    teamOne: 'Collingwood A',
                    result: '1 - 2',
                    teamTwo: 'St. Aidan\'s A',
                    location: 'Rubber Crumb 1 (Old)',
                    time: 'October 22, 2023 7:45 PM',
                    completed: false,
                    league: 'Premiership',
                    isCup: false,
                    isMen: true,
                    id: 'Collingwood A vs St. Aidan\'s A-2023-10-22 07:45PM'
                },
                {
                    teamOne: 'Mildert',
                    result: '1 - 2',
                    teamTwo: 'Collingwood A',
                    location: 'Rubber Crumb 1 (Old)',
                    time: 'October 22, 2023 7:45 PM',
                    completed: true,
                    league: 'League Two',
                    isCup: false,
                    isMen: true,
                    id: 'Mildert vs Collingwood A-2023-10-22 07:45PM'
                }
            ]);
    });

    it('Filtering by upcoming only removes completed matches in the past', () => {
        expect(helpers.filterFixtures(fixturesWithUncompletedMatches, 'All', false, true, ''))
            .toEqual([]);
    });

    it('Filtering by a search string includes both teamOne and teamTwo matches', () => {
        expect(helpers.filterFixtures(fixturesWithSearchString, 'All', false, false, 'abcdef'))
            .toEqual([
                {
                    teamOne: 'pre abcdef after',
                    result: '1 - 2',
                    teamTwo: 'St. Aidan\'s A',
                    location: 'Rubber Crumb 1 (Old)',
                    time: 'October 22, 2023 7:45 PM',
                    completed: false,
                    league: 'Premiership',
                    isCup: false,
                    isMen: true,
                    id: 'pre abcdef after vs St. Aidan\'s A-2023-10-22 07:45PM'
                },
                {
                    teamOne: 'Collingwood B',
                    result: '1 - 2',
                    teamTwo: 'abcdef and stuff',
                    location: 'Rubber Crumb 1 (Old)',
                    time: 'October 22, 2023 7:45 PM',
                    completed: true,
                    league: 'League Two',
                    isCup: false,
                    isMen: true,
                    id: 'Collingwood B vs abcdef and stuff-2023-10-22 07:45PM'
                }
            ]);
    });
});
