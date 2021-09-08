import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { noop } from 'lodash';
import React from 'react';
import { mount, shallow } from '../../enzyme';
import Voting from './Voting';

describe('Common - Voting', () => {
    const video = {
        email: 'test@test.com',
        title: 'title',
        comments: [
            {
                comments: [],
                userId: 'AwvUxtXkIHYI09Mla7A8F87dSbB3',
                photoUrl: 'https://lh3.googleusercontent.com/a-/AOh14Gjl06wT5BJKONWa6aXrnFBGAbh-9obniO_ExYjb',
                date: '2020-07-22T20:29:25+00:00',
                message: 'Hello',
                displayName: 'Matthew',
                id: 'ySGcFj3tP3oe2nxw98lC'
            }
        ],
        dateCreated: {
            _seconds: 1595074745,
            _nanoseconds: 460000000
        },
        downvotes: [],
        upvotes: [],
        displayName: 'Matthew',
        userId: 'AwvUxtXkIHYI09Mla7A8F87dSbB3',
        videoId: 'LYMGGgbOz1k',
        id: 'D3c5ukOGlXeuOaD9r6oe'
    };

    it('The Voting component renders without crashing', () => {
        const wrapper = shallow(<Voting />);
        expect(() => wrapper).not.toThrow();
    });

    it('The Voting component does upvotes and downvotes', () => {
        const mockUpvote = jest.fn(noop);
        const mockDownvote = jest.fn(noop);

        const wrapper = mount(<Voting
            video={video}
            upvoteHighlightRequest={mockUpvote}
            downvoteHighlightRequest={mockDownvote}
        />);

        wrapper.find(ArrowUpwardIcon).simulate('click');
        wrapper.find(ArrowDownwardIcon).simulate('click');

        expect(mockUpvote.mock.calls.length).toBe(1);
        expect(mockUpvote.mock.calls[0][0]).toBe(video.id);

        expect(mockDownvote.mock.calls.length).toBe(1);
        expect(mockDownvote.mock.calls[0][0]).toBe(video.id);
    });

    it('The Voting component renders negative voting', () => {
        const wrapper = mount(<Voting
            video={{
                ...video,
                downvotes: ['downvotes', 'more downvotes']
            }}
        />);
        expect(wrapper.find('.karma').text()).toBe('-2');
    });
});
