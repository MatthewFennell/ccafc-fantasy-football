import {
    all, call, takeEvery, put, select
} from 'redux-saga/effects';
import firebase from 'firebase';
import * as actions from './actions';
import * as teamApi from './api';
import * as selectors from './selectors';
import { setErrorMessage } from '../errorHandling/actions';

export function* fetchActiveTeam(forced, api, action) {
    try {
        const fetchedAlready = yield select(selectors.getAlreadyFetchedForUser, action.userId);
        if (!fetchedAlready || forced) {
            const activeTeam = yield call(api.fetchActiveTeam, { userId: action.userId });
            yield put(actions.fetchActiveTeamSuccess(action.userId,
                activeTeam.players, activeTeam.captain));
        } else {
            yield put(actions.alreadyFetchedActiveTeam(action.userId));
        }
    } catch (error) {
        yield put(setErrorMessage('Fetch Active Team Error', error));
        yield put(actions.cancelFetchingActiveTeam(action.userId));
    } finally {
        yield put(actions.setUpdatingCaptain(false));
        yield put(actions.setPlayerModalOpen(false));
    }
}

export function* makeCaptain(api, action) {
    try {
        yield call(api.makeCaptain, { playerId: action.playerId });
        yield put(actions.reloadActiveTeamRequest(firebase.auth().currentUser.uid));
    } catch (error) {
        yield put(setErrorMessage('Make Captain Error', error));
    }
}

export default function* leaguesSaga() {
    yield all([
        takeEvery(actions.FETCH_ACTIVE_TEAM_REQUEST, fetchActiveTeam, false, teamApi),
        takeEvery(actions.MAKE_CAPTAIN_REQUEST, makeCaptain, teamApi),
        takeEvery(actions.RELOAD_ACTIVE_TEAM_REQUEST, fetchActiveTeam, true, teamApi)
    ]);
}
