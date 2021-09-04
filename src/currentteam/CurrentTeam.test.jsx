import { noop } from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { mount, shallow } from '../enzyme';
import CurrentTeam, { CurrentTeamUnconnected } from './CurrentTeam';
import { initialState } from './reducer';

const mockHistory = {
    location: {
        pathname: 'pathname'
    },
    push: noop
};

const mockMatch = {
    params: {
        userId: 'userId'
    }
};

const mockFixtures = {
    fixtures: []
};

describe('CurrentTeam', () => {
    it('The CurrentTeam component renders without crashing', () => {
        const wrapper = shallow(<CurrentTeamUnconnected
            makeCaptainRequest={noop}
            fetchActiveTeamRequest={noop}
            history={mockHistory}
            userId=""
            fetchFixturesRequest={noop}
            isPlayerModalOpen={false}
            setPlayerModalOpen={noop}
            setCaptainToUpdate={noop}
        />);
        expect(() => wrapper).not.toThrow();
    });
});

describe('CurrentTeam connected', () => {
    it('Connected current team', () => {
        window.matchMedia = () => ({
            addListener: () => {},
            removeListener: () => {}
        });

        const mockStore = configureMockStore([]);
        const mockStoreInitialized = mockStore({
            currentTeam: initialState,
            fixtures: mockFixtures,
            history: mockHistory,
            match: mockMatch
        });

        const wrapper = mount(
            <Provider store={mockStoreInitialized}>
                <Router>
                    <CurrentTeam />
                </Router>
            </Provider>
        );

        expect(() => wrapper).not.toThrow();
    });
});
