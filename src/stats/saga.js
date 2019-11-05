import {
    all, takeEvery, put, select, call
} from 'redux-saga/effects';
import * as actions from './actions';
import * as api from './api';

function* fetchStats(action) {
    try {
        yield put(actions.fetchTeamStatsByWeekSuccess(action.teamId, action.minWeek, action.maxWeek));
        console.log('action', action);
    } catch (error) {
        yield put(actions.fetchTeamStatsByWeekError(action.teamId, action.week, error));
    }
}
export default function* statsSaga() {
    yield all([
        takeEvery(actions.FETCH_TEAM_STATS_BY_WEEK_REQUEST, fetchStats)
    ]);
}
