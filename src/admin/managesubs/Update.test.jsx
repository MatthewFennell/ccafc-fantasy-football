import React from 'react';
import { shallow } from '../../enzyme';
import Update from './Update';

describe('Subs update', () => {
    const author = {
        displayName: 'The Display Name',
        email: 'test@test.com',
        uid: 'uid'
    };

    const date = {
        seconds: 1603635184,
        nanoseconds: 903000000
    };

    const haveNotPaid = [
        'Lionel Messi', 'Extra player'
    ];

    const havePaid = [
        'Manuel Neuer', 'Another player', 'And another'
    ];

    it('The update component renders without crashing', () => {
        const wrapper = shallow(<Update />);
        expect(() => wrapper).not.toThrow();
    });

    it('The update component renders the correct time', () => {
        const wrapper = shallow(<Update
            author={author}
            date={date}
            haveNotPaid={haveNotPaid}
            havePaid={havePaid}
        />);
        expect(wrapper.find('.authorDate').text()).toBe('Oct 25th 2020, 2:13:04 pm');
    });

    it('The update component renders the correct displayName', () => {
        const wrapper = shallow(<Update
            author={author}
            date={date}
            haveNotPaid={haveNotPaid}
            havePaid={havePaid}
        />);
        expect(wrapper.find('.authorDisplayName').text()).toBe('The Display Name');
    });

    it('The update component renders the correct email', () => {
        const wrapper = shallow(<Update
            author={author}
            date={date}
            haveNotPaid={haveNotPaid}
            havePaid={havePaid}
        />);
        expect(wrapper.find('.authorEmail').text()).toBe('test@test.com');
    });

    it('The update component only renders players if there are updates', () => {
        const wrapper = shallow(<Update
            author={author}
            date={date}
            haveNotPaid={haveNotPaid}
            havePaid={havePaid}
        />);
        expect(wrapper.find('.playersPaid')).toHaveLength(1);
        expect(wrapper.find('.playersNotPaid')).toHaveLength(1);
        expect(wrapper.find('.playerList').at(0).text()).toBe('Manuel Neuer,Another player,And another');
        expect(wrapper.find('.playerList').at(1).text()).toBe('Lionel Messi,Extra player');
    });

    it('The update component does not render plauyers if there are none', () => {
        const wrapper = shallow(<Update
            author={author}
            date={date}
            haveNotPaid={[]}
            havePaid={[]}
        />);
        expect(wrapper.find('.playersPaid')).toHaveLength(0);
        expect(wrapper.find('.playersNotPaid')).toHaveLength(0);
    });
});
