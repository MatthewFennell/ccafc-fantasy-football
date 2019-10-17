import {
    all, call, takeEvery, put, select
} from 'redux-saga/effects';
import * as actions from './actions';
import * as api from './api';
import * as selectors from './selectors';
import { fetchMaxGameWeekRequest } from '../overview/actions';

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
        const allTeams = yield call(api.getAllTeams);
        yield put(actions.fetchTeamsSuccess(allTeams));
    } catch (error) {
        yield put(actions.createTeamError(error));
    }
}

function* getPlayersForTeam(action) {
    try {
        const alreadyFetched = yield select(selectors.getPlayersInTeam, action.teamName);
        if (!alreadyFetched) {
            const playersInTeam = yield call(api.getPlayersInTeam, { teamName: action.teamName });
            yield put(actions.fetchPlayersForTeamSuccess(action.teamName, playersInTeam));
        }
    } catch (error) {
        yield put(actions.createTeamError(error));
    }
}

function* submitResult(action) {
    try {
        yield call(api.submitResult,
            {
                team: action.teamId,
                goalsFor: action.goalsFor,
                goalsAgainst: action.goalsAgainst,
                week: action.week,
                players: action.players
            });
        yield put(actions.submitResultSuccess());
    } catch (error) {
        yield put(actions.submitResultError(error));
    }
}

function* deletePlayer(action) {
    try {
        yield call(api.deletePlayer, { playerId: action.playerId });
        yield put(actions.deletePlayerSuccess());
    } catch (error) {
        yield put(actions.deletePlayerError(error));
    }
}

function* deleteTeam(action) {
    try {
        yield call(api.deleteTeam, {
            teamId: action.teamId,
            teamName: action.teamName
        });
        yield put(actions.deleteTeamSuccess());
        const allTeams = yield call(api.getAllTeams);
        yield put(actions.fetchTeamsSuccess(allTeams));
    } catch (error) {
        yield put(actions.deleteTeamError(error));
    }
}

function* triggerWeek(action) {
    try {
        yield call(api.triggerWeeklyTeams, { week: action.week });
        yield put(actions.triggerWeekSuccess());
        yield put(fetchMaxGameWeekRequest());
    } catch (error) {
        yield put(actions.triggerWeekError(error));
    }
}

function* getPlayerStats(action) {
    try {
        const playerStats = yield call(api.getPlayerStats,
            { playerId: action.playerId, week: action.week });
        yield put(actions.fetchPlayerStatsSuccess(playerStats));
    } catch (error) {
        yield put(actions.fetchPlayerStatsError(error));
    }
}

export default function* adminSaga() {
    yield all([
        takeEvery(actions.FETCH_TEAMS_REQUEST, fetchTeams),
        takeEvery(actions.CREATE_PLAYER_REQUEST, createPlayer),
        takeEvery(actions.CREATE_TEAM_REQUEST, createTeam),
        takeEvery(actions.FETCH_PLAYERS_FOR_TEAM_REQUEST, getPlayersForTeam),
        takeEvery(actions.SUBMIT_RESULT_REQUEST, submitResult),
        takeEvery(actions.DELETE_PLAYER_REQUEST, deletePlayer),
        takeEvery(actions.DELETE_TEAM_REQUEST, deleteTeam),
        takeEvery(actions.TRIGGER_WEEK_REQUEST, triggerWeek),
        takeEvery(actions.FETCH_PLAYER_STATS_REQUEST, getPlayerStats)
    ]);
}
