import {
    all, takeEvery, put, select, call
} from 'redux-saga/effects';
import * as actions from './actions';
import * as selectors from './selectors';
import * as api from './api';

function* fetchStats(action) {
    try {
        const fetchedAlready = yield select(selectors.fetchedStatsAlready,
            action.teamId, action.week);
        if (!fetchedAlready) {
            const stats = yield call(api.getTeamStatsByWeek, {
                teamId: action.teamId,
                week: action.week
            });
            yield put(actions.fetchTeamStatsByWeekSuccess(action.teamId, action.week, stats));
        }
    } catch (error) {
        yield put(actions.fetchTeamStatsByWeekError(action.teamId, action.week, error));
    }
}
export default function* statsSaga() {
    yield all([
        takeEvery(actions.FETCH_TEAM_STATS_BY_WEEK_REQUEST, fetchStats)
    ]);
}
