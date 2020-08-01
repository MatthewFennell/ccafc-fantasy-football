import React from 'react';
import { noop } from 'lodash';
import { mount, shallow } from '../../enzyme';
import Comment from './Comment';
import AddReply from './AddReply';
import CommentInfo from './CommentInfo';

describe('Common - Comment', () => {
    it('The Comment component renders without crashing', () => {
        const wrapper = shallow(<Comment />);
        expect(() => wrapper).not.toThrow();
    });

    it('Comment - delete comment', () => {
        const mockFn = jest.fn(noop);
        const loggedInUser = 'userId';
        const wrapper = mount(<Comment
            deleteComment={mockFn}
            loggedInUserId={loggedInUser}
            details={
                { id: 'someId', userId: loggedInUser }
            }
        />);
        expect(wrapper.find(CommentInfo)).toHaveLength(1);
        wrapper.find('.deleteComment').simulate('click');
        expect(mockFn.mock.calls.length).toBe(1);
        expect(mockFn.mock.calls[0][0]).toBe('someId');
    });

    it('Comment - does not delete comment if different ids', () => {
        const mockFn = jest.fn(noop);
        const loggedInUser = 'userId';
        const wrapper = mount(<Comment
            deleteComment={mockFn}
            loggedInUserId={loggedInUser}
            details={
                { id: 'someId', userId: 'differentId' }
            }
        />);
        expect(wrapper.find(CommentInfo)).toHaveLength(1);
        expect(wrapper.find('.deleteComment')).toHaveLength(0);
    });

    it('Comment - delete comment with parent id', () => {
        const mockFn = jest.fn(noop);
        const loggedInUser = 'userId';
        const wrapper = mount(<Comment
            deleteReply={mockFn}
            parentId="parentId"
            loggedInUserId={loggedInUser}
            details={
                { id: 'someId', userId: loggedInUser }
            }
        />);
        expect(wrapper.find(CommentInfo)).toHaveLength(1);
        wrapper.find('.deleteComment').simulate('click');
        expect(mockFn.mock.calls.length).toBe(1);
        expect(mockFn.mock.calls[0][0]).toBe('parentId');
        expect(mockFn.mock.calls[0][1]).toBe('someId');
    });

    it('Comment - open reply', () => {
        const loggedInUser = 'userId';
        const wrapper = mount(<Comment
            isTopLevel
            parentId="parentId"
            loggedInUserId={loggedInUser}
            details={
                { id: 'someId', userId: loggedInUser }
            }
        />);
        expect(wrapper.find(AddReply)).toHaveLength(0);
        wrapper.find('.reply').simulate('click');
        expect(wrapper.find(AddReply)).toHaveLength(1);
    });

    it('Comment - submit reply', () => {
        const mockFn = jest.fn(noop);
        const loggedInUser = 'userId';
        const wrapper = mount(<Comment
            isTopLevel
            parentId="parentId"
            loggedInUserId={loggedInUser}
            details={
                { id: 'someId', userId: loggedInUser }
            }
            submitReply={mockFn}
        />);

        wrapper.find('.reply').simulate('click');
        wrapper.find('.submitReply').simulate('click');

        expect(mockFn.mock.calls.length).toBe(1);
        expect(mockFn.mock.calls[0][0]).toBe('');
        expect(mockFn.mock.calls[0][1]).toBe('someId');
    });

    it('Comment - cancel reply', () => {
        const loggedInUser = 'userId';
        const wrapper = mount(<Comment
            isTopLevel
            parentId="parentId"
            loggedInUserId={loggedInUser}
            details={
                { id: 'someId', userId: loggedInUser }
            }
        />);

        wrapper.find('.reply').simulate('click');
        wrapper.find('.cancelReply').simulate('click');
        expect(wrapper.find(AddReply)).toHaveLength(0);
    });
});
