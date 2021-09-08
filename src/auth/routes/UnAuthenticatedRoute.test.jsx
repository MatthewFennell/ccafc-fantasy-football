import { noop } from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { mount, shallow } from '../../enzyme';
import { initialState } from '../reducer';
import UnauthenticatedRoute, { UnauthenticatedRouteUnconnected } from './UnauthenticatedRoute';

const mockfirebaseStore = {
    auth: {
        email: 'email',
        uid: 'uid'
    }
};

describe('Unauthenticated Route', () => {
    it('The Unauthenticated Route component renders without crashing', () => {
        const wrapper = shallow(<UnauthenticatedRouteUnconnected
            component={noop}
        />);
        expect(() => wrapper).not.toThrow();
    });
});

describe('Unauthenticated Route connected', () => {
    it('Connected unauthenticated route', () => {
        const mockStore = configureMockStore([]);
        const mockStoreInitialized = mockStore({
            auth: initialState,
            firebase: mockfirebaseStore
        });

        const wrapper = mount(
            <Provider store={mockStoreInitialized}>
                <Router>
                    <UnauthenticatedRoute component={() => <div />} />
                </Router>
            </Provider>
        );

        expect(() => wrapper).not.toThrow();
    });
});
