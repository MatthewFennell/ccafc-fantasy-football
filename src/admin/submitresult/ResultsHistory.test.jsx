import React from 'react';
import { shallow } from '../../enzyme';
import ResultsHistory from './ResultsHistory';
import Update from './Update';

describe('Results history', () => {
    const resultsHistory = [
        {
            author: {
                displayName: 'Pampy',
                email: 'test@test.com',
                uid: 'dddopqlanTKfmlael'
            },
            date: {
                seconds: 1603735852,
                nanoseconds: 250000000
            },
            ownGoal: {
                id: 'Xrj6M7Nc3gGjeRjdXxAd',
                name: 'Ben Chilwell'
            },
            penaltyMissed: {
                id: 'Xrj6M7Nc3gGjeRjdXxAd',
                name: 'Ben Chilwell'
            },
            penaltySaved: {
                id: 'Xrj6M7Nc3gGjeRjdXxAd',
                name: 'Ben Chilwell'
            },
            redCard: {
                id: 'Xrj6M7Nc3gGjeRjdXxAd',
                name: 'Ben Chilwell'
            },
            type: 'EXTRA_STATS',
            week: 4,
            yellowCard: {
                id: 'Xrj6M7Nc3gGjeRjdXxAd',
                name: 'Ben Chilwell'
            }
        },
        {
            assists: [
                {
                    amount: 1,
                    id: 'A0xmrjitEeEC1PLeWS2Q',
                    name: 'Lionel Messi'
                }
            ],
            author: {
                displayName: 'Pampy',
                email: 'test@test.com',
                uid: 'dddopqlanTKfmlael'
            },
            cleanSheets: [],
            date: {
                seconds: 1603735798,
                nanoseconds: 644000000
            },
            dickOfTheDay: {
                id: 'A0xmrjitEeEC1PLeWS2Q',
                name: 'Lionel Messi'
            },
            goals: [
                {
                    amount: 2,
                    id: '5nqV1SI4CGoKFm1gGBAd',
                    name: 'Kevin De Bruyne'
                }
            ],
            manOfTheMatch: {
                id: '5nqV1SI4CGoKFm1gGBAd',
                name: 'Kevin De Bruyne'
            },
            teamId: 'ALOi0MynFl1Ieq2hnO1E',
            teamName: 'L Team',
            type: 'STANDARD_RESULT',
            week: 4
        },
        {
            author: {
                displayName: 'Pampy',
                email: 'test@test.com',
                uid: 'dddopqlanTKfmlael'
            },
            date: {
                seconds: 1603735745,
                nanoseconds: 211000000
            },
            name: 'Kevin De Bruyne',
            oldStats: {
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
            },
            type: 'EDIT_STATS',
            update: {
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
            },
            week: 4
        },
        {
            author: {
                displayName: 'Pampy',
                email: 'test@test.com',
                uid: 'dddopqlanTKfmlael'
            },
            date: {
                seconds: 1603735698,
                nanoseconds: 297000000
            },
            type: 'TRIGGER_WEEK',
            week: 4
        }
    ];

    it('The subs history component renders without crashing', () => {
        const wrapper = shallow(<ResultsHistory resultsHistory={resultsHistory} />);
        expect(() => wrapper).not.toThrow();
    });

    it('The subs history renders no update if there is no update history', () => {
        const wrapper = shallow(<ResultsHistory resultsHistory={[]} />);
        expect(wrapper.find('.noUpdates').text()).toBe('No updates have been made yet');
    });

    it('Renders an update component for each history ', () => {
        const wrapper = shallow(<ResultsHistory resultsHistory={resultsHistory} />);
        expect(wrapper.find(Update)).toHaveLength(4);
        expect(wrapper.find('.noUpdates')).toHaveLength(0);
    });
});
