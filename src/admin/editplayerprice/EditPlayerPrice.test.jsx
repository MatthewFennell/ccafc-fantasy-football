import { noop } from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { mount, shallow } from '../../enzyme';
import { initialState } from '../reducer';
import EditPlayerPrice, { EditPlayerPriceUnconnected } from './EditPlayerPrice';

describe('Edit Player Price', () => {
    it('The Edit Player Price component renders without crashing', () => {
        const wrapper = shallow(<EditPlayerPriceUnconnected
            teamsWithPlayers={{}}
            fetchPlayersForTeamRequest={noop}
            editPlayerPriceRequest={noop}
            fetchTeamsRequest={noop}
            isEditingPlayerPrice={false}
        />);
        expect(() => wrapper).not.toThrow();
    });
});

describe('Create Team connected', () => {
    it('Connected create team', () => {
        const mockStore = configureMockStore([]);
        const mockStoreInitialized = mockStore({
            admin: initialState
        });

        const wrapper = mount(
            <Provider store={mockStoreInitialized}>
                <EditPlayerPrice
                    editPlayerPriceRequest={noop}
                    fetchPlayersForTeamRequest={noop}
                    teamsWithPlayers={{}}
                    fetchTeamsRequest={noop}
                    isEditingPlayerPrice={false}
                />
            </Provider>
        );

        expect(() => wrapper).not.toThrow();
    });
});
