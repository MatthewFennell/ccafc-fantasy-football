import {
    all, call, put, select, takeEvery
} from 'redux-saga/effects';
import { setErrorMessage } from '../modalHandling/actions';
import * as actions from './actions';
import * as chartsApi from './api';
import * as selectors from './selectors';

export function* fetchAllTeams(api) {
    try {
        const fetchedTeams = yield select(selectors.getAllTeams);
        if (fetchedTeams && fetchedTeams.length === 0) {
            const teams = yield call(api.getAllTeams);
            yield put(actions.fetchAllTeamsSuccess(teams));
        }
    } catch (error) {
        yield put(setErrorMessage('Error Fetching Teams', error));
    } finally {
        yield put(actions.cancelFetchingTeams());
    }
}

export default function* chartsSaga() {
    yield all([
        takeEvery(actions.FETCH_ALL_TEAMS_REQUEST, fetchAllTeams, chartsApi)
    ]);
}
