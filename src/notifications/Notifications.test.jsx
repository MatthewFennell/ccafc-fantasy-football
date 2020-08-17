import React from 'react';
import { noop } from 'lodash';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow, mount } from '../enzyme';
import Notifications, { NotificationsUnconnected } from './Notifications';

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
    },
    profile: {
        isLoaded: true,
        isEmpty: false,
        notifications: ['some', 'notifications']
    }
};

describe('Notifications', () => {
    it('The Notifications component renders without crashing', () => {
        const wrapper = shallow(<NotificationsUnconnected />);
        expect(() => wrapper).not.toThrow();
    });
});

describe('Notifications connected', () => {
    it('Connected Notifications', () => {
        const mockStore = configureMockStore([]);
        const mockStoreInitialized = mockStore({
            firebase: mockfirebaseStore,
            history: mockHistory
        });

        const wrapper = mount(
            <Provider store={mockStoreInitialized}>
                <Router>
                    <Notifications history={mockHistory} />
                </Router>
            </Provider>
        );

        expect(() => wrapper).not.toThrow();
    });
});
