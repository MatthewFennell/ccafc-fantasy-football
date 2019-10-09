import {
    all, call, takeEvery, put, select
} from 'redux-saga/effects';
import * as actions from './actions';
import * as api from './api';
import * as selectors from './selectors';

function* fetchTeams() {
    try {
        const alreadyFetched = yield select(selectors.getAllTeams);
        if (alreadyFetched && alreadyFetched.length === 0) {
            const allTeams = yield call(api.getAllTeams);
            yield put(actions.fetchTeamsSuccess(allTeams));
        }
    } catch (error) {
        yield put(actions.fetchTeamsError(error));
    }
}

function* createPlayer(action) {
    try {
        yield call(api.createPlayer, {
            name: action.name,
            price: action.price,
            position: action.position,
            team: action.team
        });
        yield put(actions.createPlayerSuccess());
    } catch (error) {
        yield put(actions.createPlayerError(error));
    }
}

function* createTeam(action) {
    try {
        yield call(api.createTeam, ({ teamName: action.teamName }));
        yield put(actions.createTeamSuccess());
    } catch (error) {
        yield put(actions.createTeamError(error));
    }
}


export default function* adminSaga() {
    yield all([
        takeEvery(actions.FETCH_TEAMS_REQUEST, fetchTeams),
        takeEvery(actions.CREATE_PLAYER_REQUEST, createPlayer),
        takeEvery(actions.CREATE_TEAM_REQUEST, createTeam)
    ]);
}
