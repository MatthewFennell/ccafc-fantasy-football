
import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { noop } from 'lodash';
import { EditPlayerUnconnected } from './EditPlayer';

configure({ adapter: new Adapter() });

describe('Edit Player', () => {
    it('The Edit Player component renders with crashing', () => {
        const wrapper = shallow(<EditPlayerUnconnected
            editPlayerStatsRequest={noop}
            fetchPlayerStatsRequest={noop}
            fetchPlayersForTeamRequest={noop}
            fetchTeamsRequest={noop}
            allTeams={[]}
            fetchingPlayerStats={false}
            maxGameWeek={0}
            playerStats={{}}
            teamsWithPlayers={{}}
            history={{ push: noop }}
        />);
        expect(() => wrapper).not.toThrow();
    });

    it('Loading Edit Player sends a fetch teams request', () => {
        const mockFn = jest.fn(noop);
        mount(<EditPlayerUnconnected
            editPlayerStatsRequest={noop}
            fetchPlayerStatsRequest={noop}
            fetchPlayersForTeamRequest={noop}
            fetchTeamsRequest={mockFn}
            allTeams={[]}
            fetchingPlayerStats={false}
            maxGameWeek={0}
            playerStats={{}}
            teamsWithPlayers={{}}
            history={{ push: noop }}
        />);
        expect(mockFn.mock.calls.length).toBe(1);
    });
});
