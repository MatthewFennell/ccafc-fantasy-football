import {
    all, call, put, takeEvery
} from 'redux-saga/effects';
import { setErrorMessage } from '../modalHandling/actions';
import * as actions from './actions';
import * as statsApi from './api';

export function* fetchStats(api, action) {
    try {
        const weekStats = yield call(api.getTeamStatsByWeek, {
            teamId: action.teamId,
            minWeek: action.minWeek,
            maxWeek: action.maxWeek
        });
        yield put(actions.fetchTeamStatsByWeekSuccess(action.teamId,
            action.minWeek, action.maxWeek, weekStats));
    } catch (error) {
        yield put(setErrorMessage('Error Fetching Team Stats For Week', error));
    } finally {
        yield put(actions.cancelFetchingTeamStatsByWeek(action.teamId));
    }
}

export default function* statsSaga() {
    yield all([
        takeEvery(actions.FETCH_TEAM_STATS_BY_WEEK_REQUEST, fetchStats, statsApi)
    ]);
}
