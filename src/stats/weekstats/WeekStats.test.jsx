import React from 'react';
import { mount, shallow } from '../../enzyme';
import WeekStats from './WeekStats';
import Spinner from '../../common/spinner/Spinner';

describe('Stats - WeekStats', () => {
    it('The WeekStats component renders without crashing', () => {
        const wrapper = shallow(<WeekStats />);
        expect(() => wrapper).not.toThrow();
    });

    it('The WeekStats component renders usefully', () => {
        const stats = [
            {
                player_id: '8H1GwHMbL9AxYIeWdV8X',
                ownGoals: 0,
                name: 'Cassiopeia',
                yellowCard: false,
                team: 'Noxus',
                position: 'MIDFIELDER',
                points: 5,
                penaltyMisses: 0,
                week: 3,
                redCard: false,
                goals: 1,
                manOfTheMatch: false,
                dickOfTheDay: false,
                assists: 0,
                cleanSheet: false,
                penaltySaves: 0,
                id: '2kztrIE6ZPiODlmahWFF'
            },
            {
                assists: 0,
                position: 'GOALKEEPER',
                name: 'Darius',
                penaltyMisses: 0,
                penaltySaves: 0,
                yellowCard: false,
                points: 12,
                player_id: '9lhSy1Svn9BcgNf1AEOV',
                week: 3,
                dickOfTheDay: false,
                ownGoals: 0,
                redCard: false,
                manOfTheMatch: false,
                goals: 1,
                cleanSheet: true,
                team: 'Noxus',
                id: '3gphZBJkzEUcTUxp35A2'
            },
            {
                name: 'Draven',
                player_id: '6BGut7yPRAJKnEUzbDf4',
                position: 'ATTACKER',
                dickOfTheDay: false,
                yellowCard: false,
                penaltyMisses: 0,
                manOfTheMatch: false,
                assists: 0,
                penaltySaves: 0,
                cleanSheet: false,
                points: 0,
                goals: 0,
                week: 3,
                ownGoals: 0,
                redCard: false,
                team: 'Noxus',
                id: '4FDpJDfV7AACfVeXfkTy'
            },
            {
                yellowCard: false,
                goals: 0,
                redCard: false,
                dickOfTheDay: true,
                assists: 0,
                team: 'Noxus',
                penaltySaves: 0,
                position: 'MIDFIELDER',
                manOfTheMatch: false,
                penaltyMisses: 0,
                player_id: 'WSAE3nhivReEcGsHRwSv',
                ownGoals: 0,
                points: -3,
                week: 3,
                name: 'Vladamir',
                cleanSheet: false,
                id: 'CZQYSlkxZ7uHLiTmlliA'
            },
            {
                manOfTheMatch: false,
                yellowCard: false,
                redCard: false,
                points: 13,
                position: 'DEFENDER',
                penaltySaves: 0,
                penaltyMisses: 0,
                assists: 3,
                name: 'Mordekaiser',
                ownGoals: 0,
                team: 'Noxus',
                dickOfTheDay: false,
                goals: 0,
                week: 3,
                cleanSheet: true,
                player_id: 'UTQWiJeeiBkRsh0MkBOM',
                id: 'cvthWQn4Ov2T6elbaurC'
            },
            {
                week: 3,
                goals: 0,
                penaltySaves: 0,
                team: 'Noxus',
                cleanSheet: false,
                name: 'Riven',
                ownGoals: 0,
                points: 6,
                assists: 2,
                redCard: false,
                dickOfTheDay: false,
                penaltyMisses: 0,
                yellowCard: false,
                player_id: 'TxTB6IlUS7n5kxPMTOQt',
                manOfTheMatch: false,
                position: 'ATTACKER',
                id: 'ddCtUtMsAhpvIxLRfMBX'
            },
            {
                week: 3,
                player_id: 'IpXn9wt9RI5oMn0KwqdG',
                yellowCard: false,
                cleanSheet: false,
                ownGoals: 0,
                manOfTheMatch: false,
                position: 'MIDFIELDER',
                points: 9,
                assists: 3,
                redCard: false,
                name: 'Katarina',
                goals: 0,
                penaltyMisses: 0,
                dickOfTheDay: false,
                penaltySaves: 0,
                team: 'Noxus',
                id: 'iFsFkoYL7vZ5897jmDYA'
            },
            {
                penaltySaves: 0,
                penaltyMisses: 0,
                name: 'Swain',
                dickOfTheDay: false,
                yellowCard: false,
                redCard: false,
                position: 'MIDFIELDER',
                player_id: '6BuBNdutgo8qstcDLta3',
                manOfTheMatch: false,
                ownGoals: 0,
                team: 'Noxus',
                cleanSheet: false,
                points: 10,
                goals: 2,
                assists: 0,
                week: 3,
                id: 'jZVn3pJLF3LuRyiNKlDa'
            },
            {
                goals: 0,
                week: 3,
                penaltyMisses: 0,
                ownGoals: 0,
                yellowCard: false,
                position: 'DEFENDER',
                penaltySaves: 0,
                cleanSheet: true,
                dickOfTheDay: false,
                manOfTheMatch: false,
                name: 'Kled',
                player_id: 'BIMySL1C05jOKfALjvdu',
                assists: 4,
                team: 'Noxus',
                points: 16,
                redCard: false,
                id: 't786AyZr1pFfvQrm7MR5'
            },
            {
                dickOfTheDay: false,
                ownGoals: 0,
                manOfTheMatch: true,
                penaltySaves: 0,
                team: 'Noxus',
                assists: 0,
                penaltyMisses: 0,
                goals: 0,
                name: 'Sion',
                player_id: 'WAVavGHeSerw31jv2QvO',
                yellowCard: false,
                week: 3,
                redCard: false,
                points: 4,
                cleanSheet: true,
                position: 'DEFENDER',
                id: 'ulwtemmiovCOdcRBfjjx'
            }
        ];

        const columns = [
            {
                id: 'goals',
                label: 'Goals',
                initialActive: true
            },
            {
                id: 'assists',
                label: 'Assists',
                initialActive: true
            },
            {
                id: 'cleanSheet',
                label: 'Clean Sheets',
                initialActive: true
            },
            {
                id: 'redCard',
                label: 'Reds',
                initialActive: true
            },
            {
                id: 'yellowCard',
                label: 'Yellows',
                initialActive: true
            },
            {
                id: 'manOfTheMatch',
                label: 'MotM',
                initialActive: true
            },
            {
                id: 'dickOfTheDay',
                label: 'DotD',
                initialActive: true
            },
            {
                id: 'ownGoals',
                label: 'Own Goals',
                initialActive: true
            },
            {
                id: 'penaltySaves',
                label: 'Penalty Saves',
                initialActive: true
            },
            {
                id: 'penaltyMisses',
                label: 'Penalty Misses',
                initialActive: true
            }
        ];

        const wrapper = mount(<WeekStats stats={stats} activeColumns={columns} />);
        expect(wrapper.find('.statTitle')).toHaveLength(5);
    });

    it('The WeekStats component renders when combined', () => {
        const wrapper = mount(<WeekStats stats={[]} activeColumns={[]} isCombined />);
        expect(wrapper.find('.downloadAsCsv')).toHaveLength(1);
    });

    it('The WeekStats component renders spinner', () => {
        const wrapper = mount(<WeekStats loading />);
        expect(wrapper.find(Spinner)).toHaveLength(1);
    });
});
