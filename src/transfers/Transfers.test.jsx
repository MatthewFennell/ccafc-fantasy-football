import { noop } from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { mount, shallow } from '../enzyme';
import { initialState as fixturesinitialState } from '../fixtures/reducer';
import { initialState } from './reducer';
import Transfers, { TransfersUnconnected } from './Transfers';

const mockHistory = {
    location: {
        pathname: 'pathname'
    },
    push: noop
};

const mockfirebaseStore = {
    auth: {
        email: 'email',
        uid: 'uid'
    }
};

describe('Transfers', () => {
    it('The Transfers component renders without crashing', () => {
        const wrapper = shallow(<TransfersUnconnected
            replacePlayerRequest={noop}
            fetchAllPlayersRequest={noop}
            addPlayerToCurrentTeamRequest={noop}
            closeSuccessMessage={noop}
            closeTransfersError={noop}
            fetchActiveTeamRequest={noop}
            fetchAllTeamsRequest={noop}
            fetchUserStatsRequest={noop}
            fetchFixturesRequest={noop}
            removePlayerFromCurrentTeam={noop}
            restorePlayerRequest={noop}
            undoTransferChanges={noop}
            updateTeamRequest={noop}
            history={mockHistory}
        />);
        expect(() => wrapper).not.toThrow();
    });
});

describe('Transfers connected', () => {
    beforeAll(() => {
        window.matchMedia = () => ({
            addListener: () => {},
            removeListener: () => {}
        });
    });
    it('Connected transfers', () => {
        const mockStore = configureMockStore([]);
        const mockStoreInitialized = mockStore({
            firebase: mockfirebaseStore,
            fixtures: fixturesinitialState,
            history: mockHistory,
            transfers: initialState
        });

        const wrapper = mount(
            <Provider store={mockStoreInitialized}>
                <Router>
                    <Transfers history={mockHistory} />
                </Router>
            </Provider>
        );

        expect(() => wrapper).not.toThrow();
    });
});
