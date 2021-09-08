import firebase from 'firebase';
import {
    all, call, put, select, takeEvery
} from 'redux-saga/effects';
import { setErrorMessage } from '../modalHandling/actions';
import { addNotification } from '../notifications/actions';
import * as actions from './actions';
import * as teamApi from './api';
import * as selectors from './selectors';

export function* fetchActiveTeam(forced, api, action) {
    try {
        const fetchedAlready = yield select(selectors.getAlreadyFetchedForUser, action.userId);
        if (!fetchedAlready || forced) {
            const activeTeam = yield call(api.fetchActiveTeam, { userId: action.userId });
            yield put(actions.fetchActiveTeamSuccess(action.userId,
                activeTeam.players, activeTeam.captain));
        }
    } catch (error) {
        yield put(setErrorMessage('Error Fetching Active Team. Trying to fix. Refresh the page in 60 seconds. If this does not work, contact the admin.', error));
        if (error.message === 'Somehow you have no active team') {
            yield call(api.attemptToFixAccount);
        }
    } finally {
        yield put(actions.setPlayerModalOpen(false));
        yield put(actions.cancelFetchingActiveTeam(action.userId));
    }
}

export function* makeCaptain(api, action) {
    try {
        yield call(api.makeCaptain, { playerId: action.playerId });
        yield put(actions.reloadActiveTeamRequest(firebase.auth().currentUser.uid));
        yield put(addNotification('Captain successfully set'));
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
