import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { setErrorMessage } from '../modalHandling/actions';
import * as actions from './actions';
import * as sagas from './saga';
import * as selectors from './selectors';

// https://github.com/jfairbank/redux-saga-test-plan - Docs

const api = {
    fetchPointsForUserInWeek: () => 'team',
    getUserInfo: () => 'details'
};

describe('Points saga', () => {
    const alreadyFetchedData = fetched => ({ selector }, next) => {
        if (selector === selectors.alreadyFetchedUserDetails) {
            return fetched;
        }
        if (selector === selectors.alreadyFetchedUserPoints) {
            return fetched;
        }
        return next();
    };

    it('get username', () => expectSaga(sagas.getUsername, 'userId', api)
        .provide([
            {
                select: alreadyFetchedData(false)
            }
        ])
        .put(actions.setUserDetailsFetching('userId', true))
        .call(api.getUserInfo, ({
            userId: 'userId'
        }))
        .put(actions.setUserDetails('userId', 'details'))
        .put(actions.cancelFetchingUserDetails('userId'))
        .run({ silenceTimeout: true }));

    it('getting username error', () => {
        const error = new Error('error');
        return expectSaga(sagas.getUsername, 'userId', api)
            .provide([
                [matchers.call.fn(api.getUserInfo), throwError(error)],
                { select: alreadyFetchedData(false) }
            ])
            .put(actions.setUserDetailsFetching('userId', true))
            .put(setErrorMessage('Error Fetching User Info', error))
            .put(actions.cancelFetchingUserDetails('userId'))
            .run({ silenceTimeout: true });
    });

    it('already fetched username', () => expectSaga(sagas.getUsername, 'userId', api)
        .provide([
            {
                select: alreadyFetchedData(true)
            }
        ])
        .not.call(api.getUserInfo, ({
            userId: 'userId'
        }))
        .not.put(actions.setUserDetails('userId', 'details'))
        .put(actions.cancelFetchingUserDetails('userId'))
        .run({ silenceTimeout: true }));

    it('getting user points', () => {
        const action = actions.fetchUserPointsForWeekRequest('userId', 3);
        return expectSaga(sagas.getUserPointsForWeek, api, action)
            .provide([
                {
                    select: alreadyFetchedData(false)
                }
            ])
            .fork(sagas.getUsername, 'userId', api)
            .put(actions.fetchUserPointsForWeekSuccess('userId', 3, 'team'))
            .call(api.fetchPointsForUserInWeek, ({
                userId: 'userId',
                week: 3
            }))
            .put(actions.cancelFetchingUserPointsForWeek('userId', 3))
            .run({ silenceTimeout: true });
    });

    it('getting user points error', () => {
        const error = new Error('error');
        const action = actions.fetchUserPointsForWeekRequest('userId', 3);
        return expectSaga(sagas.getUserPointsForWeek, api, action)
            .provide([
                [matchers.call.fn(api.fetchPointsForUserInWeek), throwError(error)],
                { select: alreadyFetchedData(false) }
            ])
            .put(setErrorMessage('Error Fetching Points For Week', error))
            .put(actions.cancelFetchingUserPointsForWeek('userId', 3))
            .run({ silenceTimeout: true });
    });
});
