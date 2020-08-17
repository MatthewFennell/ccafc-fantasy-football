import React from 'react';
import { noop } from 'lodash';
import { Provider } from 'react-redux';
import TableRow from '@material-ui/core/TableRow';
import configureMockStore from 'redux-mock-store';
import { shallow, mount } from '../enzyme';
import Charts, { ChartsUnconnected } from './Charts';
import { initialState } from './reducer';
import Graph from './graph/Graph';
import { initialState as overviewinitialState } from '../overview/reducer';
import { initialState as fixturesInitialState } from '../fixtures/reducer';
import { fixtures } from '../test/fixtures';

describe('Charts', () => {
    it('The Charts component renders without crashing', () => {
        const wrapper = shallow(<ChartsUnconnected
            fetchAllTeamsRequest={noop}
            fetchFixturesRequest={noop}
        />);
        expect(() => wrapper).not.toThrow();
    });

    it('The Charts component renders with all teams', () => {
        const allTeams = [
            {
                id: '07oKfYtwcHmTg8XjLLEq',
                draws: 0,
                losses: 1,
                team_name: 'Noxus',
                wins: 4,
                goalsFor: 17,
                results: [
                    {
                        goalsAgainst: 0,
                        goalsFor: 4,
                        week: 2
                    },
                    {
                        goalsAgainst: 0,
                        goalsFor: 4,
                        week: 3
                    },
                    {
                        goalsFor: 4,
                        week: 4,
                        goalsAgainst: 0
                    },
                    {
                        goalsFor: 4,
                        goalsAgainst: 0,
                        week: 5
                    },
                    {
                        goalsAgainst: 4,
                        goalsFor: 1,
                        week: 6
                    }
                ],
                goalsAgainst: 4
            },
            {
                id: '1bf4UkE66Sq0MEKsXaiB',
                goalsFor: 16,
                wins: 4,
                results: [
                    {
                        goalsFor: 4,
                        week: 2,
                        goalsAgainst: 0
                    },
                    {
                        goalsAgainst: 0,
                        week: 3,
                        goalsFor: 4
                    },
                    {
                        goalsAgainst: 0,
                        week: 4,
                        goalsFor: 4
                    },
                    {
                        week: 5,
                        goalsFor: 4,
                        goalsAgainst: 0
                    }
                ],
                goalsAgainst: 0,
                draws: 0,
                losses: 0,
                team_name: 'Ionia'
            },
            {
                id: '6XcwjTitiSEHsCqxoRTd',
                goalsFor: 24,
                losses: 0,
                draws: 0,
                results: [
                    {
                        goalsFor: 6,
                        goalsAgainst: 0,
                        week: 2
                    },
                    {
                        goalsAgainst: 0,
                        week: 3,
                        goalsFor: 6
                    },
                    {
                        goalsFor: 6,
                        week: 4,
                        goalsAgainst: 0
                    },
                    {
                        week: 5,
                        goalsFor: 6,
                        goalsAgainst: 0
                    }
                ],
                wins: 4,
                team_name: 'Runeterra',
                goalsAgainst: 0
            },
            {
                id: 'D0zo3miqDEkSXfF4dAFH',
                results: [
                    {
                        goalsAgainst: 0,
                        week: 2,
                        goalsFor: 5
                    },
                    {
                        week: 3,
                        goalsFor: 5,
                        goalsAgainst: 0
                    },
                    {
                        week: 4,
                        goalsFor: 5,
                        goalsAgainst: 0
                    },
                    {
                        goalsAgainst: 0,
                        week: 5,
                        goalsFor: 5
                    }
                ],
                goalsFor: 20,
                losses: 0,
                team_name: 'Piltover',
                wins: 4,
                draws: 0,
                goalsAgainst: 0
            },
            {
                id: 'GHdGMfqaH77WrsuqCjx6',
                goalsAgainst: 0,
                results: [
                    {
                        goalsAgainst: 0,
                        week: 2,
                        goalsFor: 3
                    },
                    {
                        goalsAgainst: 0,
                        week: 3,
                        goalsFor: 3
                    },
                    {
                        goalsAgainst: 0,
                        week: 4,
                        goalsFor: 3
                    },
                    {
                        week: 5,
                        goalsAgainst: 0,
                        goalsFor: 3
                    }
                ],
                losses: 0,
                goalsFor: 12,
                wins: 4,
                team_name: 'The Void',
                draws: 0
            },
            {
                id: 'WuqskOjmdZnEwYAu59Od',
                draws: 0,
                goalsAgainst: 0,
                team_name: 'Zaun',
                goalsFor: 20,
                results: [
                    {
                        week: 2,
                        goalsAgainst: 0,
                        goalsFor: 5
                    },
                    {
                        goalsAgainst: 0,
                        week: 3,
                        goalsFor: 5
                    },
                    {
                        week: 4,
                        goalsAgainst: 0,
                        goalsFor: 5
                    },
                    {
                        goalsAgainst: 0,
                        week: 5,
                        goalsFor: 5
                    }
                ],
                losses: 0,
                wins: 4
            },
            {
                id: 'ivLitSoKl5kk2idksLOM',
                goalsFor: 13,
                wins: 4,
                team_name: 'Targon',
                goalsAgainst: 5,
                results: [
                    {
                        week: 2,
                        goalsAgainst: 0,
                        goalsFor: 3
                    },
                    {
                        goalsFor: 3,
                        week: 3,
                        goalsAgainst: 0
                    },
                    {
                        goalsAgainst: 0,
                        goalsFor: 3,
                        week: 4
                    },
                    {
                        week: 5,
                        goalsAgainst: 0,
                        goalsFor: 3
                    },
                    {
                        week: 6,
                        goalsAgainst: 5,
                        goalsFor: 1
                    }
                ],
                losses: 1,
                draws: 0
            },
            {
                id: 'jqcfNJpQL2Ls2OQPOIo5',
                team_name: 'Shadow Isles',
                results: [
                    {
                        goalsAgainst: 0,
                        goalsFor: 4,
                        week: 2
                    },
                    {
                        goalsAgainst: 0,
                        week: 3,
                        goalsFor: 4
                    },
                    {
                        goalsAgainst: 0,
                        goalsFor: 4,
                        week: 4
                    },
                    {
                        goalsAgainst: 0,
                        goalsFor: 4,
                        week: 5
                    }
                ],
                goalsFor: 16,
                draws: 0,
                losses: 0,
                goalsAgainst: 0,
                wins: 4
            },
            {
                id: 'lYiEeZZPmkRFOV9tecxu',
                draws: 0,
                wins: 4,
                losses: 0,
                team_name: 'Freljord',
                goalsAgainst: 0,
                goalsFor: 24,
                results: [
                    {
                        goalsAgainst: 0,
                        goalsFor: 6,
                        week: 2
                    },
                    {
                        goalsFor: 6,
                        week: 3,
                        goalsAgainst: 0
                    },
                    {
                        goalsAgainst: 0,
                        goalsFor: 6,
                        week: 4
                    },
                    {
                        week: 5,
                        goalsFor: 6,
                        goalsAgainst: 0
                    }
                ]
            },
            {
                id: 'ozFejpm7IZLqZcaO1aVP',
                goalsFor: 20,
                wins: 4,
                losses: 0,
                goalsAgainst: 0,
                results: [
                    {
                        goalsAgainst: 0,
                        goalsFor: 5,
                        week: 2
                    },
                    {
                        goalsAgainst: 0,
                        goalsFor: 5,
                        week: 3
                    },
                    {
                        week: 4,
                        goalsFor: 5,
                        goalsAgainst: 0
                    },
                    {
                        week: 5,
                        goalsFor: 5,
                        goalsAgainst: 0
                    }
                ],
                team_name: 'Shurima',
                draws: 0
            },
            {
                id: 't7DBFUXVDTQ7zJ6j0itw',
                draws: 0,
                goalsAgainst: 0,
                goalsFor: 28,
                team_name: 'Demacia',
                wins: 4,
                results: [
                    {
                        goalsAgainst: 0,
                        week: 2,
                        goalsFor: 7
                    },
                    {
                        goalsAgainst: 0,
                        week: 3,
                        goalsFor: 7
                    },
                    {
                        goalsAgainst: 0,
                        week: 4,
                        goalsFor: 7
                    },
                    {
                        goalsAgainst: 0,
                        week: 5,
                        goalsFor: 7
                    }
                ],
                losses: 0
            },
            {
                id: 'wIsXDuE26m7adO3QkIes',
                draws: 0,
                team_name: 'Bilgewater',
                results: [
                    {
                        week: 2,
                        goalsFor: 4,
                        goalsAgainst: 0
                    },
                    {
                        week: 3,
                        goalsFor: 4,
                        goalsAgainst: 0
                    },
                    {
                        goalsFor: 4,
                        goalsAgainst: 0,
                        week: 4
                    },
                    {
                        goalsFor: 4,
                        goalsAgainst: 0,
                        week: 5
                    }
                ],
                losses: 0,
                wins: 4,
                goalsAgainst: 0,
                goalsFor: 16
            },
            {
                id: 'wV23cAgrwqct6gf6LZCL',
                draws: 0,
                team_name: 'Ixtal',
                goalsAgainst: 0,
                goalsFor: 16,
                results: [
                    {
                        goalsFor: 4,
                        week: 2,
                        goalsAgainst: 0
                    },
                    {
                        goalsAgainst: 0,
                        week: 3,
                        goalsFor: 4
                    },
                    {
                        week: 4,
                        goalsAgainst: 0,
                        goalsFor: 4
                    },
                    {
                        week: 5,
                        goalsAgainst: 0,
                        goalsFor: 4
                    }
                ],
                losses: 0,
                wins: 4
            },
            {
                id: 'z6AOt0l43oUdo4BmM1kV',
                wins: 0,
                goalsAgainst: 40,
                draws: 0,
                results: [
                    {
                        goalsFor: 4,
                        goalsAgainst: 10,
                        week: 2
                    },
                    {
                        week: 3,
                        goalsAgainst: 10,
                        goalsFor: 4
                    },
                    {
                        goalsFor: 4,
                        week: 4,
                        goalsAgainst: 10
                    },
                    {
                        goalsFor: 4,
                        week: 5,
                        goalsAgainst: 10
                    }
                ],
                team_name: 'Bandle City',
                losses: 4,
                goalsFor: 16
            }
        ];

        const wrapper = mount(<ChartsUnconnected
            allTeams={allTeams}
            loadingFixtures={false}
            fixtures={fixtures}
            fetchAllTeamsRequest={noop}
            fetchFixturesRequest={noop}
        />);
        expect(wrapper.find(Graph)).toHaveLength(1);
        expect(wrapper.find(TableRow)).toHaveLength(5);
    });
});

describe('Charts connected', () => {
    it('Connected charts', () => {
        const mockStore = configureMockStore([]);
        const mockStoreInitialized = mockStore({
            charts: initialState,
            overview: overviewinitialState,
            fixtures: fixturesInitialState
        });

        const wrapper = mount(
            <Provider store={mockStoreInitialized}>
                <Charts fetchFixturesRequest={noop} />
            </Provider>
        );

        expect(() => wrapper).not.toThrow();
    });
});
