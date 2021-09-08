import React from 'react';
import { mount } from '../../enzyme';
import fixtures from '../../test/fixtures';
import Mobile from './Mobile';

describe('Transfers - Mobile', () => {
    const currentTeam = [
        {
            goals: 0,
            previousScore: 23,
            team: 'Ixtal',
            price: 3,
            position: 'MIDFIELDER',
            assists: 6,
            name: 'Nidalee',
            points: 18,
            id: 'RblNGl3ja9aQStogau1s'
        },
        {
            price: 6,
            goals: 9,
            position: 'ATTACKER',
            hasPaidSubs: true,
            assists: 0,
            name: 'Shaco',
            team: 'Runeterra',
            previousScore: 54,
            points: 36,
            id: '0dEVXgTYbWm2QwcGUqkI'
        },
        {
            team: 'Runeterra',
            goals: 6,
            position: 'ATTACKER',
            name: 'Lucian',
            assists: 0,
            points: 24,
            price: 6,
            previousScore: 86,
            id: '2glwlX3EG60kglhUQqzs'
        },
        {
            team: 'Targon',
            name: 'Diana',
            points: 80,
            goals: 16,
            hasPaidSubs: true,
            assists: 0,
            position: 'MIDFIELDER',
            previousScore: 5,
            price: 5,
            id: '0F9SXBJBDlDuudHXlHjI'
        },
        {
            team: 'Targon',
            goals: 13,
            name: 'Soraka',
            assists: 0,
            position: 'DEFENDER',
            price: 3,
            previousScore: 13,
            points: 94,
            id: '58odAZp5Pab1mzXLdHyT'
        },
        {
            price: 5,
            position: 'DEFENDER',
            team: 'Demacia',
            assists: 0,
            previousScore: 27,
            points: 124,
            name: 'Kayle',
            goals: 18,
            id: '66GqV7f1XD96zvecTqht'
        },
        {
            price: 3,
            points: 34,
            position: 'DEFENDER',
            goals: 5,
            previousScore: 15,
            name: 'Neeko',
            team: 'Ixtal',
            assists: 0,
            id: '576DR6kjJu6gc0WDYawj'
        },
        {
            position: 'DEFENDER',
            assists: 0,
            points: 52,
            goals: 6,
            team: 'Targon',
            previousScore: 21,
            price: 3,
            name: 'Taric',
            id: '5LOoI7p7E17emCW481OA'
        },
        {
            name: 'Sona',
            position: 'DEFENDER',
            previousScore: 15,
            team: 'Demacia',
            assists: 0,
            points: 88,
            goals: 12,
            price: 6,
            id: 'JPoJ0fKriU76VA7uLHo4'
        },
        {
            team: 'Noxus',
            position: 'MIDFIELDER',
            assists: 3,
            previousScore: 13,
            price: 5,
            points: 49,
            goals: 8,
            name: 'Cassiopeia',
            id: '8H1GwHMbL9AxYIeWdV8X'
        },
        {
            name: 'Blitzcrank',
            assists: 0,
            team: 'Zaun',
            points: 54,
            position: 'GOALKEEPER',
            previousScore: 34,
            price: 8.5,
            goals: 5,
            id: 'IAqruivPGrK5eQB8IP8h'
        }
    ];

    const originalTeam = [
        {
            goals: 0,
            previousScore: 23,
            team: 'Ixtal',
            price: 3,
            position: 'DEFENDER',
            assists: 6,
            name: 'New Name',
            points: 18,
            id: 'a replaced ID'
        },
        {
            price: 6,
            goals: 9,
            position: 'ATTACKER',
            hasPaidSubs: true,
            assists: 0,
            name: 'Shaco',
            team: 'Runeterra',
            previousScore: 54,
            points: 36,
            id: '0dEVXgTYbWm2QwcGUqkI'
        },
        {
            team: 'Runeterra',
            goals: 6,
            position: 'ATTACKER',
            name: 'Lucian',
            assists: 0,
            points: 24,
            price: 6,
            previousScore: 86,
            id: '2glwlX3EG60kglhUQqzs'
        },
        {
            team: 'Targon',
            name: 'Diana',
            points: 80,
            goals: 16,
            hasPaidSubs: true,
            assists: 0,
            position: 'MIDFIELDER',
            previousScore: 5,
            price: 5,
            id: '0F9SXBJBDlDuudHXlHjI'
        },
        {
            team: 'Targon',
            goals: 13,
            name: 'Soraka',
            assists: 0,
            position: 'DEFENDER',
            price: 3,
            previousScore: 13,
            points: 94,
            id: '58odAZp5Pab1mzXLdHyT'
        },
        {
            price: 5,
            position: 'DEFENDER',
            team: 'Demacia',
            assists: 0,
            previousScore: 27,
            points: 124,
            name: 'Kayle',
            goals: 18,
            id: '66GqV7f1XD96zvecTqht'
        },
        {
            price: 3,
            points: 34,
            position: 'DEFENDER',
            goals: 5,
            previousScore: 15,
            name: 'Neeko',
            team: 'Ixtal',
            assists: 0,
            id: '576DR6kjJu6gc0WDYawj'
        },
        {
            position: 'DEFENDER',
            assists: 0,
            points: 52,
            goals: 6,
            team: 'Targon',
            previousScore: 21,
            price: 3,
            name: 'Taric',
            id: '5LOoI7p7E17emCW481OA'
        },
        {
            name: 'Sona',
            position: 'DEFENDER',
            previousScore: 15,
            team: 'Demacia',
            assists: 0,
            points: 88,
            goals: 12,
            price: 6,
            id: 'JPoJ0fKriU76VA7uLHo4'
        },
        {
            team: 'Noxus',
            position: 'MIDFIELDER',
            assists: 3,
            previousScore: 13,
            price: 5,
            points: 49,
            goals: 8,
            name: 'Cassiopeia',
            id: '8H1GwHMbL9AxYIeWdV8X'
        },
        {
            name: 'Blitzcrank',
            assists: 0,
            team: 'Zaun',
            points: 54,
            position: 'GOALKEEPER',
            previousScore: 34,
            price: 8.5,
            goals: 5,
            id: 'IAqruivPGrK5eQB8IP8h'
        }
    ];

    it('The Mobile component renders without crashing', () => {
        const wrapper = mount(<Mobile
            originalTeam={originalTeam}
            currentTeam={currentTeam}
            fixtures={fixtures}
            fetchingOriginalTeam
            remainingBudget={50}
        />);
        expect(() => wrapper).not.toThrow();
        expect(wrapper.find('.remainingBudgetValue').text()).toBe('£50.0m');
    });
});
