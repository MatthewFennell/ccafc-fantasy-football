import React from 'react';
import { noop } from 'lodash';
import { shallow } from '../../enzyme';
import { SubmitResultUnconnected } from './SubmitResult';

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
