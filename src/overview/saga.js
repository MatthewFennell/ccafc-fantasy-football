import {
    all, takeEvery, put, select, call
} from 'redux-saga/effects';
import * as actions from './actions';
import * as selectors from './selectors';
import * as api from './api';

function* getInitialUserInfo() {
    try {
        const alreadyFetched = yield select(selectors.getFetchedInitialUserInfo);
        if (!alreadyFetched) {
            const result = yield call(api.getUserInfo);
            yield put(actions.fetchInitialUserWeekInfoSuccess(result));
        } else {
            yield put(actions.alreadyFetchedUserInfo());
        }
    } catch (error) {
        yield put(actions.fetchInitialUserWeekInfoError(error));
    }
}

function* getUserInfoForWeek(action) {
    try {
        const alreadyFetched = yield select(selectors.getAlreadyFetchedForWeek, action.week);
        if (!alreadyFetched) {
            const result = yield call(api.getUserInfoForWeek, { week: action.week });
            yield put(actions.fetchUserInfoForWeekSuccess(action.week, result));
        } else {
            yield put(actions.changeActiveGameWeek(action.week));
        }
    } catch (error) {
        yield put(actions.fetchUserInfoForWeekError(error));
    }
}

function* getUserStats() {
    try {
        const fetchedStats = yield select(selectors.getFetchedUserStats);
        if (!fetchedStats) {
            const stats = yield call(api.getUserStats);
            yield put(actions.fetchUserStatsSuccess(stats));
        }
    } catch (error) {
        yield put(actions.fetchUserStatsError(error));
    }
}

export default function* overviewSaga() {
    yield all([
        takeEvery(actions.FETCH_INITIAL_USER_WEEK_INFO_REQUEST, getInitialUserInfo),
        takeEvery(actions.FETCH_USER_INFO_FOR_WEEK_REQUEST, getUserInfoForWeek),
        takeEvery(actions.FETCH_USER_STATS_REQUEST, getUserStats)
    ]);
}
