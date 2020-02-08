
import React from 'react';
import { noop } from 'lodash';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { shallow, mount } from '../../enzyme';
import ManageSubs, { ManageSubsUnconnected } from './ManageSubs';
import { initState } from '../reducer';
import { initialState as transfersInitState } from '../../transfers/reducer';

describe('Manage Subs', () => {
    it('The Manage Subs component renders without crashing', () => {
        const wrapper = shallow(<ManageSubsUnconnected
            closeSuccessMessage={noop}
            closeAdminError={noop}
            fetchAllPlayersRequest={noop}
            setHasPaidSubsRequest={noop}
        />);
        expect(() => wrapper).not.toThrow();
    });
});

describe('Manage Subs connected', () => {
    it('Connected manage subs', () => {
        const mockStore = configureMockStore([]);
        const mockStoreInitialized = mockStore({
            admin: initState,
            transfers: transfersInitState
        });

        const wrapper = mount( // enzyme
            <Provider store={mockStoreInitialized}>
                <ManageSubs />
            </Provider>
        );

        expect(() => wrapper).not.toThrow();
    });
});
