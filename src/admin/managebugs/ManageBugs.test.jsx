import React from 'react';
import { noop } from 'lodash';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow, mount } from '../../enzyme';
import { initialState } from '../reducer';
import { ManageBugsConnected, ManageBugsUnconnected } from './ManageBugs';
import ConfirmModal from '../../common/modal/ConfirmModal';
import Bug from './Bug';

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

describe('Admin - Manage Bugs', () => {
    it('The Transfers component renders without crashing', () => {
        const wrapper = shallow(<ManageBugsUnconnected />);
        expect(() => wrapper).not.toThrow();
    });
});

describe('Admin - Manage Bugs connected', () => {
    const bugs = {
        '7UnG7Mc5gzzBsXRDYZ0G': {
            comments: [],
            dateCreated: {
                seconds: 1595527944,
                nanoseconds: 272000000
            },
            description: 'dhfdhdfh',
            displayName: 'Matthew',
            isBug: true,
            userId: 'AwvUxtXkIHYI09Mla7A8F87dSbB3'
        },
        bRhhKEjsg1g5LPJH7Tdv: {
            comments: [],
            dateCreated: {
                seconds: 1595527977,
                nanoseconds: 128000000
            },
            description: 'Another bug',
            displayName: 'Matthew',
            isBug: true,
            userId: 'AwvUxtXkIHYI09Mla7A8F87dSbB3'
        },
        oQZvzRebTz4FuxeBvm0i: {
            comments: [],
            dateCreated: {
                seconds: 1595527867,
                nanoseconds: 577000000
            },
            description: 'Bug',
            displayName: 'Matthew',
            isBug: true,
            userId: 'AwvUxtXkIHYI09Mla7A8F87dSbB3'
        }
    };

    it('Manage Bugs', () => {
        const mockStore = configureMockStore([]);
        const mockStoreInitialized = mockStore({
            firebase: mockfirebaseStore,
            history: mockHistory,
            transfers: initialState,
            firestore: {
                data: {
                    featureRequestBugs: bugs
                }
            },
            admin: {
                bugIdToDelete: '',
                isDeletingBug: false
            }
        });

        const wrapper = mount(
            <Provider store={mockStoreInitialized}>
                <Router>
                    <ManageBugsConnected
                        history={mockHistory}
                    />
                </Router>
            </Provider>
        );

        expect(() => wrapper).not.toThrow();
        expect(wrapper.find(ConfirmModal)).toHaveLength(1);
        expect(wrapper.find(Bug)).toHaveLength(3);
    });
});
