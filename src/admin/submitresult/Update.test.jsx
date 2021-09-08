import React from 'react';
import * as appConstants from '../../constants';
import { shallow } from '../../enzyme';
import Update from './Update';

describe('Results update', () => {
    const author = {
        displayName: 'The Display Name',
        email: 'test@test.com',
        uid: 'uid'
    };

    const date = {
        seconds: 1603635184,
        nanoseconds: 903000000
    };

    const goals = [
        {
            amount: 2,
            id: 'alopwmrnAk',
            name: 'Kevin De Bruyne'
        },
        {
            amount: 5,
            id: 'aprlgnsaMerj',
            name: 'Lionel Messi'
        }
    ];

    const assists = [
        {
            amount: 2,
            id: 'alopwmrnAk',
            name: 'Kevin De Bruyne'
        },
        {
            amount: 5,
            id: 'aprlgnsaMerj',
            name: 'Lionel Messi'
        }
    ];

    const cleanSheets = [
        {
            id: 'alopwmrnAk',
            name: 'Kevin De Bruyne'
        },
        {
            id: 'aprlgnsaMerj',
            name: 'Lionel Messi'
        }
    ];

    const oldStats = {
        assists: 0,
        cleanSheet: false,
        dickOfTheDay: false,
        goals: 0,
        manOfTheMatch: false,
        ownGoals: 0,
        penaltyMisses: 0,
        penaltySaves: 0,
        redCard: false,
        yellowCard: false
    };

    const update = {
        assists: 4,
        cleanSheet: true,
        dickOfTheDay: true,
        goals: 3,
        manOfTheMatch: true,
        ownGoals: 3,
        penaltyMisses: 6,
        penaltySaves: 5,
        redCard: true,
        yellowCard: true
    };

    const teamName = 'team name';

    it('The update component renders without crashing', () => {
        const wrapper = shallow(<Update />);
        expect(() => wrapper).not.toThrow();
    });

    it('The update component renders the trigger week', () => {
        const wrapper = shallow(<Update
            author={author}
            date={date}
            type={appConstants.resultHistoryTypes.TRIGGER_WEEK}
            week={3}
        />);
        expect(() => wrapper).not.toThrow();
        expect(wrapper.find('.triggerWeekHeader').text()).toBe('Trigger Week 3');
        expect(wrapper.find('.authorDate').text()).toBe('Oct 25th 2020, 2:13:04 pm');
        expect(wrapper.find('.authorDisplayName').text()).toBe('The Display Name');
        expect(wrapper.find('.authorEmail').text()).toBe('test@test.com');
    });

    it('The update component renders the standard result', () => {
        const wrapper = shallow(<Update
            assists={assists}
            author={author}
            cleanSheets={cleanSheets}
            date={date}
            dickOfTheDay={{
                id: 'gspgdsgsdggds',
                name: 'Some name'
            }}
            goals={goals}
            teamName={teamName}
            type={appConstants.resultHistoryTypes.STANDARD_RESULT}
            week={3}
        />);
        expect(() => wrapper).not.toThrow();
        expect(wrapper.find('.standardResultHeader').text()).toBe('Standard Result - Week 3 - team name');
        expect(wrapper.find('.dotdTitle').text()).toBe('Dick of the Day:');
        expect(wrapper.find('.dotdValue').text()).toBe('Some name');
        expect(wrapper.find('.motmTitle')).toHaveLength(0);
        expect(wrapper.find('.motmValue')).toHaveLength(0);
        expect(wrapper.find('.goalName')).toHaveLength(2);
        expect(wrapper.find('.assistName')).toHaveLength(2);
        expect(wrapper.find('.cleanSheetName')).toHaveLength(2);
    });

    it('The update component renders the edit stats', () => {
        const wrapper = shallow(<Update
            author={author}
            date={date}
            name="De Bruyne"
            oldStats={oldStats}
            update={update}
            type={appConstants.resultHistoryTypes.EDIT_STATS}
            week={3}
        />);
        expect(() => wrapper).not.toThrow();
        expect(wrapper.find('.editStatsHeader').text()).toBe('Editing Stats - Week 3 - De Bruyne');
        expect(wrapper.find('.statTitle').at(0).text()).toBe('Goals:');
        expect(wrapper.find('.statTitle').at(1).text()).toBe('Assists:');
        expect(wrapper.find('.statTitle').at(2).text()).toBe('Clean Sheet:');
        expect(wrapper.find('.statTitle').at(3).text()).toBe('Man of the Match:');
        expect(wrapper.find('.statTitle').at(4).text()).toBe('Dick of the Day:');
        expect(wrapper.find('.statTitle').at(5).text()).toBe('Yellow Card:');
        expect(wrapper.find('.statTitle').at(6).text()).toBe('Red Card:');
        expect(wrapper.find('.statTitle').at(7).text()).toBe('Penalty Misses:');
        expect(wrapper.find('.statTitle').at(8).text()).toBe('Penalty Saves:');
        expect(wrapper.find('.statTitle').at(9).text()).toBe('Own Goals:');

        expect(wrapper.find('.statValue').at(0).text()).toBe('0');
        expect(wrapper.find('.statValue').at(1).text()).toBe('0');
        expect(wrapper.find('.statValue').at(2).text()).toBe('false');
        expect(wrapper.find('.statValue').at(3).text()).toBe('false');
        expect(wrapper.find('.statValue').at(4).text()).toBe('false');
        expect(wrapper.find('.statValue').at(5).text()).toBe('false');
        expect(wrapper.find('.statValue').at(6).text()).toBe('false');
        expect(wrapper.find('.statValue').at(7).text()).toBe('0');
        expect(wrapper.find('.statValue').at(8).text()).toBe('0');
        expect(wrapper.find('.statValue').at(9).text()).toBe('0');

        expect(wrapper.find('.statTitle').at(10).text()).toBe('Goals:');
        expect(wrapper.find('.statTitle').at(11).text()).toBe('Assists:');
        expect(wrapper.find('.statTitle').at(12).text()).toBe('Clean Sheet:');
        expect(wrapper.find('.statTitle').at(13).text()).toBe('Man of the Match:');
        expect(wrapper.find('.statTitle').at(14).text()).toBe('Dick of the Day:');
        expect(wrapper.find('.statTitle').at(15).text()).toBe('Yellow Card:');
        expect(wrapper.find('.statTitle').at(16).text()).toBe('Red Card:');
        expect(wrapper.find('.statTitle').at(17).text()).toBe('Penalty Misses:');
        expect(wrapper.find('.statTitle').at(18).text()).toBe('Penalty Saves:');
        expect(wrapper.find('.statTitle').at(19).text()).toBe('Own Goals:');

        expect(wrapper.find('.statValue').at(10).text()).toBe('3');
        expect(wrapper.find('.statValue').at(11).text()).toBe('4');
        expect(wrapper.find('.statValue').at(12).text()).toBe('true');
        expect(wrapper.find('.statValue').at(13).text()).toBe('true');
        expect(wrapper.find('.statValue').at(14).text()).toBe('true');
        expect(wrapper.find('.statValue').at(15).text()).toBe('true');
        expect(wrapper.find('.statValue').at(16).text()).toBe('true');
        expect(wrapper.find('.statValue').at(17).text()).toBe('6');
        expect(wrapper.find('.statValue').at(18).text()).toBe('5');
        expect(wrapper.find('.statValue').at(19).text()).toBe('3');
    });

    it('The update component renders the edit stats and only shows the changes', () => {
        const wrapper = shallow(<Update
            author={author}
            date={date}
            name="De Bruyne"
            oldStats={oldStats}
            update={{
                goals: 3
            }}
            type={appConstants.resultHistoryTypes.EDIT_STATS}
            week={3}
        />);
        expect(() => wrapper).not.toThrow();
        expect(wrapper.find('.editStatsHeader').text()).toBe('Editing Stats - Week 3 - De Bruyne');

        expect(wrapper.find('.statTitle').at(0).text()).toBe('Goals:');
        expect(wrapper.find('.statValue').at(0).text()).toBe('0');

        expect(wrapper.find('.statTitle').at(1).text()).toBe('Goals:');
        expect(wrapper.find('.statValue').at(1).text()).toBe('3');

        expect(wrapper.find('.statTitle')).toHaveLength(2);
        expect(wrapper.find('.statValue')).toHaveLength(2);
    });

    it('The update component renders the add extra stats', () => {
        const playerInfo = {
            id: 'Xrj6M7Nc3gGjeRjdXxAd',
            name: 'Ben Chilwell'
        };

        const wrapper = shallow(<Update
            author={author}
            date={date}
            ownGoal={playerInfo}
            penaltyMissed={playerInfo}
            penaltySaved={playerInfo}
            redCard={playerInfo}
            yellowCard={playerInfo}
            type={appConstants.resultHistoryTypes.EXTRA_STATS}
            week={3}
        />);
        expect(() => wrapper).not.toThrow();
        expect(wrapper.find('.extraStatsHeader').text()).toBe('Extra Stats - Week 3');
        expect(wrapper.find('.statTitle').at(0).text()).toBe('Own Goal:');
        expect(wrapper.find('.statTitle').at(1).text()).toBe('Yellow Card:');
        expect(wrapper.find('.statTitle').at(2).text()).toBe('Red Card:');
        expect(wrapper.find('.statTitle').at(3).text()).toBe('Penalties Missed:');
        expect(wrapper.find('.statTitle').at(4).text()).toBe('Penalties Saved:');

        expect(wrapper.find('.statValue').at(0).text()).toBe('Ben Chilwell');
        expect(wrapper.find('.statValue').at(1).text()).toBe('Ben Chilwell');
        expect(wrapper.find('.statValue').at(2).text()).toBe('Ben Chilwell');
        expect(wrapper.find('.statValue').at(3).text()).toBe('Ben Chilwell');
        expect(wrapper.find('.statValue').at(4).text()).toBe('Ben Chilwell');
    });

    it('The update component renders the add extra stats only the relevant bits', () => {
        const playerInfo = {
            id: 'Xrj6M7Nc3gGjeRjdXxAd',
            name: 'Ben Chilwell'
        };

        const wrapper = shallow(<Update
            author={author}
            date={date}
            ownGoal={playerInfo}
            type={appConstants.resultHistoryTypes.EXTRA_STATS}
            week={3}
        />);
        expect(() => wrapper).not.toThrow();
        expect(wrapper.find('.extraStatsHeader').text()).toBe('Extra Stats - Week 3');
        expect(wrapper.find('.statTitle').at(0).text()).toBe('Own Goal:');
        expect(wrapper.find('.statValue').at(0).text()).toBe('Ben Chilwell');

        expect(wrapper.find('.statTitle')).toHaveLength(1);
        expect(wrapper.find('.statValue')).toHaveLength(1);
    });
});
