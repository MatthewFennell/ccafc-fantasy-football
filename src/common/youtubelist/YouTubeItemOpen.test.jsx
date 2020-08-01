import React from 'react';
import { noop } from 'lodash';
import { mount, shallow } from '../../enzyme';
import YouTubeItemOpen from './YouTubeItemOpen';
import Voting from './Voting';
import StyledButton from '../StyledButton/StyledButton';

describe('Common - YouTubeItemOpen', () => {
    it('The YouTubeItemOpen component renders without crashing', () => {
        const wrapper = shallow(<YouTubeItemOpen />);
        expect(() => wrapper).not.toThrow();
    });

    it('The YouTubeItemOpen component does more stuff - approves page open confirm', () => {
        const videoId = 'videoId';
        const openConfirm = jest.fn(noop);
        const wrapper = mount(<YouTubeItemOpen
            approversPage
            videoId={videoId}
            openConfirm={openConfirm}
        />);
        expect(wrapper.find('.buttonWrapper')).toHaveLength(1);
        wrapper.find('.buttonWrapper').find(StyledButton).at(0).simulate('click');
        expect(openConfirm.mock.calls.length).toBe(1);
        expect(openConfirm.mock.calls[0][0]).toBe(videoId);
    });

    it('The YouTubeItemOpen component does more stuff - approves page open reject', () => {
        const videoId = 'videoId';
        const openReject = jest.fn(noop);
        const wrapper = mount(<YouTubeItemOpen
            approversPage
            videoId={videoId}
            openReject={openReject}
        />);
        expect(wrapper.find('.buttonWrapper')).toHaveLength(1);
        wrapper.find('.buttonWrapper').find(StyledButton).at(1).simulate('click');
        expect(openReject.mock.calls.length).toBe(1);
        expect(openReject.mock.calls[0][0]).toBe(videoId);
    });

    it('The YouTubeItemOpen component voting page', () => {
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

        const wrapper = mount(<YouTubeItemOpen
            video={video}
            votingPage
        />);
        expect(wrapper.find(Voting)).toHaveLength(1);
    });
});
