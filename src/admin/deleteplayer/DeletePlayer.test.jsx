
import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { noop } from 'lodash';
import { DeletePlayerUnconnected } from './DeletePlayer';
import StyledButton from '../../common/StyledButton/StyledButton';
import styles from './DeletePlayer.module.scss';

configure({ adapter: new Adapter() });

describe('Delete Player', () => {
    it('The Delete Player component renders without crashing', () => {
        const wrapper = shallow(<DeletePlayerUnconnected
            closeDeletePlayerError={noop}
            deletingPlayer={false}
            deletePlayerRequest={noop}
            fetchTeamsRequest={noop}
            fetchPlayersForTeamRequest={noop}
            deletePlayerError=""
            deletePlayerErrorCode=""
            teamsWithPlayers={{}}
        />);
        expect(() => wrapper).not.toThrow();
    });

    it('Rendering Delete Player sends a fetch all teams request', () => {
        const mockFn = jest.fn(noop);

        mount(<DeletePlayerUnconnected
            closeDeletePlayerError={noop}
            deletingPlayer={false}
            deletePlayerRequest={noop}
            fetchPlayersForTeamRequest={noop}
            fetchTeamsRequest={mockFn}
            deletePlayerError=""
            deletePlayerErrorCode=""
            teamsWithPlayers={{}}
        />);
        expect(mockFn.mock.calls.length).toBe(1);
    });

    it('Delete player should have a single Delete Player button', () => {
        const wrapper = shallow(<DeletePlayerUnconnected
            closeDeletePlayerError={noop}
            deletingPlayer={false}
            deletePlayerRequest={noop}
            fetchTeamsRequest={noop}
            fetchPlayersForTeamRequest={noop}
            deletePlayerError=""
            deletePlayerErrorCode=""
            teamsWithPlayers={{}}
        />);
        expect(wrapper.find(StyledButton)).toHaveLength(1);
    });

    it('Clicking Delete Player sends a Delete Player request', () => {
        const mockFn = jest.fn(noop);
        const wrapper = shallow(<DeletePlayerUnconnected
            closeDeletePlayerError={noop}
            deletingPlayer={false}
            deletePlayerRequest={mockFn}
            fetchTeamsRequest={noop}
            fetchPlayersForTeamRequest={noop}
            deletePlayerError=""
            deletePlayerErrorCode=""
            teamsWithPlayers={{}}
        />);
        wrapper.find(StyledButton).simulate('click');
        expect(mockFn.mock.calls.length).toBe(1);
    });

    it('There is a class with hidden only if the player is not being deleted', () => {
        const wrapper = shallow(<DeletePlayerUnconnected
            closeDeletePlayerError={noop}
            deletingPlayer={false}
            deletePlayerRequest={noop}
            fetchTeamsRequest={noop}
            fetchPlayersForTeamRequest={noop}
            deletePlayerError=""
            deletePlayerErrorCode=""
            teamsWithPlayers={{}}
        />);
        expect(wrapper.find({ className: styles.hidden })).toHaveLength(1);
    });

    it('There is not a class with hidden only if the player being deleted', () => {
        const wrapper = shallow(<DeletePlayerUnconnected
            closeDeletePlayerError={noop}
            deletingPlayer
            deletePlayerRequest={noop}
            fetchTeamsRequest={noop}
            fetchPlayersForTeamRequest={noop}
            deletePlayerError=""
            deletePlayerErrorCode=""
            teamsWithPlayers={{}}
        />);
        expect(wrapper.find({ className: styles.hidden })).toHaveLength(0);
    });
});
