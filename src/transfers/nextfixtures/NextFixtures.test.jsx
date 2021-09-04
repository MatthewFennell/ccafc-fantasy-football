import React from 'react';
import Spinner from '../../common/spinner/Spinner';
import { mount, shallow } from '../../enzyme';
import MatchRow from './MatchRow';
import NextFixtures from './NextFixtures';

describe('NextFixtures - NextFixtures', () => {
    beforeEach(() => {
        process.env.REACT_APP_COLLEGE_NAME = 'Collingwood';
        process.env.REACT_APP_COLLEGE_ACRONYM = 'CCAFC';
    });

    afterEach(() => {
        delete process.env.REACT_APP_COLLEGE_NAME;
        delete process.env.REACT_APP_COLLEGE_ACRONYM;
    });

    // Only 2 Collingwood teams
    const fixtures = [
        {
            teamOne: 'Collingwood D',
            result: '1 - 2',
            teamTwo: 'St. Aidan\'s A',
            location: 'Rubber Crumb 1 (Old)',
            time: '12/10/3019 10:45',
            completed: true,
            league: 'Premiership',
            isCup: false
        },
        {
            teamOne: 'St. Cuthbert\'s',
            result: '1 - 8',
            teamTwo: 'Grey A',
            location: 'Rubber Crumb 3 (Track)',
            time: '12/10/3019 15:00',
            completed: true,
            league: 'Premiership',
            isCup: true
        },
        {
            teamOne: 'St. Hild & St. Bede',
            result: '0 - 5',
            teamTwo: 'Collingwood A',
            location: 'Rubber Crumb 1 (Old)',
            time: '12/10/3019 16:45',
            completed: true,
            league: 'Premiership',
            isCup: false
        }
    ];

    it('The NextFixtures component renders without crashing', () => {
        const wrapper = shallow(<NextFixtures fixtures={fixtures} />);
        expect(() => wrapper).not.toThrow();
    });

    it('The NextFixtures component renders a spinner', () => {
        const wrapper = mount(<NextFixtures loadingFixtures />);
        expect(wrapper.find(Spinner)).toHaveLength(2);
    });

    it('The NextFixtures component renders Match Rows', () => {
        const wrapper = mount(<NextFixtures fixtures={fixtures} />);
        expect(wrapper.find(MatchRow)).toHaveLength(2);
    });
});
