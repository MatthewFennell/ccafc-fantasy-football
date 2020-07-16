import {
    all, takeEvery, put, select, call, fork
} from 'redux-saga/effects';
import * as actions from './actions';
import * as selectors from './selectors';
import * as pointsApi from './api';
import { setErrorMessage } from '../errorHandling/actions';

export function* getUsername(userId, api) {
    try {
        const alreadyFetched = yield select(selectors.alreadyFetchedUserDetails, userId);
        if (!alreadyFetched) {
            yield put(actions.setUserDetailsFetching(userId, true));
            const userDetails = yield call(api.getUserInfo, ({
                userId
            }));
            yield put(actions.setUserDetails(userId, userDetails));
        }
    } catch (error) {
        yield put(setErrorMessage('Error Fetching User Info', error));
    } finally {
        yield put(actions.cancelFetchingUserDetails(userId));
    }
}

export function* getUserPointsForWeek(api, action) {
    try {
        yield fork(getUsername, action.userId, api);
        const alreadyFetched = yield select(selectors.alreadyFetchedUserPoints,
            action.userId, action.week);
        if (!alreadyFetched) {
            const team = yield call(api.fetchPointsForUserInWeek, ({
                userId: action.userId,
                week: action.week
            }));
            yield put(actions.fetchUserPointsForWeekSuccess(action.userId, action.week, team));
        }
    } catch (error) {
        yield put(setErrorMessage('Error Fetching Points For Week', error));
    } finally {
        yield put(actions.cancelFetchingUserPointsForWeek(action.userId, action.week));
    }
}

export default function* overviewSaga() {
    yield all([
        takeEvery(actions.FETCH_USER_POINTS_FOR_WEEK_REQUEST, getUserPointsForWeek, pointsApi),
        takeEvery(actions.FETCH_USER_POINTS_FOR_WEEK_REQUEST_BACKGROUND, getUserPointsForWeek,
            pointsApi)
    ]);
}
