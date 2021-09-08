import { noop } from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import Spinner from '../../common/spinner/Spinner';
import { mount, shallow } from '../../enzyme';
import { initialState } from '../reducer';
import AddNotification, { AddNotificationUnconnected } from './AddNotification';

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

describe('Admin - Add Notification', () => {
    it('The Transfers component renders without crashing', () => {
        const wrapper = shallow(<AddNotificationUnconnected />);
        expect(() => wrapper).not.toThrow();
    });
});

describe('Admin - Add Notification connected', () => {
    it('Add Notification loading', () => {
        const mockStore = configureMockStore([]);
        const mockStoreInitialized = mockStore({
            firebase: mockfirebaseStore,
            history: mockHistory,
            transfers: initialState,
            admin: {
                addingNotification: true
            }
        });

        const wrapper = mount(
            <Provider store={mockStoreInitialized}>
                <Router>
                    <AddNotification
                        history={mockHistory}
                    />
                </Router>
            </Provider>
        );

        expect(() => wrapper).not.toThrow();
        expect(wrapper.find(Spinner)).toHaveLength(1);
        expect(wrapper.find('.notificationHeader').text()).toBe('Use this page to add Notifications to all users');
    });
});
