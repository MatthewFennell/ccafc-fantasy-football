import MenuItem from '@material-ui/core/MenuItem';
import { noop } from 'lodash';
import React from 'react';
import * as constants from '../constants';
import { mount, shallow } from '../enzyme';
import TopNavbar from './TopNavbar';

describe('Navbar - TopNavbar', () => {
    it('The TopNavbar component renders without crashing', () => {
        const wrapper = shallow(<TopNavbar />);
        expect(() => wrapper).not.toThrow();
    });

    it('Renders correct menu items when not logged in', () => {
        const wrapper = mount(<TopNavbar
            auth={{ uid: null }}
        />);
        expect(wrapper.find(MenuItem)).toHaveLength(3);
    });

    it('Load profile page', () => {
        const mockFn = jest.fn(noop);
        const wrapper = mount(<TopNavbar
            auth={{ uid: 'logged in', emailVerified: true }}
            redirect={mockFn}
        />);
        wrapper.find(MenuItem).at(0).simulate('click');

        expect(mockFn.mock.calls.length).toBe(1);
        expect(mockFn.mock.calls[0][0]).toBe(constants.URL.PROFILE);
    });

    it('Signs out', () => {
        const mockFn = jest.fn(noop);
        const wrapper = mount(<TopNavbar
            auth={{ uid: 'logged in', emailVerified: true }}
            signOut={mockFn}
        />);
        wrapper.find(MenuItem).at(1).simulate('click');

        expect(mockFn.mock.calls.length).toBe(1);
    });

    it('Redirect to sign in', () => {
        const mockFn = jest.fn(noop);
        const wrapper = mount(<TopNavbar
            auth={{ uid: null }}
            redirect={mockFn}
        />);
        wrapper.find(MenuItem).at(0).simulate('click');

        expect(mockFn.mock.calls.length).toBe(1);
        expect(mockFn.mock.calls[0][0]).toBe(constants.URL.SIGN_IN);
    });

    it('Redirect to sign up', () => {
        const mockFn = jest.fn(noop);
        const wrapper = mount(<TopNavbar
            auth={{ uid: null }}
            redirect={mockFn}
        />);
        wrapper.find(MenuItem).at(1).simulate('click');

        expect(mockFn.mock.calls.length).toBe(1);
        expect(mockFn.mock.calls[0][0]).toBe(constants.URL.SIGN_UP);
    });

    it('Redirect to forgot password', () => {
        const mockFn = jest.fn(noop);
        const wrapper = mount(<TopNavbar
            auth={{ uid: null }}
            redirect={mockFn}
        />);
        wrapper.find(MenuItem).at(2).simulate('click');

        expect(mockFn.mock.calls.length).toBe(1);
        expect(mockFn.mock.calls[0][0]).toBe(constants.URL.RESET_PASSWORD);
    });

    it('Renders correct menu items when logged in', () => {
        const wrapper = mount(<TopNavbar
            auth={{ uid: 'some id', emailVerified: true }}
        />);
        expect(wrapper.find(MenuItem)).toHaveLength(2);
    });
});
