
import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { noop } from 'lodash';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import ManageSubs, { ManageSubsUnconnected } from './ManageSubs';
import { initState } from '../reducer';
import { initialState as transfersInitState } from '../../transfers/reducer';

configure({ adapter: new Adapter() });

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
