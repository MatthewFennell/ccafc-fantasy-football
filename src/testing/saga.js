import {
    all, takeEvery, put, select
} from 'redux-saga/effects';
import firebase from 'firebase';
import * as actions from './actions';
import * as api from '../api/api';
import * as selectors from './selectors';

function* createLeague(action) {
    try {
        yield firebase
            .app()
            .functions('europe-west2')
            .httpsCallable('league-createLeague')({
                leagueName: action.leagueName
            });
    } catch (error) {
        yield put(actions.createLeagueError(error));
    }
}

function* fetchLeagues() {
    try {
        const fetchedLeagues = yield select(selectors.getFetchedLeagues);
        if (!fetchedLeagues) {
            const allLeagues = yield api.getAllLeagues({ data: 'data' });
            const myLeagues = yield api.getLeaguesIAmIn();
            yield put(actions.fetchLeaguesSuccess(allLeagues, myLeagues));
        }
    } catch (error) {
        yield put(actions.fetchLeaguesError(error));
    }
}

function* joinLeague(action) {
    try {
        yield api.joinLeague({ leagueId: action.leagueId });
        const myNewLeagues = yield api.getLeaguesIAmIn();
        yield put(actions.joinLeagueSuccess(myNewLeagues));
    } catch (error) {
        yield put(actions.joinLeagueError(error));
    }
}

function* increaseScore(action) {
    try {
        yield api.addPointsInLeagueToUser({ leagueId: action.leagueId, score: action.score });
    } catch (error) {
        yield put(actions.increaseScoreError(error));
    }
}

function* increaseMyScore(action) {
    try {
        yield api.addPointsToMe({ score: action.score, userId: firebase.auth().currentUser.uid });
        const myLeagues = yield api.getLeaguesIAmIn();
        yield put(actions.increaseScoreSuccess(myLeagues));
    } catch (error) {
        yield put(actions.increaseScoreError(error));
    }
}

function* createTeam(action) {
    try {
        yield api.createTeam({ teamName: action.teamName });
    } catch (error) {
        yield put(actions.createTeamError(error));
    }
}

function* createPlayer(action) {
    try {
        yield api.createPlayer({
            name: action.name,
            position: action.position,
            price: action.price,
            team: action.team
        });
    } catch (error) {
        yield put(actions.createPlayerError(error));
    }
}

function* fetchPlayers() {
    try {
        const fetchedPlayers = yield select(selectors.getFetchedPlayers);
        if (!fetchedPlayers) {
            const allPlayers = yield api.getAllPlayers();
            yield put(actions.fetchPlayersSuccess(allPlayers));
        }
    } catch (error) {
        yield put(actions.fetchLeaguesError(error));
    }
}

function* addPlayerToActiveTeam(action) {
    try {
        yield api.addPlayerToActiveTeam({ playerId: action.playerId });
    } catch (error) {
        yield put(actions.addPlayerToActiveTeamError(error));
    }
}

function* triggerWeeklyTeams(action) {
    try {
        yield api.triggerWeeklyTeams({ week: action.week });
    } catch (error) {
        yield put(actions.triggerWeeklyTeamsError(error));
    }
}

export default function* authSaga() {
    yield all([
        takeEvery(actions.CREATE_LEAGUE, createLeague),
        takeEvery(actions.FETCH_LEAGUES, fetchLeagues),
        takeEvery(actions.JOIN_LEAGUE, joinLeague),
        takeEvery(actions.INCREASE_SCORE, increaseScore),
        takeEvery(actions.INCREASE_MY_SCORE, increaseMyScore),
        takeEvery(actions.CREATE_TEAM, createTeam),
        takeEvery(actions.CREATE_PLAYER, createPlayer),
        takeEvery(actions.FETCH_PLAYERS, fetchPlayers),
        takeEvery(actions.ADD_PLAYER_TO_ACTIVE_TEAM, addPlayerToActiveTeam),
        takeEvery(actions.TRIGGER_WEEKLY_TEAMS, triggerWeeklyTeams)
    ]);
}
