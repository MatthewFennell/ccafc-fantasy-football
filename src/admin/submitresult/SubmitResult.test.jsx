
import React from 'react';
import { noop } from 'lodash';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { shallow, mount } from '../../enzyme';
import SubmitResult, { SubmitResultUnconnected } from './SubmitResult';
import { initState } from '../reducer';
import { initialState as overviewInitState } from '../../overview/reducer';

describe('Submit Result', () => {
    it('The Submit Result component renders without crashing', () => {
        const wrapper = shallow(<SubmitResultUnconnected
            closeSuccessMessage={noop}
            closeAdminError={noop}
            teamsWithPlayers={{}}
            submittingExtraResult={false}
            submitExtraStatsRequest={noop}
            submittingResult={false}
            submitResultRequest={noop}
            fetchPlayersForTeamRequest={noop}
            fetchTeamsRequest={noop}
        />);
        expect(() => wrapper).not.toThrow();
    });
});

describe('Submit Result connected', () => {
    const mockStore = configureMockStore([]);
    const mockStoreInitialized = mockStore({
        admin: initState,
        overview: overviewInitState
    });

    const wrapper = mount( // enzyme
        <Provider store={mockStoreInitialized}>
            <SubmitResult />
        </Provider>
    );

    expect(() => wrapper).not.toThrow();
});
