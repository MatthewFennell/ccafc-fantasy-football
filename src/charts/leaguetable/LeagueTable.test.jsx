
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LeagueTable from './LeagueTable';

configure({ adapter: new Adapter() });

describe('Charts - LeagueTable', () => {
    it('The LeagueTable component renders without crashing', () => {
        const wrapper = shallow(<LeagueTable />);
        expect(() => wrapper).not.toThrow();
    });
});
