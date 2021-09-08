import { noop } from 'lodash';
import React from 'react';
import { shallow } from '../enzyme';
import { NewNavbarUnconnected } from './NewNavbar';

const mockHistory = {
    location: {
        pathname: 'pathname'
    },
    push: noop
};

describe('Navbar', () => {
    it('The NewNavbar component renders without crashing', () => {
        const wrapper = shallow(<NewNavbarUnconnected
            history={mockHistory}
            signOut={noop}
        />);
        expect(() => wrapper).not.toThrow();
    });
});
