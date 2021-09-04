import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { setErrorMessage } from '../modalHandling/actions';
import * as actions from './actions';
import * as sagas from './saga';

// https://github.com/jfairbank/redux-saga-test-plan - Docs

const api = {
    getTeamStatsByWeek: id => ({
        id: id.teamId,
        minWeek: id.minWeek,
        maxWeek: id.maxWeek
    })
};

describe('Stats saga', () => {
    it('fetch stats success', () => {
        const action = actions.fetchTeamStatsByWeekRequest('teamId', 3, 7);
        return expectSaga(sagas.fetchStats, api, action)
            .call(api.getTeamStatsByWeek, ({
                teamId: 'teamId',
                minWeek: 3,
                maxWeek: 7
            }))
            .put(actions.fetchTeamStatsByWeekSuccess('teamId', 3, 7, {
                id: 'teamId',
                minWeek: 3,
                maxWeek: 7
            }))
            .put(actions.cancelFetchingTeamStatsByWeek('teamId'))
            .run({ silenceTimeout: true });
    });

    it('fetch stats error', () => {
        const error = new Error('error');
        const action = actions.fetchTeamStatsByWeekRequest('teamId', 3, 7);
        return expectSaga(sagas.fetchStats, api, action)
            .provide([
                [matchers.call.fn(api.getTeamStatsByWeek), throwError(error)]
            ])
            .put(setErrorMessage('Error Fetching Team Stats For Week', error))
            .put(actions.cancelFetchingTeamStatsByWeek('teamId'))
            .run({ silenceTimeout: true });
    });
});
