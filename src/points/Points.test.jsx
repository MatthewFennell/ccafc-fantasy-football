/* eslint-disable func-names */
import React from 'react';
import { noop } from 'lodash';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow, mount } from '../enzyme';
import Points, { PointsUnconnected } from './Points';
import { initialState } from './reducer';
import { initialState as overviewinitialState } from '../overview/reducer';

const mockHistory = {
    location: {
        pathname: 'pathname'
    },
    push: noop
};

describe('Points', () => {
    window.matchMedia = window.matchMedia || function () {
        return {
            matches: false,
            addListener() {},
            removeListener() {}
        };
    };

    it('The Points component renders without crashing', () => {
        const wrapper = shallow(<PointsUnconnected
            fetchUserPointsForWeekRequest={noop}
            fetchUserPointsForWeekRequestBackground={noop}
            history={mockHistory}
        />);
        expect(() => wrapper).not.toThrow();
    });
});

describe('Points connected', () => {
    it('Connected points', () => {
        const mockStore = configureMockStore([]);
        const mockStoreInitialized = mockStore({
            firebase: {
                auth: {
                    uid: ''
                }
            },
            overview: overviewinitialState,
            points: initialState,
            history: mockHistory,
            profile: {
                updatingTeamName: false
            }
        });

        window.matchMedia = window.matchMedia || function () {
            return {
                matches: false,
                addListener() {},
                removeListener() {}
            };
        };

        const wrapper = mount(
            <Provider store={mockStoreInitialized}>
                <Router>
                    <Points history={mockHistory} />
                </Router>
            </Provider>
        );

        expect(() => wrapper).not.toThrow();
    });
});
