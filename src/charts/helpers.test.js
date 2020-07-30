import * as helpers from './helpers';
import * as testData from './testData';

const allTeams = [
    {
        id: 'teamOne',
        team_name: 'England',
        goalsFor: 11,
        losses: 0,
        draws: 0,
        results: [
            {
                goalsFor: 2,
                week: 1,
                goalsAgainst: 2
            },
            {
                goalsFor: 1,
                week: 2,
                goalsAgainst: 0
            },
            {
                goalsFor: 8,
                week: 3,
                goalsAgainst: 4
            },
            {
                goalsFor: 25,
                week: 4,
                goalsAgainst: 15
            },
            {
                goalsFor: 5,
                week: 5,
                goalsAgainst: 20
            }
        ]
    },
    {
        id: 'teamTwo',
        team_name: 'Brazil',
        goalsFor: 3,
        losses: 1,
        draws: 2,
        results: [
            {
                goalsFor: 3,
                week: 1,
                goalsAgainst: 5
            },
            {
                goalsFor: 1,
                week: 2,
                goalsAgainst: 1
            },
            {
                goalsFor: 4,
                week: 3,
                goalsAgainst: 4
            },
            {
                goalsFor: 3,
                week: 4,
                goalsAgainst: 2
            },
            {
                goalsFor: 5,
                week: 5,
                goalsAgainst: 5
            }
        ]
    },
    {
        id: 'ID NOT INCLUDED in charts',
        team_name: 'Not included in charts',
        goalsFor: 5,
        losses: 2,
        draws: 5,
        results: [
            {
                goalsFor: 7,
                week: 1,
                goalsAgainst: 9
            },
            {
                goalsFor: 3,
                week: 2,
                goalsAgainst: 4
            },
            {
                goalsFor: 5,
                week: 3,
                goalsAgainst: 40
            },
            {
                goalsFor: 5,
                week: 3,
                goalsAgainst: 40
            },
            {
                goalsFor: 5,
                week: 3,
                goalsAgainst: 40
            }
        ]
    }
];

const teamsToBeSortedByGoalDifference = [
    {
        id: '+5 Goal Difference',
        team_name: 'England',
        goalsFor: 11,
        losses: 0,
        draws: 0,
        results: [
            {
                goalsFor: 25,
                week: 1,
                goalsAgainst: 20
            }
        ]
    },
    {
        id: '+2 goal difference in one match',
        team_name: 'Brazil',
        goalsFor: 3,
        losses: 1,
        draws: 2,
        results: [
            {
                goalsFor: 4,
                week: 1,
                goalsAgainst: 2
            }
        ]
    },
    {
        id: '+2 goal difference 2 matches',
        team_name: 'Not included in charts',
        goalsFor: 12,
        losses: 1,
        draws: 0,
        results: [
            {
                goalsFor: 3,
                week: 1,
                goalsAgainst: 4
            },
            {
                goalsFor: 9,
                week: 1,
                goalsAgainst: 6
            }
        ]
    },
    {
        id: 'last place with 2 wins',
        team_name: '2 wins',
        goalsFor: 4,
        losses: 0,
        draws: 0,
        results: [
            {
                goalsFor: 1,
                week: 1,
                goalsAgainst: 0
            },
            {
                goalsFor: 1,
                week: 2,
                goalsAgainst: 0
            }
        ]
    }
];

const edgeCase = [
    {
        id: 'teamOne',
        team_name: 'England',
        goalsFor: 0,
        losses: 0,
        draws: 0,
        results: [
            {
                goalsFor: 3,
                week: 1,
                goalsAgainst: 0
            },
            {
                goalsFor: 0,
                week: 2,
                goalsAgainst: 1
            },
            {
                goalsFor: 0,
                week: 3,
                goalsAgainst: 2
            }
        ]
    },
    {
        id: 'teamTwo',
        team_name: 'Brazil',
        goalsFor: 3,
        losses: 1,
        draws: 2,
        results: [
            {
                goalsFor: 1,
                week: 1,
                goalsAgainst: 1
            },
            {
                goalsFor: 1,
                week: 2,
                goalsAgainst: 1
            },
            {
                goalsFor: 1,
                week: 3,
                goalsAgainst: 1
            }
        ]
    },
    {
        id: 'teamThree',
        team_name: 'France',
        goalsFor: 12,
        losses: 1,
        draws: 0,
        results: [
            {
                goalsFor: 1,
                week: 1,
                goalsAgainst: 1
            },
            {
                goalsFor: 1,
                week: 2,
                goalsAgainst: 1
            },
            {
                goalsFor: 1,
                week: 3,
                goalsAgainst: 1
            }
        ]
    }
];

const listOfFixtures = [
    {
        teamOne: 'Collingwood D',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '12/10/2019 10:45',
        completed: true,
        league: 'Premiership',
        isCup: false
    },
    {
        teamOne: 'Staff A',
        result: '1 - 8',
        teamTwo: 'Grey A',
        location: 'Rubber Crumb 3 (Track)',
        time: '12/10/2019 15:00',
        completed: true,
        league: 'Premiership',
        isCup: false
    },
    {
        teamOne: 'Josephine Butler A',
        result: '0 - 5',
        teamTwo: 'Collingwood A',
        location: 'Rubber Crumb 1 (Old)',
        time: '12/10/2019 16:45',
        completed: true,
        league: 'Premiership',
        isCup: false
    },
    {
        teamOne: 'Collingwood C',
        result: '6 - 1',
        teamTwo: 'St. Cuthbert\'s A',
        location: 'Rubber Crumb 3 (Track)',
        time: '12/10/2019 18:30',
        completed: true,
        league: 'Premiership',
        isCup: false
    },
    {
        teamOne: 'Van Mildert A',
        result: '2 - 2',
        teamTwo: 'Hatfield A',
        location: 'Rubber Crumb 3 (Track)',
        time: '13/10/2019 18:30',
        completed: true,
        league: 'Premiership',
        isCup: false
    },
    {
        teamOne: 'Collingwood A',
        result: '4 - 0',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 2',
        time: '19/10/2019 10:45',
        completed: true,
        league: 'Premiership',
        isCup: false
    },
    {
        teamOne: 'St. Cuthbert\'s A',
        result: '0 - 2',
        teamTwo: 'Collingwood D',
        location: 'Rubber Crumb 3 (Track)',
        time: '19/10/2019 18:30',
        completed: true,
        league: 'Premiership',
        isCup: false
    },
    {
        teamOne: 'Trevelyan A',
        result: '1 - 0',
        teamTwo: 'Stephenson Rangers A',
        location: 'Rubber Crumb 1 (Old)',
        time: '19/10/2019 18:30',
        completed: true,
        league: 'Premiership',
        isCup: false
    },
    {
        teamOne: 'Collingwood B',
        result: '2 - 0',
        teamTwo: 'Hatfield A',
        location: 'Rubber Crumb 2',
        time: '20/10/2019 09:00',
        completed: true,
        league: 'Premiership',
        isCup: false
    },
    {
        teamOne: 'Josephine Butler A',
        result: '2 - 2',
        teamTwo: 'Collingwood B',
        location: 'Rubber Crumb 1 (Old)',
        time: '26/10/2019 14:15',
        completed: true,
        league: 'Premiership',
        isCup: false
    },
    {
        teamOne: 'Trevelyan A',
        result: '0 - 0',
        teamTwo: 'Grey A',
        location: 'Rubber Crumb 3 (Track)',
        time: '26/10/2019 18:30',
        completed: true,
        league: 'Premiership',
        isCup: false
    },
    {
        teamOne: 'Collingwood A',
        result: '3 - 4',
        teamTwo: 'Van Mildert A',
        location: 'Rubber Crumb 2',
        time: '27/10/2019 09:00',
        completed: true,
        league: 'Premiership',
        isCup: false
    },
    {
        teamOne: 'Staff A',
        result: '3 - 6',
        teamTwo: 'Collingwood C',
        location: 'Rubber Crumb 2',
        time: '27/10/2019 18:30',
        completed: true,
        league: 'Premiership',
        isCup: false
    },
    {
        teamOne: 'Trevelyan A',
        result: '2 - 0',
        teamTwo: 'Collingwood D',
        location: 'Rubber Crumb 2',
        time: '03/11/2019 09:00',
        completed: true,
        league: 'Premiership',
        isCup: false
    },
    {
        teamOne: 'Staff A',
        result: '1 - 14',
        teamTwo: 'Collingwood A',
        location: 'Rubber Crumb 3 (Track)',
        time: '03/11/2019 18:30',
        completed: true,
        league: 'Premiership',
        isCup: false
    },
    {
        teamOne: 'Collingwood C',
        result: '3 - 1',
        teamTwo: 'Grey A',
        location: 'Rubber Crumb 2',
        time: '03/11/2019 18:30',
        completed: true,
        league: 'Premiership',
        isCup: false
    },
    {
        teamOne: 'St. Cuthbert\'s A',
        result: '2 - 3',
        teamTwo: 'Josephine Butler A',
        location: 'Rubber Crumb 3 (Track)',
        time: '03/11/2019 20:15',
        completed: true,
        league: 'Premiership',
        isCup: false
    },
    {
        teamOne: 'Trevelyan A',
        result: '2 - 3',
        teamTwo: 'Josephine Butler A',
        location: 'Rubber Crumb 2',
        time: '09/11/2019 20:15',
        completed: true,
        league: 'Premiership',
        isCup: false
    },
    {
        teamOne: 'Staff A',
        result: '3 - 5',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 2',
        time: '10/11/2019 16:45',
        completed: true,
        league: 'Premiership',
        isCup: false
    },
    {
        teamOne: 'St. Cuthbert\'s A',
        result: '0 - 3',
        teamTwo: 'Stephenson Rangers A',
        location: 'Rubber Crumb 3 (Track)',
        time: '10/11/2019 18:30',
        completed: true,
        league: 'Premiership',
        isCup: false
    }
];

const activeTeams = ['teamOne', 'teamTwo'];

describe('Generating graph data for charts', () => {
    it('Goals For extending to the correct week', () => {
        expect(helpers.findGraphData(allTeams, activeTeams, 'goalsFor', 5)).toEqual([
            ['x', 'England', 'Brazil'],
            [1, 2, 3],
            [2, 1, 1],
            [3, 8, 4],
            [4, 25, 3],
            [5, 5, 5]
        ]);
    });

    it('Generate unique teams from fixtures', () => {
        expect(helpers.generateUniqueTeams(listOfFixtures)).toEqual([
            {
                id: 'Collingwood A',
                value: 'Collingwood A',
                text: 'Collingwood A'
            },
            {
                id: 'Collingwood B',
                value: 'Collingwood B',
                text: 'Collingwood B'
            },
            {
                id: 'Collingwood C',
                value: 'Collingwood C',
                text: 'Collingwood C'
            },
            {
                id: 'Collingwood D',
                value: 'Collingwood D',
                text: 'Collingwood D'
            },
            {
                id: 'Grey A',
                value: 'Grey A',
                text: 'Grey A'
            },
            {
                id: 'Hatfield A',
                value: 'Hatfield A',
                text: 'Hatfield A'
            },
            {
                id: 'Josephine Butler A',
                value: 'Josephine Butler A',
                text: 'Josephine Butler A'
            },
            {
                id: 'St. Aidan\'s A',
                value: 'St. Aidan\'s A',
                text: 'St. Aidan\'s A'
            },
            {
                id: 'St. Cuthbert\'s A',
                value: 'St. Cuthbert\'s A',
                text: 'St. Cuthbert\'s A'
            },
            {
                id: 'Staff A',
                value: 'Staff A',
                text: 'Staff A'
            },
            {
                id: 'Stephenson Rangers A',
                value: 'Stephenson Rangers A',
                text: 'Stephenson Rangers A'
            },
            {
                id: 'Trevelyan A',
                value: 'Trevelyan A',
                text: 'Trevelyan A'
            },
            {
                id: 'Van Mildert A',
                value: 'Van Mildert A',
                text: 'Van Mildert A'
            }
        ]);
    });

    it('Combine data', () => {
        const days = [
            '2019-10-12T23:00:00.000Z',
            '2019-10-13T23:00:00.000Z',
            '2019-10-14T23:00:00.000Z',
            '2019-10-15T23:00:00.000Z',
            '2019-10-16T23:00:00.000Z',
            '2019-10-17T23:00:00.000Z',
            '2019-10-18T23:00:00.000Z',
            '2019-10-19T23:00:00.000Z',
            '2019-10-20T23:00:00.000Z',
            '2019-10-21T23:00:00.000Z',
            '2019-10-22T23:00:00.000Z',
            '2019-10-23T23:00:00.000Z',
            '2019-10-24T23:00:00.000Z',
            '2019-10-25T23:00:00.000Z',
            '2019-10-26T23:00:00.000Z',
            '2019-10-28T00:00:00.000Z',
            '2019-10-29T00:00:00.000Z',
            '2019-10-30T00:00:00.000Z',
            '2019-10-31T00:00:00.000Z',
            '2019-11-01T00:00:00.000Z',
            '2019-11-02T00:00:00.000Z',
            '2019-11-03T00:00:00.000Z',
            '2019-11-04T00:00:00.000Z',
            '2019-11-05T00:00:00.000Z',
            '2019-11-06T00:00:00.000Z',
            '2019-11-07T00:00:00.000Z',
            '2019-11-08T00:00:00.000Z',
            '2019-11-09T00:00:00.000Z',
            '2019-11-10T00:00:00.000Z',
            '2019-11-11T00:00:00.000Z'
        ];

        const cwoodTeams = ['Collingwood A'];
        const acc = {
            'Collingwood A': {
                '19-Oct': {
                    totalGoalsFor: 4,
                    totalGoalsAgainst: 0,
                    totalPoints: 3,
                    goalsScored: 0,
                    goalsConceded: 0
                },
                '20-Oct': {
                    totalGoalsFor: 4,
                    totalGoalsAgainst: 0,
                    totalPoints: 3,
                    goalsScored: 0,
                    goalsConceded: 0
                },
                '21-Oct': {
                    totalGoalsFor: 4,
                    totalGoalsAgainst: 0,
                    totalPoints: 3,
                    goalsScored: 0,
                    goalsConceded: 0
                },
                '22-Oct': {
                    totalGoalsFor: 4,
                    totalGoalsAgainst: 0,
                    totalPoints: 3,
                    goalsScored: 0,
                    goalsConceded: 0
                },
                '23-Oct': {
                    totalGoalsFor: 4,
                    totalGoalsAgainst: 0,
                    totalPoints: 3,
                    goalsScored: 0,
                    goalsConceded: 0
                },
                '24-Oct': {
                    totalGoalsFor: 4,
                    totalGoalsAgainst: 0,
                    totalPoints: 3,
                    goalsScored: 0,
                    goalsConceded: 0
                },
                '25-Oct': {
                    totalGoalsFor: 4,
                    totalGoalsAgainst: 0,
                    totalPoints: 3,
                    goalsScored: 0,
                    goalsConceded: 0
                },
                '26-Oct': {
                    totalGoalsFor: 4,
                    totalGoalsAgainst: 0,
                    totalPoints: 3,
                    goalsScored: 0,
                    goalsConceded: 0
                },
                '27-Oct': {
                    totalGoalsFor: 7,
                    totalGoalsAgainst: 4,
                    totalPoints: 3,
                    goalsScored: 0,
                    goalsConceded: 0
                },
                '28-Oct': {
                    totalGoalsFor: 7,
                    totalGoalsAgainst: 4,
                    totalPoints: 3,
                    goalsScored: 0,
                    goalsConceded: 0
                },
                '29-Oct': {
                    totalGoalsFor: 7,
                    totalGoalsAgainst: 4,
                    totalPoints: 3,
                    goalsScored: 0,
                    goalsConceded: 0
                },
                '30-Oct': {
                    totalGoalsFor: 7,
                    totalGoalsAgainst: 4,
                    totalPoints: 3,
                    goalsScored: 0,
                    goalsConceded: 0
                },
                '31-Oct': {
                    totalGoalsFor: 7,
                    totalGoalsAgainst: 4,
                    totalPoints: 3,
                    goalsScored: 0,
                    goalsConceded: 0
                },
                '01-Nov': {
                    totalGoalsFor: 7,
                    totalGoalsAgainst: 4,
                    totalPoints: 3,
                    goalsScored: 0,
                    goalsConceded: 0
                },
                '02-Nov': {
                    totalGoalsFor: 7,
                    totalGoalsAgainst: 4,
                    totalPoints: 3,
                    goalsScored: 0,
                    goalsConceded: 0
                },
                '03-Nov': {
                    totalGoalsFor: 21,
                    totalGoalsAgainst: 5,
                    totalPoints: 6,
                    goalsScored: 0,
                    goalsConceded: 0
                },
                '04-Nov': {
                    totalGoalsFor: 21,
                    totalGoalsAgainst: 5,
                    totalPoints: 6,
                    goalsScored: 0,
                    goalsConceded: 0
                },
                '05-Nov': {
                    totalGoalsFor: 21,
                    totalGoalsAgainst: 5,
                    totalPoints: 6,
                    goalsScored: 0,
                    goalsConceded: 0
                },
                '06-Nov': {
                    totalGoalsFor: 21,
                    totalGoalsAgainst: 5,
                    totalPoints: 6,
                    goalsScored: 0,
                    goalsConceded: 0
                },
                '07-Nov': {
                    totalGoalsFor: 21,
                    totalGoalsAgainst: 5,
                    totalPoints: 6,
                    goalsScored: 0,
                    goalsConceded: 0
                },
                '08-Nov': {
                    totalGoalsFor: 21,
                    totalGoalsAgainst: 5,
                    totalPoints: 6,
                    goalsScored: 0,
                    goalsConceded: 0
                },
                '09-Nov': {
                    totalGoalsFor: 21,
                    totalGoalsAgainst: 5,
                    totalPoints: 6,
                    goalsScored: 0,
                    goalsConceded: 0
                },
                '10-Nov': {
                    totalGoalsFor: 21,
                    totalGoalsAgainst: 5,
                    totalPoints: 6,
                    goalsScored: 0,
                    goalsConceded: 0
                },
                '11-Nov': {
                    totalGoalsFor: 21,
                    totalGoalsAgainst: 5,
                    totalPoints: 6,
                    goalsScored: 0,
                    goalsConceded: 0
                }
            }
        };

        const mode = helpers.graphModes.totalPoints;

        expect(JSON.stringify(helpers.combineData(cwoodTeams, days, acc, mode)))
            .toEqual(JSON.stringify([
                [
                    {
                        type: 'date',
                        label: 'Day'
                    },
                    'Collingwood A'
                ],
                [
                    '2019-10-12T23:00:00.000Z',
                    null
                ],
                [
                    '2019-10-19T23:00:00.000Z',
                    3
                ],
                [
                    '2019-10-26T23:00:00.000Z',
                    3
                ],
                [
                    '2019-11-03T00:00:00.000Z',
                    6
                ],
                [
                    '2019-11-10T00:00:00.000Z',
                    6
                ]
            ]));
    });

    it('Generate graph accumulation', () => {
        expect(helpers.makeGraphAccumulation(testData.accumlation,
            testData.fixtures,
            testData.allDays,
            testData.nonCwoodTeams))
            .toEqual(testData.result);
    });

    it('Generate new table', () => {
        expect(JSON.stringify(helpers.generateNewTable(listOfFixtures))).toEqual('[{"goalDifference":21,"wins":3,"draws":0,"losses":1,"gamesPlayed":4,"score":9,"team":"Collingwood A","id":"Collingwood A","position":{"type":"div","key":null,"ref":null,"props":{"style":{"fontWeight":"bold"},"children":1},"_owner":null,"_store":{}}},{"goalDifference":10,"wins":3,"draws":0,"losses":0,"gamesPlayed":3,"score":9,"team":"Collingwood C","id":"Collingwood C","position":{"type":"div","key":null,"ref":null,"props":{"style":{"fontWeight":"bold"},"children":2},"_owner":null,"_store":{}}},{"goalDifference":2,"wins":1,"draws":1,"losses":0,"gamesPlayed":2,"score":4,"team":"Collingwood B","id":"Collingwood B","position":{"type":"div","key":null,"ref":null,"props":{"style":{"fontWeight":"bold"},"children":3},"_owner":null,"_store":{}}},{"goalDifference":-1,"wins":1,"draws":0,"losses":2,"gamesPlayed":3,"score":3,"team":"Collingwood D","id":"Collingwood D","position":{"type":"div","key":null,"ref":null,"props":{"style":{"fontWeight":"bold"},"children":4},"_owner":null,"_store":{}}}]');
    });

    it('Goals For extending to the correct week going past the number of weeks their is data for', () => {
        expect(helpers.findGraphData(allTeams, activeTeams, 'goalsFor', 7)).toEqual([
            ['x', 'England', 'Brazil'],
            [1, 2, 3],
            [2, 1, 1],
            [3, 8, 4],
            [4, 25, 3],
            [5, 5, 5],
            [6, 0, 0],
            [7, 0, 0]
        ]);
    });

    it('Goals Against extending to the correct week, missing off the final weeks', () => {
        expect(helpers.findGraphData(allTeams, activeTeams, 'goalsAgainst', 3)).toEqual([
            ['x', 'England', 'Brazil'],
            [1, 2, 5],
            [2, 0, 1],
            [3, 4, 4]
        ]);
    });

    it('Total points extending to the correct week', () => {
        expect(helpers.findGraphData(allTeams, activeTeams, 'totalPoints', 5)).toEqual([
            ['x', 'England', 'Brazil'],
            [1, 1, 0],
            [2, 4, 1],
            [3, 7, 2],
            [4, 10, 5],
            [5, 10, 6]
        ]);
    });

    it('Total goals FOR extending to the correct week', () => {
        expect(helpers.findGraphData(allTeams, activeTeams, 'totalGoalsFor', 5)).toEqual([
            ['x', 'England', 'Brazil'],
            [1, 2, 3],
            [2, 3, 4],
            [3, 11, 8],
            [4, 36, 11],
            [5, 41, 16]
        ]);
    });

    it('Total goals FOR extending to the correct week extending beyond data', () => {
        expect(helpers.findGraphData(allTeams, activeTeams, 'totalGoalsFor', 7)).toEqual([
            ['x', 'England', 'Brazil'],
            [1, 2, 3],
            [2, 3, 4],
            [3, 11, 8],
            [4, 36, 11],
            [5, 41, 16],
            [6, 41, 16],
            [7, 41, 16]
        ]);
    });

    it('Total goals AGAINST extending to the correct week', () => {
        expect(helpers.findGraphData(allTeams, activeTeams, 'totalGoalsAgainst', 5)).toEqual([
            ['x', 'England', 'Brazil'],
            [1, 2, 5],
            [2, 2, 6],
            [3, 6, 10],
            [4, 21, 12],
            [5, 41, 17]
        ]);
    });
});

describe('League data generation', () => {
    it('Generates the league table', () => {
        expect(helpers.marks(5)).toEqual([
            {
                value: 1,
                label: '1'
            },
            {
                value: 2,
                label: '2'
            },
            {
                value: 3,
                label: '3'
            },
            {
                value: 4,
                label: '4'
            },
            {
                value: 5,
                label: '5'
            }
        ]);
    });
});

describe('Generates league data', () => {
    it('League array', () => {
        expect(helpers.generateLeagueTable(allTeams, 0, 5)).toEqual([
            {
                goalDifference: 0,
                wins: 3,
                draws: 1,
                losses: 1,
                points: helpers.makeBold(10),
                team: 'England',
                gamesPlayed: 5,
                score: 10,
                id: 'teamOne',
                position: helpers.makeBold(1)
            },
            {
                goalDifference: -1,
                wins: 1,
                draws: 3,
                losses: 1,
                points: helpers.makeBold(6),
                team: 'Brazil',
                gamesPlayed: 5,
                score: 6,
                id: 'teamTwo',
                position: helpers.makeBold(2)
            },
            {
                goalDifference: -108,
                wins: 0,
                draws: 0,
                losses: 5,
                points: helpers.makeBold(0),
                team: 'Not included in charts',
                gamesPlayed: 5,
                score: 0,
                id: 'ID NOT INCLUDED in charts',
                position: helpers.makeBold(3)
            }
        ]);
    });

    it('Filters on correct tiebreakers', () => {
        expect(helpers.generateLeagueTable(teamsToBeSortedByGoalDifference, 0, 3)).toEqual([
            {
                goalDifference: 2,
                wins: 2,
                draws: 0,
                losses: 0,
                points: helpers.makeBold(6),
                team: '2 wins',
                gamesPlayed: 2,
                score: 6,
                id: 'last place with 2 wins',
                position: helpers.makeBold(1)
            },
            {
                goalDifference: 5,
                wins: 1,
                draws: 0,
                losses: 0,
                points: helpers.makeBold(3),
                team: 'England',
                gamesPlayed: 1,
                score: 3,
                id: '+5 Goal Difference',
                position: helpers.makeBold(2)
            },
            {
                goalDifference: 2,
                wins: 1,
                draws: 0,
                losses: 0,
                points: helpers.makeBold(3),
                team: 'Brazil',
                gamesPlayed: 1,
                score: 3,
                id: '+2 goal difference in one match',
                position: helpers.makeBold(3)
            },
            {
                goalDifference: 2,
                wins: 1,
                draws: 0,
                losses: 1,
                points: helpers.makeBold(3),
                team: 'Not included in charts',
                gamesPlayed: 2,
                score: 3,
                id: '+2 goal difference 2 matches',
                position: helpers.makeBold(4)
            }
        ]);
    });

    it('Filters on correct tiebreakers edgecases', () => {
        expect(helpers.generateLeagueTable(edgeCase, 0, 3)).toEqual([
            {
                goalDifference: 0,
                wins: 1,
                draws: 0,
                losses: 2,
                points: helpers.makeBold(3),
                team: 'England',
                gamesPlayed: 3,
                score: 3,
                id: 'teamOne',
                position: helpers.makeBold(1)
            },
            {
                goalDifference: 0,
                wins: 0,
                draws: 3,
                losses: 0,
                points: helpers.makeBold(3),
                team: 'France',
                gamesPlayed: 3,
                score: 3,
                id: 'teamThree',
                position: helpers.makeBold(2)
            },
            {
                goalDifference: 0,
                wins: 0,
                draws: 3,
                losses: 0,
                points: helpers.makeBold(3),
                team: 'Brazil',
                gamesPlayed: 3,
                score: 3,
                id: 'teamTwo',
                position: helpers.makeBold(3)
            }
        ]);
    });
});
