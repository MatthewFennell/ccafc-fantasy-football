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
});
