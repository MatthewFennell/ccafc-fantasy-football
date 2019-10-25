import {
    all, takeEvery, put, call, select
} from 'redux-saga/effects';
import * as actions from './actions';
import * as api from './api';
import * as selectors from './selectors';

function* fetchAllPlayers() {
    try {
        const alreadyFetched = yield select(selectors.getAllPlayers);
        if (alreadyFetched.length === 0) {
            const allPlayers = yield call(api.getAllPlayers);
            yield put(actions.fetchAllPlayersSuccess(allPlayers));
        }
    } catch (error) {
        yield put(actions.fetchAllPlayersError(error));
    }
}

function* fetchAllTeams() {
    try {
        const alreadyFetched = yield select(selectors.getAllTeams);
        if (alreadyFetched.length === 0) {
            const allTeams = yield call(api.getAllTeams);
            yield put(actions.fetchAllTeamsSuccess(allTeams));
        }
    } catch (error) {
        yield put(actions.fetchAllTeamsError(error));
    }
}

export default function* transfersSaga() {
    yield all([
        takeEvery(actions.FETCH_ALL_PLAYERS_REQUEST, fetchAllPlayers),
        takeEvery(actions.FETCH_ALL_TEAMS_REQUEST, fetchAllTeams)
    ]);
}
