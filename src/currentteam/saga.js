import {
    all, call, takeEvery, put, select
} from 'redux-saga/effects';
import firebase from 'firebase';
import * as actions from './actions';
import * as api from './api';
import * as selectors from './selectors';

function* fetchActiveTeam(forced, action) {
    try {
        const fetchedAlready = yield select(selectors.getAlreadyFetchedForUser, action.userId);
        if (!fetchedAlready || forced) {
            const activeTeam = yield call(api.fetchActiveTeam, { userId: action.userId });
            console.log('active team', activeTeam);
            yield put(actions.fetchActiveTeamSuccess(action.userId, activeTeam.players, activeTeam.captain));
        } else {
            yield put(actions.alreadyFetchedActiveTeam(action.userId));
        }
    } catch (error) {
        yield put(actions.fetchActiveTeamError(error));
    }
}

function* makeCaptain(action) {
    try {
        yield call(api.makeCaptain, { playerId: action.playerId });
        yield put(actions.reloadActiveTeamRequest(firebase.auth().currentUser.uid));
    } catch (error) {
        yield put(actions.makeCaptainError(error));
    }
}

export default function* leaguesSaga() {
    yield all([
        takeEvery(actions.FETCH_ACTIVE_TEAM_REQUEST, fetchActiveTeam, false),
        takeEvery(actions.MAKE_CAPTAIN_REQUEST, makeCaptain),
        takeEvery(actions.RELOAD_ACTIVE_TEAM_REQUEST, fetchActiveTeam, true)
    ]);
}
