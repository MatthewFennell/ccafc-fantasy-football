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

export default function* overviewSaga() {
    yield all([
        takeEvery(actions.FETCH_USER_STATS_REQUEST, getUserStats),
        takeEvery(actions.FETCH_MAX_GAMEWEEK_REQUEST, getMaxGameWeek)
    ]);
}
