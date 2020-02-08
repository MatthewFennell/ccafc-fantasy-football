
import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { noop } from 'lodash';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import EditPlayer, { EditPlayerUnconnected } from './EditPlayer';
import { initState } from '../reducer';
import { initialState as overviewInitState } from '../../overview/reducer';

configure({ adapter: new Adapter() });

describe('Edit Player', () => {
    it('The Edit Player component renders without crashing', () => {
        const wrapper = shallow(<EditPlayerUnconnected
            editingStats={false}
            closeSuccessMessage={noop}
            closeAdminError={noop}
            editPlayerStatsRequest={noop}
            fetchPlayerStatsRequest={noop}
            fetchPlayersForTeamRequest={noop}
            fetchTeamsRequest={noop}
            allTeams={[]}
            fetchingPlayerStats={false}
            maxGameWeek={0}
            playerStats={{}}
            teamsWithPlayers={{}}
            history={{ push: noop }}
        />);
        expect(() => wrapper).not.toThrow();
    });

    it('Loading Edit Player sends a fetch teams request', () => {
        const mockFn = jest.fn(noop);
        mount(<EditPlayerUnconnected
            editingStats={false}
            closeSuccessMessage={noop}
            closeAdminError={noop}
            editPlayerStatsRequest={noop}
            fetchPlayerStatsRequest={noop}
            fetchPlayersForTeamRequest={noop}
            fetchTeamsRequest={mockFn}
            allTeams={[]}
            fetchingPlayerStats={false}
            maxGameWeek={0}
            playerStats={{}}
            teamsWithPlayers={{}}
            history={{ push: noop }}
        />);
        expect(mockFn.mock.calls.length).toBe(1);
    });
});

describe('Edit Player connected', () => {
    const mockStore = configureMockStore([]);
    const mockStoreInitialized = mockStore({
        admin: initState,
        overview: overviewInitState
    });

    const wrapper = mount( // enzyme
        <Provider store={mockStoreInitialized}>
            <Router>
                <EditPlayer />
            </Router>

        </Provider>
    );

    expect(() => wrapper).not.toThrow();
});
