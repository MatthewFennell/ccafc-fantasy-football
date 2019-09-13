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

function* fetchWeeklyTeams() {
    try {
        const myTeams = yield api.getAllWeeklyPlayers();
        yield put(actions.fetchWeeklyTeamsSuccess(myTeams));
    } catch (error) {
        yield put(actions.fetchWeeklyTeamsError(error));
    }
}

function* addPointsToPlayer(action) {
    try {
        yield api.addPointsToPlayerInWeek({
            playerId: action.playerId,
            week: action.week,
            points: action.points
        });
    } catch (error) {
        yield put(actions.fetchWeeklyTeamsError(error));
    }
}

function* fetchWeeklyPlayerForUserInWeek(action) {
    try {
        const myWeeklyPlayers = yield api.getWeeklyPlayersForUserInWeek({
            userId: firebase.auth().currentUser.uid,
            week: action.week
        });
        yield put(actions.fetchWeeklyPlayersForUserForWeekSuccess(
            firebase.auth().currentUser.uid, action.week, myWeeklyPlayers
        ));
    } catch (error) {
        yield put(actions.fetchWeeklyTeamsError(error));
    }
}

function* setActiveTeam(action) {
    try {
        // yield api.setActiveTeam({ activeTeam: action.activeTeam });
        yield api.updateWeeklyTeam({
            playersToAdd: action.activeTeam,
            playersToRemove: action.playersToRemove
        });
        const myActiveTeam = yield api.fetchMyActiveTeam();
        yield put(actions.fetchMyActiveTeamSuccess(myActiveTeam));
    } catch (error) {
        yield put(actions.fetchWeeklyTeamsError(error));
    }
}

function* fetchMyActiveTeam() {
    try {
        const myActiveTeam = yield api.fetchMyActiveTeam();
        yield put(actions.fetchMyActiveTeamSuccess(myActiveTeam));
    } catch (error) {
        yield put(actions.fetchMyActiveTeamError(error));
    }
}

function* addPointsForTeamInWeek(action) {
    try {
        yield api.addPointsForTeamInWeek({
            team: action.team,
            goalsFor: action.goalsFor,
            goalsAgainst: action.goalsAgainst,
            week: action.week,
            players: action.players
        });
    } catch (error) {
        yield put(actions.addPointsForTeamInWeekError(error));
    }
}

function* fetchTeams() {
    try {
        const allTeams = yield api.fetchTeams();
        console.log('all teams', allTeams);
        yield put(actions.fetchTeamsSuccess(allTeams));
    } catch (error) {
        yield put(actions.fetchTeamsError(error));
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
        takeEvery(actions.TRIGGER_WEEKLY_TEAMS, triggerWeeklyTeams),
        takeEvery(actions.FETCH_WEEKLY_PLAYERS, fetchWeeklyTeams),
        takeEvery(actions.ADD_POINTS_TO_PLAYER, addPointsToPlayer),
        takeEvery(actions.FETCH_WEEKLY_PLAYERS_FOR_USER_FOR_WEEK, fetchWeeklyPlayerForUserInWeek),
        takeEvery(actions.SET_ACTIVE_TEAM, setActiveTeam),
        takeEvery(actions.FETCH_MY_ACTIVE_TEAM, fetchMyActiveTeam),
        takeEvery(actions.ADD_POINTS_FOR_TEAM_IN_WEEK, addPointsForTeamInWeek),
        takeEvery(actions.FETCH_TEAMS, fetchTeams)
    ]);
}
