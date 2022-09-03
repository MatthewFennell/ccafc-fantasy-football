import { noop } from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import Switch from '../../common/Switch/Switch';
import { mount, shallow } from '../../enzyme';
import { initialState } from '../reducer';
import { TogglePagesConnected, TogglePagesUnconnected } from './TogglePages';

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

describe('Admin - Toggle Pages', () => {
    it('The Transfers component renders without crashing', () => {
        const wrapper = shallow(<TogglePagesUnconnected />);
        expect(() => wrapper).not.toThrow();
    });
});

describe('Admin - Toggle Pages connected', () => {
    const appInfo = {
        disabledPages: [
            'Leagues',
            'Charts',
            'Stats',
            'The Cup',
            'Feature Request',
            'Transfers'
        ],
        number_of_users: 41,
        total_weeks: 6
    };

    it('Toggle Pages', () => {
        const mockStore = configureMockStore([]);
        const mockStoreInitialized = mockStore({
            firebase: mockfirebaseStore,
            history: mockHistory,
            transfers: initialState,
            firestore: {
                data: {
                    appInfo
                }
            },
            auth: {
                isEditingPage: ''
            }
        });

        const wrapper = mount(
            <Provider store={mockStoreInitialized}>
                <Router>
                    <TogglePagesConnected
                        history={mockHistory}
                    />
                </Router>
            </Provider>
        );

        expect(() => wrapper).not.toThrow();
        expect(wrapper.find(Switch)).toHaveLength(12);
    });
});
