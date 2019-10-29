import {
    all, takeEvery, put, call, select
} from 'redux-saga/effects';
import firebase from 'firebase';
import * as actions from './actions';
import * as api from './api';
import * as selectors from './selectors';
import * as helpers from './helpers';
import * as currentTeamActions from '../currentteam/actions';

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
        } else {
            yield put(actions.alreadyFetchedAllPlayers());
        }
    } catch (error) {
        yield put(actions.fetchAllTeamsError(error));
    }
}

function* addPlayerToCurrentTeam(action) {
    const currentTeam = yield select(selectors.getCurrentTeam);
    const canAddPlayer = helpers.canAddPlayer(action.player, currentTeam);
    if (canAddPlayer === true) {
        yield put(actions.addPlayerToCurrentTeamSuccess({
            ...action.player,
            position: action.player.position.toUpperCase()
        }));
    } else {
        yield put(actions.addPlayerToCurrentTeamError(canAddPlayer));
    }
}

function* updateTeam() {
    try {
        const currentTeam = yield select(selectors.getCurrentTeam);
        yield call(api.updateTeam, {
            newTeam: currentTeam.map(player => player.id)
        });
        const myId = firebase.auth().currentUser.uid;
        const activeTeam = yield call(api.fetchActiveTeam, { userId: myId });
        yield put(currentTeamActions.fetchActiveTeamSuccess(myId,
            activeTeam.players, activeTeam.captain));
    } catch (error) {
        yield put(actions.updateTeamError(error));
    }
}

function* replacePlayer(action) {
    const currentTeam = yield select(selectors.getCurrentTeam);
    const canAddPlayer = helpers.canReplacePlayer(action.oldPlayer, action.newPlayer, currentTeam);
    if (canAddPlayer === true) {
        yield put(actions.replacePlayerSuccess(action.oldPlayer, action.newPlayer));
    } else {
        yield put(actions.replacePlayerError(canAddPlayer));
    }
}

export default function* transfersSaga() {
    yield all([
        takeEvery(actions.FETCH_ALL_PLAYERS_REQUEST, fetchAllPlayers),
        takeEvery(actions.FETCH_ALL_TEAMS_REQUEST, fetchAllTeams),
        takeEvery(actions.ADD_PLAYER_TO_CURRENT_TEAM_REQUEST, addPlayerToCurrentTeam),
        takeEvery(actions.UPDATE_TEAM_REQUEST, updateTeam),
        takeEvery(actions.REPLACE_PLAYER_REQUEST, replacePlayer)
    ]);
}
