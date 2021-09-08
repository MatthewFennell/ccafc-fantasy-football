import { noop } from 'lodash';
import React from 'react';
import { shallow } from '../../enzyme';
import { ManageSubsUnconnected } from './ManageSubs';

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
