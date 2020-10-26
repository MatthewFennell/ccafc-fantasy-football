import React from 'react';
import { noop } from 'lodash';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { shallow, mount } from '../../enzyme';
import SubmitResult, { SubmitResultUnconnected } from './SubmitResult';
import { initialState } from '../reducer';
import { initialState as overviewinitialState } from '../../overview/reducer';

describe('Submit Result', () => {
    it('The Submit Result component renders without crashing', () => {
        const wrapper = shallow(<SubmitResultUnconnected
            closeSuccessMessage={noop}
            closeAdminError={noop}
            teamsWithPlayers={{}}
            submittingExtraResult={false}
            fetchMaxGameWeekRequest={noop}
            submitExtraStatsRequest={noop}
            submittingResult={false}
            submitResultRequest={noop}
            fetchPlayersForTeamRequest={noop}
            fetchTeamsRequest={noop}
            submitCustumResults={noop}
        />);
        expect(() => wrapper).not.toThrow();
    });
});
