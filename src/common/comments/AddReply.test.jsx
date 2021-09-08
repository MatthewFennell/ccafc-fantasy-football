import { noop } from 'lodash';
import React from 'react';
import { mount, shallow } from '../../enzyme';
import AddReply from './AddReply';

describe('Common - AddReply', () => {
    it('The AddReply component renders without crashing', () => {
        const wrapper = shallow(<AddReply />);
        expect(() => wrapper).not.toThrow();
    });

    it('The AddReply component performs clicks', () => {
        const mockFn = jest.fn(noop);
        const wrapper = mount(<AddReply submitReply={mockFn} />);
        wrapper.find('.submitReply').simulate('click');
        expect(mockFn.mock.calls.length).toBe(1);
    });
});
