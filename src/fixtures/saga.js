import {
    all, takeEvery, put, call, delay, takeLatest
} from 'redux-saga/effects';
import * as actions from './actions';
import * as api from './api';
import { successDelay } from '../constants';

function* fetchFixtures() {
    try {
        const fixtures = yield call(api.getFixtures);
        yield put(actions.fetchFixturesSuccess(fixtures));
    } catch (error) {
        yield put(actions.setFixturesError(error, 'Error Fetching Fixtures'));
    }
}

function* setMyTeam(action) {
    try {
        yield call(api.setMyTeam, { team: action.team });
        yield put(actions.setMyTeam(action.team));
        yield put(actions.setSuccessMessage('Team successfully set'));
        yield delay(successDelay);
        yield put(actions.closeSuccessMessage());
    } catch (error) {
        yield put(actions.setFixturesError(error, 'Error Setting Team'));
    }
}

function* fetchMyTeam() {
    try {
        const myTeam = yield call(api.fetchMyTeam);
        yield put(actions.setMyTeam(myTeam));
    } catch (error) {
        yield put(actions.fetchMyTeamError(error));
    }
}

export default function* fixturesSaga() {
    yield all([
        takeEvery(actions.FETCH_FIXTURES_REQUEST, fetchFixtures),
        takeLatest(actions.SET_MY_TEAM_REQUEST, setMyTeam),
        takeEvery(actions.FETCH_MY_TEAM_REQUEST, fetchMyTeam)
    ]);
}
