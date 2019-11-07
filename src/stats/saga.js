import {
    all, takeEvery, put, call
} from 'redux-saga/effects';
import * as actions from './actions';
import * as api from './api';

function* fetchStats(action) {
    try {
        const weekStats = yield call(api.getTeamStatsByWeek, {
            teamId: action.teamId,
            minWeek: action.minWeek,
            maxWeek: action.maxWeek
        });
        yield put(actions.fetchTeamStatsByWeekSuccess(action.teamId,
            action.minWeek, action.maxWeek, weekStats));
    } catch (error) {
        yield put(actions.fetchTeamStatsByWeekError(action.teamId, action.week, error));
    }
}
export default function* statsSaga() {
    yield all([
        takeEvery(actions.FETCH_TEAM_STATS_BY_WEEK_REQUEST, fetchStats)
    ]);
}
