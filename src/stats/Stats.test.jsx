
import React from 'react';
import { noop } from 'lodash';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow, mount } from '../enzyme';
import Stats, { StatsUnconnected } from './Stats';
import { initState } from './reducer';
import { initState as adminInitState } from '../admin/reducer';
import { initialState as overviewInitState } from '../overview/reducer';

const mockHistory = {
    location: {
        pathname: 'pathname'
    },
    push: noop
};

describe('Stats', () => {
    it('The Stats component renders without crashing', () => {
        const wrapper = shallow(<StatsUnconnected
            fetchTeamsRequest={noop}
            fetchTeamStatsByWeekRequest={noop}
            history={mockHistory}
        />);
        expect(() => wrapper).not.toThrow();
    });
});

describe('Stats connected', () => {
    it('Connected stats', () => {
        const mockStore = configureMockStore([]);
        const mockStoreInitialized = mockStore({
            admin: adminInitState,
            overview: overviewInitState,
            stats: initState,
            history: mockHistory
        });

        const wrapper = mount( // enzyme
            <Provider store={mockStoreInitialized}>
                <Router>
                    <Stats history={mockHistory} />
                </Router>
            </Provider>
        );

        expect(() => wrapper).not.toThrow();
    });
});
