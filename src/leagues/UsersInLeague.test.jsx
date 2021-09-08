import { noop } from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { mount, shallow } from '../enzyme';
import UsersInLeague, { UsersInLeagueUnconnected } from './UsersInLeague';

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

describe('Users In League', () => {
    it('The Users In League component renders without crashing', () => {
        const wrapper = shallow(<UsersInLeagueUnconnected
            usersInLeague={[]}
            leaveLeagueRequest={noop}
            fetchUsersInLeagueRequest={noop}
        />);
        expect(() => wrapper).not.toThrow();
    });
});

describe('Notifications connected', () => {
    it('Connected Notifications', () => {
        const mockStore = configureMockStore([]);
        const mockStoreInitialized = mockStore({
            firebase: mockfirebaseStore,
            history: mockHistory,
            overview: {
                maxGameWeek: 0
            },
            leagues: {
                usersInLeague: {

                }
            }
        });

        const wrapper = mount(
            <Provider store={mockStoreInitialized}>
                <Router pathname="testing">
                    <UsersInLeague
                        history={mockHistory}
                        leaveLeagueRequest={noop}
                        fetchUsersInLeagueRequest={noop}
                        usersInLeague={[]}
                    />
                </Router>
            </Provider>
        );

        expect(() => wrapper).not.toThrow();
    });
});
