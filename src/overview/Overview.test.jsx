import { noop } from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { mount, shallow } from '../enzyme';
import Overview, { OverviewUnconnected } from './Overview';
import { initialState } from './reducer';

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

describe('Overview', () => {
    it('The Overview component renders without crashing', () => {
        const wrapper = shallow(<OverviewUnconnected
            fetchUserStatsRequest={noop}
            fetchUserInfoForWeekRequestBackground={noop}
            fetchUserInfoForWeekRequest={noop}
            history={mockHistory}
        />);
        expect(() => wrapper).not.toThrow();
    });
});

describe('Overview connected', () => {
    window.matchMedia = window.matchMedia || function () {
        return {
            matches: false,
            addListener() {},
            removeListener() {}
        };
    };

    it('Connected overview', () => {
        const mockStore = configureMockStore([]);
        const mockStoreInitialized = mockStore({
            firebase: mockfirebaseStore,
            overview: initialState,
            history: mockHistory
        });

        const wrapper = mount(
            <Provider store={mockStoreInitialized}>
                <Router>
                    <Overview history={mockHistory} />
                </Router>
            </Provider>
        );

        expect(() => wrapper).not.toThrow();
    });
});
