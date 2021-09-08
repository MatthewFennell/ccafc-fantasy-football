import { noop } from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { mount, shallow } from '../../enzyme';
import { initialState } from '../reducer';
import AuthenticatedRoute, { AuthenticatedRouteUnconnected } from './AuthenticatedRoute';

const mockfirebaseStore = {
    auth: {
        email: 'email',
        uid: 'uid'
    }
};

describe('Authenticated Route', () => {
    it('The Authenticated Route component renders without crashing', () => {
        const wrapper = shallow(<AuthenticatedRouteUnconnected component={noop} />);
        expect(() => wrapper).not.toThrow();
    });
});

describe('Authenticated Route connected', () => {
    it('Connected authenticated route', () => {
        const mockStore = configureMockStore([]);
        const mockStoreInitialized = mockStore({
            auth: initialState,
            firebase: mockfirebaseStore
        });

        const wrapper = mount(
            <Provider store={mockStoreInitialized}>
                <Router>
                    <AuthenticatedRoute component={noop} />
                </Router>
            </Provider>
        );

        expect(() => wrapper).not.toThrow();
    });
});
