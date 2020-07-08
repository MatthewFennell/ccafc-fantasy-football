import {
    all, takeEvery, put, select, call, fork
} from 'redux-saga/effects';
import * as actions from './actions';
import * as selectors from './selectors';
import * as pointsApi from './api';

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
        yield put(actions.fetchUserPointsForWeekError(userId, error));
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
        } else {
            yield put(actions.alreadyFetchedPointsForWeek(action.userId, action.week));
        }
    } catch (error) {
        yield put(actions.fetchUserPointsForWeekError(action.userId, action.week, error));
    }
}

export default function* overviewSaga() {
    yield all([
        takeEvery(actions.FETCH_USER_POINTS_FOR_WEEK_REQUEST, getUserPointsForWeek, pointsApi),
        takeEvery(actions.FETCH_USER_POINTS_FOR_WEEK_REQUEST_BACKGROUND, getUserPointsForWeek,
            pointsApi)
    ]);
}
