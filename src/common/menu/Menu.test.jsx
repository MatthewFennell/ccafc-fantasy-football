import React from 'react';
import { noop } from 'lodash';
import MenuItem from '@material-ui/core/MenuItem';
import { mount, shallow } from '../../enzyme';
import Menu from './Menu';

describe('Common - Menu', () => {
    it('The Menu component renders without crashing', () => {
        const wrapper = shallow(<Menu />);
        expect(() => wrapper).not.toThrow();
    });

    it('The Menu clicking on menu item', () => {
        const options = [
            {
                id: 'removeAll',
                text: 'Remove all roles',
                value: 'ALL'
            },
            {
                id: 'removeADMIN',
                text: 'Remove ADMIN',
                value: 'ADMIN'
            }
        ];

        const mockFn = jest.fn(noop);
        const wrapper = mount(<Menu options={options} onClick={mockFn} />);
        expect(wrapper.find(MenuItem)).toHaveLength(2);

        wrapper.find(MenuItem).at(0).simulate('click');
        expect(mockFn.mock.calls.length).toBe(1);
        expect(mockFn.mock.calls[0][0]).toBe(options[0]);
    });
});
