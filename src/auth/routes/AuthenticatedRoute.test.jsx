
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { noop } from 'lodash';
import { shallow, mount } from '../../enzyme';
import AuthenticatedRoute, { AuthenticatedRouteUnconnected } from './AuthenticatedRoute';
import { initState } from '../reducer';

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
            auth: initState,
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
