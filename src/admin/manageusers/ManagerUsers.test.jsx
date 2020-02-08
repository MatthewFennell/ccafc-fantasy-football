
import React from 'react';
import { noop } from 'lodash';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { shallow, mount } from '../../enzyme';
import ManageUsers, { ManageUsersUnconnected } from './ManageUsers';
import { initState } from '../reducer';
import { initState as authInitState } from '../../auth/reducer';

describe('Manage Users', () => {
    it('The Manage Users component renders without crashing', () => {
        const wrapper = shallow(<ManageUsersUnconnected
            closeSuccessMessage={noop}
            closeAdminError={noop}
            rollOverToNextYearRequest={noop}
            fetchUsersWithExtraRolesRequest={noop}
            addUserRoleRequest={noop}
            clearDatabaseRequest={noop}
            deleteAllOldUsersRequest={noop}
            removeUserRoleRequest={noop}
        />);
        expect(() => wrapper).not.toThrow();
    });
});

describe('Manage Users connected', () => {
    const mockStore = configureMockStore([]);
    const mockStoreInitialized = mockStore({
        admin: initState,
        auth: authInitState
    });

    const wrapper = mount( // enzyme
        <Provider store={mockStoreInitialized}>
            <ManageUsers />
        </Provider>
    );

    expect(() => wrapper).not.toThrow();
});
