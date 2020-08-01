import React from 'react';
import { mount, shallow } from '../../enzyme';
import Desktop from './Desktop';

describe('Transfers - Desktop', () => {
    it('The Desktop component renders without crashing', () => {
        const wrapper = shallow(<Desktop />);
        expect(() => wrapper).not.toThrow();
    });

    it('The Desktop component with useful info', () => {
        const team = [
            {
                previousScore: 0,
                team: 'C',
                points: 0,
                position: 'MIDFIELDER',
                assists: 0,
                goals: 0,
                price: 5,
                name: 'G',
                id: 'BDxOs9r02fmgRyacVWOa'
            },
            {
                goals: 0,
                name: 'H',
                team: 'C',
                position: 'MIDFIELDER',
                points: 0,
                assists: 0,
                previousScore: 0,
                price: 10,
                id: 'Czbmd075EI9RvbrAQnwa'
            },
            {
                team: 'A',
                position: 'GOALKEEPER',
                name: 'A',
                points: 0,
                assists: 0,
                previousScore: 0,
                goals: 0,
                price: 5,
                id: 'GU4qAtJLCpsx54gteOGZ'
            },
            {
                goals: 0,
                assists: 0,
                previousScore: 0,
                position: 'ATTACKER',
                team: 'E',
                price: 6,
                name: 'L',
                points: 0,
                id: 'Jae07GOFtjsXWLEYaIMG'
            },
            {
                price: 15,
                team: 'E',
                goals: 0,
                assists: 0,
                position: 'ATTACKER',
                previousScore: 0,
                points: 0,
                name: 'J',
                id: 'Qr8kx0SMfi4lGOLzbrsl'
            },
            {
                price: 8,
                previousScore: 0,
                position: 'DEFENDER',
                name: 'C',
                assists: 0,
                points: 0,
                team: 'A',
                goals: 0,
                id: 'Y2ImQU8yaIzvMlZKR1mi'
            },
            {
                previousScore: 0,
                position: 'MIDFIELDER',
                name: 'I',
                price: 5,
                team: 'C',
                points: 0,
                goals: 0,
                assists: 0,
                id: 'esXMx7wjVZGQK910brUD'
            },
            {
                position: 'DEFENDER',
                assists: 0,
                goals: 0,
                price: 9,
                team: 'B',
                name: 'E',
                points: 0,
                previousScore: 0,
                id: 'mQ9fM5B2fweGarDB6ws1'
            },
            {
                price: 4,
                name: 'F',
                team: 'B',
                goals: 0,
                assists: 0,
                previousScore: 0,
                points: 0,
                position: 'MIDFIELDER',
                id: 'n7MGOhgbj0bbDwhtwheF'
            },
            {
                assists: 0,
                previousScore: 0,
                goals: 0,
                team: 'A',
                points: 0,
                name: 'B',
                position: 'DEFENDER',
                price: 4,
                id: 'uVl7rTGi3yCHoFHr2JOw'
            },
            {
                previousScore: 0,
                points: 0,
                position: 'ATTACKER',
                name: 'K',
                assists: 0,
                goals: 0,
                team: 'E',
                price: 7,
                id: 'yj0KzBMu8yKL3yAqqyEO'
            }
        ];

        const wrapper = mount(<Desktop
            originalTeam={team}
            currentTeam={team}
            remainingBudget={19}
        />);
        expect(wrapper.find('.squadValueText').text()).toBe('Squad Value');
        expect(wrapper.find('.squadValueValue').childAt(1).text()).toBe('£97.0 mil');
        expect(wrapper.find('.remainingBudgetValue').childAt(1).text()).toBe('£19.0 mil');
    });
});
