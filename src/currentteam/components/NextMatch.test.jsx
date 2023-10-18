import React from 'react';
import Spinner from '../../common/spinner/Spinner';
import { mount, shallow } from '../../enzyme';
import NextMatch from './NextMatch';

describe('Current Team Components - Next Fixtures', () => {
    beforeEach(() => {
        process.env.REACT_APP_COLLEGE_NAME = 'Collingwood';
        process.env.REACT_APP_COLLEGE_ACRONYM = 'CCAFC';
    });

    afterEach(() => {
        delete process.env.REACT_APP_COLLEGE_NAME;
        delete process.env.REACT_APP_COLLEGE_ACRONYM;
    });
    const fixtures = [
        {
            teamOne: 'Collingwood D',
            result: '1 - 2',
            teamTwo: 'St. Aidan\'s A',
            location: 'Rubber Crumb 1 (Old)',
            time: '3019-10-22 10:45AM',
            completed: true,
            league: 'Premiership',
            isCup: false
        },
        {
            teamOne: 'St. Cuthbert\'s',
            result: '1 - 8',
            teamTwo: 'Grey A',
            location: 'Rubber Crumb 3 (Track)',
            time: '3019-10-22 03:00PM',
            completed: true,
            league: 'Premiership',
            isCup: true
        },
        {
            teamOne: 'St. Hild & St. Bede',
            result: '0 - 5',
            teamTwo: 'Collingwood A',
            location: 'Rubber Crumb 1 (Old)',
            time: '3019-10-22 16:45PM',
            completed: true,
            league: 'Premiership',
            isCup: false
        }
    ];

    const players = [
        {
            name: 'name',
            team: 'Collingwood A',
            id: 'id 1'
        }, {
            name: 'new name',
            team: 'Collingwood D',
            id: 'id 2'
        }, {
            name: 'no team for this guy',
            team: 'blah team not exist',
            id: 'id 3'
        }
    ];

    it('The NextFixtures component renders without crashing', () => {
        const wrapper = shallow(<NextMatch />);
        expect(() => wrapper).not.toThrow();
    });

    it('The NextFixtures component renders with fixtures', () => {
        const wrapper = mount(<NextMatch fixtures={fixtures} players={players} />);
        expect(wrapper.find('.rowWrapper')).toHaveLength(3);
        expect(wrapper.find('.rowWrapper').at(0).find('.name').text()).toBe('name');
        expect(wrapper.find('.rowWrapper').at(0).find('.team').text()).toBe('St. Hild & St. Bede');

        expect(wrapper.find('.rowWrapper').at(1).find('.name').text()).toBe('new name');
        expect(wrapper.find('.rowWrapper').at(1).find('.team').text()).toBe('St. Aidan\'s A');

        expect(wrapper.find('.rowWrapper').at(2).find('.name').text()).toBe('no team for this guy');
        expect(wrapper.find('.rowWrapper').at(2).find('.team').text()).toBe('No match');
    });

    it('The NextFixtures component renders with loading', () => {
        const wrapper = mount(<NextMatch fixtures={fixtures} players={players} loadingFixtures />);
        expect(wrapper.find(Spinner)).toHaveLength(3);
    });
});
