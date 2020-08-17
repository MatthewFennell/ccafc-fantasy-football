import React from 'react';
import { noop } from 'lodash';
import { mount, shallow } from '../../enzyme';
import Comments from './Comments';

describe('Common - Comments', () => {
    it('The Comments component renders without crashing', () => {
        const wrapper = shallow(<Comments />);
        expect(() => wrapper).not.toThrow();
    });

    it('The Comments add comment', () => {
        const mockFn = jest.fn(noop);
        const wrapper = mount(<Comments addNewComment={mockFn} />);
        wrapper.find('.submitReply').simulate('click');
        expect(mockFn.mock.calls.length).toBe(1);
        expect(mockFn.mock.calls[0][0]).toBe('');
        wrapper.find('.cancelReply').simulate('click');
    });
});
