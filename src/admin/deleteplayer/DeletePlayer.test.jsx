import { noop } from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import StyledButton from '../../common/StyledButton/StyledButton';
import { mount, shallow } from '../../enzyme';
import { initialState } from '../reducer';
import DeletePlayer, { DeletePlayerUnconnected } from './DeletePlayer';

describe('Delete Player', () => {
    it('The Delete Player component renders without crashing', () => {
        const wrapper = shallow(<DeletePlayerUnconnected
            closeSuccessMessage={noop}
            closeAdminError={noop}
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
            closeSuccessMessage={noop}
            closeAdminError={noop}
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
            closeSuccessMessage={noop}
            closeAdminError={noop}
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
            closeSuccessMessage={noop}
            closeAdminError={noop}
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
});

describe('Delete Player connected', () => {
    it('Connected delete player', () => {
        const mockStore = configureMockStore([]);
        const mockStoreInitialized = mockStore({
            admin: initialState
        });

        const wrapper = mount(
            <Provider store={mockStoreInitialized}>
                <DeletePlayer />
            </Provider>
        );

        expect(() => wrapper).not.toThrow();
    });
});
