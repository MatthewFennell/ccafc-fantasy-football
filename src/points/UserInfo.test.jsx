import React from 'react';
import { mount, shallow } from '../enzyme';
import UserInfo from './UserInfo';
import Spinner from '../common/spinner/Spinner';

describe('Points - UserInfo', () => {
    it('The UserInfo component renders without crashing', () => {
        const wrapper = shallow(<UserInfo />);
        expect(() => wrapper).not.toThrow();
    });

    it('The UserInfo component renders a spinner', () => {
        const wrapper = mount(<UserInfo fetchingDetails />);

        expect(wrapper.find(Spinner)).toHaveLength(1);
    });

    it('The UserInfo component renders all info', () => {
        const team = [
            {
                goals: 0,
                assists: 0,
                points: 0,
                redCard: false,
                yellowCard: false,
                cleanSheet: false,
                player_id: 'RblNGl3ja9aQStogau1s',
                isCaptain: false,
                manOfTheMatch: false,
                dickOfTheDay: false,
                ownGoals: 0,
                penaltyMisses: 0,
                penaltySaves: 0,
                name: 'Nidalee',
                team: 'Ixtal',
                position: 'MIDFIELDER'
            },
            {
                goals: 0,
                assists: 0,
                points: 0,
                redCard: false,
                yellowCard: false,
                cleanSheet: false,
                player_id: '0dEVXgTYbWm2QwcGUqkI',
                isCaptain: false,
                manOfTheMatch: false,
                dickOfTheDay: false,
                ownGoals: 0,
                penaltyMisses: 0,
                penaltySaves: 0,
                name: 'Shaco',
                team: 'Runeterra',
                position: 'ATTACKER'
            },
            {
                goals: 0,
                assists: 0,
                points: 0,
                redCard: false,
                yellowCard: false,
                cleanSheet: false,
                player_id: '2glwlX3EG60kglhUQqzs',
                isCaptain: false,
                manOfTheMatch: false,
                dickOfTheDay: false,
                ownGoals: 0,
                penaltyMisses: 0,
                penaltySaves: 0,
                name: 'Lucian',
                team: 'Runeterra',
                position: 'ATTACKER'
            },
            {
                goals: 1,
                assists: 0,
                points: 10,
                redCard: false,
                yellowCard: false,
                cleanSheet: false,
                player_id: '0F9SXBJBDlDuudHXlHjI',
                isCaptain: true,
                manOfTheMatch: false,
                dickOfTheDay: false,
                ownGoals: 0,
                penaltyMisses: 0,
                penaltySaves: 0,
                name: 'Diana',
                team: 'Targon',
                position: 'MIDFIELDER'
            },
            {
                goals: 0,
                assists: 0,
                points: 0,
                redCard: false,
                yellowCard: false,
                cleanSheet: false,
                player_id: '58odAZp5Pab1mzXLdHyT',
                isCaptain: false,
                manOfTheMatch: false,
                dickOfTheDay: false,
                ownGoals: 0,
                penaltyMisses: 0,
                penaltySaves: 0,
                name: 'Soraka',
                team: 'Targon',
                position: 'DEFENDER'
            },
            {
                goals: 0,
                assists: 0,
                points: 0,
                redCard: false,
                yellowCard: false,
                cleanSheet: false,
                player_id: '66GqV7f1XD96zvecTqht',
                isCaptain: false,
                manOfTheMatch: false,
                dickOfTheDay: false,
                ownGoals: 0,
                penaltyMisses: 0,
                penaltySaves: 0,
                name: 'Kayle',
                team: 'Demacia',
                position: 'DEFENDER'
            },
            {
                goals: 0,
                assists: 0,
                points: 0,
                redCard: false,
                yellowCard: false,
                cleanSheet: false,
                player_id: '576DR6kjJu6gc0WDYawj',
                isCaptain: false,
                manOfTheMatch: false,
                dickOfTheDay: false,
                ownGoals: 0,
                penaltyMisses: 0,
                penaltySaves: 0,
                name: 'Neeko',
                team: 'Ixtal',
                position: 'DEFENDER'
            },
            {
                goals: 0,
                assists: 0,
                points: 0,
                redCard: false,
                yellowCard: false,
                cleanSheet: false,
                player_id: '5LOoI7p7E17emCW481OA',
                isCaptain: false,
                manOfTheMatch: false,
                dickOfTheDay: false,
                ownGoals: 0,
                penaltyMisses: 0,
                penaltySaves: 0,
                name: 'Taric',
                team: 'Targon',
                position: 'DEFENDER'
            },
            {
                goals: 0,
                assists: 0,
                points: 0,
                redCard: false,
                yellowCard: false,
                cleanSheet: false,
                player_id: 'JPoJ0fKriU76VA7uLHo4',
                isCaptain: false,
                manOfTheMatch: false,
                dickOfTheDay: false,
                ownGoals: 0,
                penaltyMisses: 0,
                penaltySaves: 0,
                name: 'Sona',
                team: 'Demacia',
                position: 'DEFENDER'
            },
            {
                goals: 4,
                assists: 3,
                points: 29,
                redCard: false,
                yellowCard: false,
                cleanSheet: false,
                player_id: '8H1GwHMbL9AxYIeWdV8X',
                isCaptain: false,
                manOfTheMatch: false,
                dickOfTheDay: false,
                ownGoals: 0,
                penaltyMisses: 0,
                penaltySaves: 0,
                name: 'Cassiopeia',
                team: 'Noxus',
                position: 'MIDFIELDER'
            },
            {
                goals: 0,
                assists: 0,
                points: 0,
                redCard: false,
                yellowCard: false,
                cleanSheet: false,
                player_id: 'IAqruivPGrK5eQB8IP8h',
                isCaptain: false,
                manOfTheMatch: false,
                dickOfTheDay: false,
                ownGoals: 0,
                penaltyMisses: 0,
                penaltySaves: 0,
                name: 'Blitzcrank',
                team: 'Zaun',
                position: 'GOALKEEPER'
            }
        ];

        const displayName = 'displayName';

        const teamName = 'teamName';

        const wrapper = mount(<UserInfo
            displayName={displayName}
            team={team}
            teamName={teamName}
            photoUrl="photoUrl"
            loggedInTeamName="logged in team name"
        />);

        expect(wrapper.find('.detailWrapper')).toHaveLength(5);
        expect(wrapper.find('.detailWrapper').at(0).find('.key').text()).toBe('User');
        expect(wrapper.find('.detailWrapper').at(0).find('.value').text()).toBe(displayName);
        expect(wrapper.find('.detailWrapper').at(1).find('.customValue').text()).toBe('logged in team name');
        expect(wrapper.find('.detailWrapper').at(2).find('.value').text()).toBe('39');

        expect(wrapper.find('.photoWrapper')).toHaveLength(1);
    });

    it('The UserInfo renders different team name', () => {
        const displayName = 'displayName';

        const teamName = 'teamName';

        const wrapper = mount(<UserInfo
            displayName={displayName}
            team={[]}
            teamName={teamName}
            photoUrl="photoUrl"
            loggedInTeamName="logged in team name"
            userBeingViewed="testing"
            loggedInUser="different"
        />);

        expect(wrapper.find('.detailWrapper')).toHaveLength(5);
        expect(wrapper.find('.detailWrapper').at(0).find('.key').text()).toBe('User');
        expect(wrapper.find('.detailWrapper').at(0).find('.value').text()).toBe(displayName);
        expect(wrapper.find('.detailWrapper').at(1).find('.customValue').text()).toBe(teamName);

        expect(wrapper.find('.photoWrapper')).toHaveLength(1);
    });
});
