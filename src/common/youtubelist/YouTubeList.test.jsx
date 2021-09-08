import React from 'react';
import { mount, shallow } from '../../enzyme';
import YouTubeList from './YouTubeList';

describe('Common - YouTubeList', () => {
    it('The YouTubeList component renders without crashing', () => {
        const wrapper = shallow(<YouTubeList />);
        expect(() => wrapper).not.toThrow();
    });

    it('The YouTubeList component renders list of videos', () => {
        const videos = [
            {
                email: 'test@test.com',
                upvotes: [
                    'AwvUxtXkIHYI09Mla7A8F87dSbB3'
                ],
                displayName: 'Matthew',
                title: 'LYMGGgbOz1k',
                dateCreated: {
                    _seconds: 1595965626,
                    _nanoseconds: 230000000
                },
                userId: 'AwvUxtXkIHYI09Mla7A8F87dSbB3',
                videoId: 'LYMGGgbOz1k',
                comments: [],
                downvotes: [],
                id: 'MCEnL1sa89gHtYH2xnHP'
            },
            {
                downvotes: [],
                userId: 'AwvUxtXkIHYI09Mla7A8F87dSbB3',
                dateCreated: {
                    _seconds: 1595527758,
                    _nanoseconds: 352000000
                },
                upvotes: [
                    'AwvUxtXkIHYI09Mla7A8F87dSbB3'
                ],
                videoId: 'LYMGGgbOz1k',
                title: 'Video',
                comments: [],
                email: 'test@test.com',
                displayName: 'Matthew',
                id: 'zqFbBI1XaMxh0S5Swuf5'
            },
            {
                userId: 'AwvUxtXkIHYI09Mla7A8F87dSbB3',
                dateCreated: {
                    _seconds: 1595074745,
                    _nanoseconds: 460000000
                },
                comments: [
                    {
                        date: '2020-07-22T20:29:25+00:00',
                        userId: 'AwvUxtXkIHYI09Mla7A8F87dSbB3',
                        comments: [],
                        id: 'ySGcFj3tP3oe2nxw98lC',
                        message: 'Hi Jen',
                        photoUrl: 'https://lh3.googleusercontent.com/a-/AOh14Gjl06wT5BJKONWa6aXrnFBGAbh-9obniO_ExYjb',
                        displayName: 'Matthew'
                    }
                ],
                upvotes: [
                    'AwvUxtXkIHYI09Mla7A8F87dSbB3'
                ],
                email: 'test@test.com',
                displayName: 'Matthew',
                title: 'affasafs',
                downvotes: [],
                videoId: 'LYMGGgbOz1k',
                id: 'D3c5ukOGlXeuOaD9r6oe'
            },
            {
                upvotes: [
                    'AwvUxtXkIHYI09Mla7A8F87dSbB3'
                ],
                videoId: 'LYMGGgbOz1k',
                dateCreated: {
                    _seconds: 1595073357,
                    _nanoseconds: 871000000
                },
                comments: [],
                displayName: 'Matthew',
                email: 'test@test.com',
                userId: 'AwvUxtXkIHYI09Mla7A8F87dSbB3',
                downvotes: [],
                title: 'sdgsgds',
                id: 'xUgeJ1T7Y7dESIjNy82Y'
            }
        ];

        const wrapper = mount(<YouTubeList videos={videos} />);
        expect(wrapper.find('.videoListWrapper')).toHaveLength(1);
        expect(wrapper.find('.videoWrapper')).toHaveLength(4);
    });
});
