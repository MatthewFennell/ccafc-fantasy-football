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
        }
    } catch (error) {
        yield put(setErrorMessage('Error Fetching Active Team', error));
    } finally {
        yield put(actions.setPlayerModalOpen(false));
        yield put(actions.cancelFetchingActiveTeam(action.userId));
    }
}

export function* makeCaptain(api, action) {
    try {
        yield call(api.makeCaptain, { playerId: action.playerId });
        yield put(actions.reloadActiveTeamRequest(firebase.auth().currentUser.uid));
    } catch (error) {
        yield put(setErrorMessage('Error Making Player Captain', error));
    } finally {
        yield put(actions.setPlayerModalOpen(false));
        yield put(actions.setCaptainToUpdate(''));
        yield put(actions.setUpdatingCaptain(false));
    }
}

export default function* currentTeamSaga() {
    yield all([
        takeEvery(actions.FETCH_ACTIVE_TEAM_REQUEST, fetchActiveTeam, false, teamApi),
        takeEvery(actions.MAKE_CAPTAIN_REQUEST, makeCaptain, teamApi),
        takeEvery(actions.RELOAD_ACTIVE_TEAM_REQUEST, fetchActiveTeam, true, teamApi)
    ]);
}
