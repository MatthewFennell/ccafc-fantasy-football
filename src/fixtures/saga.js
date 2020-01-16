import {
    all, takeEvery, put, call, delay
} from 'redux-saga/effects';
import * as actions from './actions';
import * as api from './api';


function* fetchFixtures() {
    try {
        const fixtures = yield call(api.getFixtures);
        yield put(actions.fetchFixturesSuccess(fixtures));
    } catch (error) {
        yield put(actions.fetchFixturesError(error));
    }
}

function* setMyTeam(action) {
    try {
        yield call(api.setMyTeam, { team: action.team });
        yield put(actions.setMyTeam(action.team));
    } catch (error) {
        yield put(actions.setMyTeamError(error));
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
        takeEvery(actions.SET_MY_TEAM_REQUEST, setMyTeam),
        takeEvery(actions.FETCH_MY_TEAM_REQUEST, fetchMyTeam)
    ]);
}
