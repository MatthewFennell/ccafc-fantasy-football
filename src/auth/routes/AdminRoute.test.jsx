import { noop } from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { mount, shallow } from '../../enzyme';
import { initialState } from '../reducer';
import AdminRoute, { AdminRouteUnconnected } from './AdminRoute';

const mockfirebaseStore = {
    auth: {
        email: 'email',
        uid: 'uid'
    }
};

describe('Admin Route', () => {
    it('The Admin Route component renders without crashing', () => {
        const wrapper = shallow(<AdminRouteUnconnected component={noop} />);
        expect(() => wrapper).not.toThrow();
    });
});

describe('Admin Route connected', () => {
    it('Connected admin route', () => {
        const mockStore = configureMockStore([]);
        const mockStoreInitialized = mockStore({
            auth: initialState,
            firebase: mockfirebaseStore
        });

        const wrapper = mount(
            <Provider store={mockStoreInitialized}>
                <Router>
                    <AdminRoute component={noop} />
                </Router>
            </Provider>
        );

        expect(() => wrapper).not.toThrow();
    });
});
