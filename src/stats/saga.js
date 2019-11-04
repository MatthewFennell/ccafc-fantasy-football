import {
    all, takeEvery, put, select, call
} from 'redux-saga/effects';
import * as actions from './actions';
import * as selectors from './selectors';
import * as api from './api';
import { weeksToRequest } from './helpers';

function* fetchStats(action) {
    try {
        const minWeek = yield select(selectors.getMinWeekFetched);
        const maxWeek = yield select(selectors.getMaxWeekFetched);
        console.log('min fetched', minWeek);
        console.log('max fetched', maxWeek);
        const weeksToFetch = weeksToRequest(action.minWeek, action.maxWeek, minWeek, maxWeek);
        console.log('weeks to fetch', weeksToFetch);
        yield put(actions.fetchTeamStatsByWeekSuccess(weeksToFetch.minWeek, weeksToFetch.maxWeek));
    } catch (error) {
        yield put(actions.fetchTeamStatsByWeekError(action.teamId, action.week, error));
    }
}
export default function* statsSaga() {
    yield all([
        takeEvery(actions.FETCH_TEAM_STATS_BY_WEEK_REQUEST, fetchStats)
    ]);
}
