import {
    all, takeEvery, put, call, select
} from 'redux-saga/effects';
import * as actions from './actions';
import * as api from './api';
import * as selectors from './selectors';
import * as helpers from './helpers';
import * as currentTeamAction from '../currentteam/actions';

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
        yield put(currentTeamAction.fetchActiveTeamRequest());
    } catch (error) {
        yield put(actions.fetchAllTeamsError(error));
    }
}

export default function* transfersSaga() {
    yield all([
        takeEvery(actions.FETCH_ALL_PLAYERS_REQUEST, fetchAllPlayers),
        takeEvery(actions.FETCH_ALL_TEAMS_REQUEST, fetchAllTeams),
        takeEvery(actions.ADD_PLAYER_TO_CURRENT_TEAM_REQUEST, addPlayerToCurrentTeam),
        takeEvery(actions.UPDATE_TEAM_REQUEST, updateTeam)
    ]);
}
