import {
    all, takeEvery, put, select, call
} from 'redux-saga/effects';
import * as actions from './actions';
import * as selectors from './selectors';
import * as overviewApi from './api';
import { setErrorMessage } from '../modalHandling/actions';

export function* getUserStats(api, action) {
    try {
        const fetchedStats = yield select(selectors.alreadyFetchedUserStats, action.userId);

        if (!fetchedStats) {
            const stats = yield call(api.getUserStats, {
                userId: action.userId
            });
            yield put(actions.fetchUserStatsSuccess(action.userId, stats));
        }
    } catch (error) {
        yield put(setErrorMessage('Error Fetching User Stats', error));
    } finally {
        yield put(actions.cancelFetchingUserStats(action.userId));
    }
}

export function* getMaxGameWeek(api) {
    try {
        const maxGameWeek = yield call(api.getMaxGameWeek);
        yield put(actions.fetchMaxGameWeekSuccess(maxGameWeek));
    } catch (error) {
        yield put(setErrorMessage('Error Fetching Gameweek', error));
    }
}

export function* getUserInfoForWeek(api, action) {
    try {
        const alreadyFetched = yield select(selectors.alreadyFetchedUserInfo,
            action.userId, action.week);
        if (!alreadyFetched) {
            const userInfo = yield call(api.getUserInfoForWeek, ({
                userId: action.userId,
                week: action.week
            }));
            yield put(actions.fetchUserInfoForWeekSuccess(action.userId, action.week, userInfo));
        }
    } catch (error) {
        yield put(setErrorMessage('Error Fetching User Info for Week', error));
    } finally {
        yield put(actions.cancelFetchingUserInfoForWeek(action.userId, action.week));
    }
}

export default function* overviewSaga() {
    yield all([
        takeEvery(actions.FETCH_USER_STATS_REQUEST, getUserStats, overviewApi),
        takeEvery(actions.FETCH_MAX_GAMEWEEK_REQUEST, getMaxGameWeek, overviewApi),
        takeEvery(actions.FETCH_USER_INFO_FOR_WEEK_REQUEST, getUserInfoForWeek, overviewApi),
        takeEvery(actions.FETCH_USER_INFO_FOR_WEEK_REQUEST_BACKGROUND, getUserInfoForWeek,
            overviewApi)
    ]);
}
