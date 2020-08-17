import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import * as sagas from './saga';
import * as actions from './actions';
import * as selectors from './selectors';
import { setErrorMessage } from '../modalHandling/actions';

// https://github.com/jfairbank/redux-saga-test-plan - Docs

const api = {
    getUserStats: () => 'stats',
    getMaxGameWeek: () => 5,
    getUserInfoForWeek: () => 'userInfo'
};

describe('Overview saga', () => {
    const alreadyFetchedUserStatsOrInfo = fetched => ({ selector }, next) => {
        if (selector === selectors.alreadyFetchedUserStats) {
            return fetched;
        }
        if (selector === selectors.alreadyFetchedUserInfo) {
            return fetched;
        }
        return next();
    };

    it('getting user stats', () => {
        const action = actions.fetchUserStatsRequest('userId');
        return expectSaga(sagas.getUserStats, api, action)
            .provide([
                {
                    select: alreadyFetchedUserStatsOrInfo(false)
                }
            ])
            .call(api.getUserStats, ({
                userId: 'userId'
            }))
            .put(actions.fetchUserStatsSuccess('userId', 'stats'))
            .put(actions.cancelFetchingUserStats(action.userId))
            .run({ silenceTimeout: true });
    });

    it('getting user stats error', () => {
        const error = new Error('error');
        const action = actions.fetchUserStatsRequest('userId', 3);
        return expectSaga(sagas.getUserStats, api, action)
            .provide([
                [matchers.call.fn(api.getUserStats), throwError(error)],
                { select: alreadyFetchedUserStatsOrInfo(false) }
            ])
            .put(setErrorMessage('Error Fetching User Stats', error))
            .put(actions.cancelFetchingUserStats(action.userId))
            .run({ silenceTimeout: true });
    });

    it('get max gameweek', () => {
        const action = actions.fetchMaxGameWeekRequest();
        return expectSaga(sagas.getMaxGameWeek, api, action)
            .put(actions.fetchMaxGameWeekSuccess(5))
            .run({ silenceTimeout: true });
    });

    it('get max gameweek error', () => {
        const error = new Error('error');
        const action = actions.fetchMaxGameWeekRequest();
        return expectSaga(sagas.getMaxGameWeek, api, action)
            .provide([
                [matchers.call.fn(api.getMaxGameWeek), throwError(error)]
            ])
            .put(setErrorMessage('Error Fetching Gameweek', error))
            .run({ silenceTimeout: true });
    });

    it('getting user info', () => {
        const action = actions.fetchUserInfoForWeekRequest('userId', 3);
        return expectSaga(sagas.getUserInfoForWeek, api, action)
            .provide([
                {
                    select: alreadyFetchedUserStatsOrInfo(false)
                }
            ])
            .call(api.getUserInfoForWeek, ({
                userId: 'userId',
                week: 3
            }))
            .put(actions.fetchUserInfoForWeekSuccess('userId', 3, 'userInfo'))
            .put(actions.cancelFetchingUserInfoForWeek('userId', 3))
            .run({ silenceTimeout: true });
    });

    it('getting user info error', () => {
        const error = new Error('error');
        const action = actions.fetchUserInfoForWeekRequest('userId', 3);
        return expectSaga(sagas.getUserInfoForWeek, api, action)
            .provide([
                [matchers.call.fn(api.getUserInfoForWeek), throwError(error)],
                { select: alreadyFetchedUserStatsOrInfo(false) }
            ])
            .put(setErrorMessage('Error Fetching User Info for Week', error))
            .put(actions.cancelFetchingUserInfoForWeek('userId', 3))
            .run({ silenceTimeout: true });
    });
});
