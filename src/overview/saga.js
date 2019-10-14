import {
    all, takeEvery, put, select, call
} from 'redux-saga/effects';
import * as actions from './actions';
import * as selectors from './selectors';
import * as api from './api';

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

function* getMaxGameWeek() {
    try {
        const maxGameWeek = yield call(api.getMaxGameWeek);
        yield put(actions.fetchMaxGameWeekSuccess(maxGameWeek));
    } catch (error) {
        yield put(actions.fetchMaxGameWeekError(error));
    }
}

function* getUserInfoForWeek(action) {
    try {
        const alreadyFetched = yield select(selectors.alreadyFetchedUserInfo,
            action.userId, action.week);
        if (!alreadyFetched) {
            const userInfo = yield call(api.getUserInfoForWeek, ({
                userId: action.userId,
                week: action.week
            }));
            yield put(actions.fetchUserInfoForWeekSuccess(action.userId, action.week, userInfo));
        } else {
            yield put(actions.alreadyFetchedUserInfoForWeek(action.userId, action.week));
        }
    } catch (error) {
        yield put(actions.fetchUserInfoForWeekError(action.userId, action.week, error));
    }
}

export default function* overviewSaga() {
    yield all([
        takeEvery(actions.FETCH_USER_STATS_REQUEST, getUserStats),
        takeEvery(actions.FETCH_MAX_GAMEWEEK_REQUEST, getMaxGameWeek),
        takeEvery(actions.FETCH_USER_INFO_FOR_WEEK_REQUEST, getUserInfoForWeek),
        takeEvery(actions.FETCH_USER_INFO_FOR_WEEK_REQUEST_BACKGROUND, getUserInfoForWeek)
    ]);
}
