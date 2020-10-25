import React from 'react';
import { shallow } from '../../enzyme';
import SubsHistory from './SubsHistory';
import Update from './Update';

describe('Subs history', () => {
    const subsHistory = [
        {
            author: {
                displayName: 'Matthew Fennell',
                email: 'test@test.com',
                uid: 'uid'
            },
            date: {
                seconds: 1603635184,
                nanoseconds: 903000000
            },
            haveNotPaid: [
                'Lionel Messi'
            ],
            havePaid: [
                'Manuel Neuer'
            ]
        },
        {
            author: {
                displayName: 'Matthew Fennell',
                email: 'test@test.com',
                uid: 'uid'
            },
            date: {
                seconds: 1603635177,
                nanoseconds: 435000000
            },
            haveNotPaid: [
                'Harry Maguire',
                'James Milner',
                'Manuel Neuer'
            ],
            havePaid: []
        },
        {
            author: {
                displayName: 'Matthew Fennell',
                email: 'test@test.com',
                uid: 'uid'
            },
            date: {
                seconds: 1603635167,
                nanoseconds: 105000000
            },
            haveNotPaid: [],
            havePaid: [
                'Aymeric Laporte',
                'Ben Chilwell'
            ]
        },
        {
            author: {
                displayName: 'Matthew Fennell',
                email: 'test@test.com',
                uid: 'uid'
            },
            date: {
                seconds: 1603635086,
                nanoseconds: 49000000
            },
            haveNotPaid: [],
            havePaid: [
                'Kevin De Bruyne',
                'Paul Pogba',
                'Luke Shaw'
            ]
        }
    ];

    it('The subs history component renders without crashing', () => {
        const wrapper = shallow(<SubsHistory />);
        expect(() => wrapper).not.toThrow();
    });

    it('The subs history renders no update if there is no update history', () => {
        const wrapper = shallow(<SubsHistory subsHistory={[]} />);
        expect(wrapper.find('.noUpdates').text()).toBe('No updates have been made yet');
    });

    it('Renders an update component for each history ', () => {
        const wrapper = shallow(<SubsHistory subsHistory={subsHistory} />);
        expect(wrapper.find(Update)).toHaveLength(4);
        expect(wrapper.find('.noUpdates')).toHaveLength(0);
    });
});
