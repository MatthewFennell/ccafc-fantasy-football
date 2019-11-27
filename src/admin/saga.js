import {
    all, call, takeEvery, put, select
} from 'redux-saga/effects';
import * as actions from './actions';
import * as api from './api';
import * as selectors from './selectors';
import { fetchMaxGameWeekRequest } from '../overview/actions';
import { signOut } from '../auth/actions';

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
            team: action.team,
            previousScore: action.previousScore
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

function* editPlayerStats(action) {
    try {
        yield call(api.editStats,
            { playerId: action.playerId, week: action.week, difference: action.difference });
        const playerStats = yield call(api.getPlayerStats,
            { playerId: action.playerId, week: action.week });
        yield put(actions.fetchPlayerStatsSuccess(playerStats));
    } catch (error) {
        yield put(actions.editPlayerStatsError(error));
    }
}

function* usersWithExtraRoles() {
    try {
        const alreadyFetched = yield select(selectors.getUsersWithExtraRoles);
        if (alreadyFetched.length === 0) {
            const extraRoles = yield call(api.getUsersWithExtraRoles);
            yield put(actions.fetchUsersWithExtraRolesSuccess(extraRoles));
        } else {
            yield put(actions.alreadyFetchedUsersWithExtraRoles());
        }
    } catch (error) {
        yield put(actions.fetchUsersWithExtraRolesError(error));
    }
}

function* addUserRole(action) {
    try {
        yield put(actions.loadUsersWithExtraRoles());
        yield call(api.addUserRole, ({
            email: action.email,
            role: action.role
        }));
        const extraRoles = yield call(api.getUsersWithExtraRoles);
        yield put(actions.fetchUsersWithExtraRolesSuccess(extraRoles));
    } catch (error) {
        yield put(actions.addUserRoleError(error));
    }
}

function* removeUserRole(action) {
    try {
        yield put(actions.loadUsersWithExtraRoles());
        yield call(api.removeUserRole, ({
            email: action.email,
            role: action.role
        }));
        const extraRoles = yield call(api.getUsersWithExtraRoles);
        yield put(actions.fetchUsersWithExtraRolesSuccess(extraRoles));
    } catch (error) {
        yield put(actions.removeUserRoleError(error));
    }
}

function* clearDatabase() {
    try {
        yield call(api.clearDatabase);
        yield put(signOut());
    } catch (error) {
        yield put(actions.clearDatabaseError(error));
    }
}

function* rollOverToNextYear() {
    try {
        yield call(api.rollOverToNextYear);
    } catch (error) {
        yield put(actions.rollOverToNextYearError(error));
    }
}

function* deleteAllOldUsers() {
    try {
        yield call(api.deleteAllOldUsers);
    } catch (error) {
        yield put(actions.deleteAllOldUsersError(error));
    }
}

function* fetchHighlightsForApproval() {
    try {
        const fetchedHighlights = yield select(selectors.fetchedHighlightsForApproval);
        if (!fetchedHighlights) {
            const highlights = yield call(api.getHighlightsForApproval);
            yield put(actions.fetchHighlightsForApprovalSuccess(highlights));
        } else {
            yield put(actions.alreadyFetchedHighlightsForApproval());
        }
    } catch (error) {
        yield put(actions.deleteAllOldUsersError(error));
    }
}

function* approveHighlight(action) {
    try {
        yield call(api.approveHighlight, ({ highlightId: action.highlightId }));
        yield put(actions.approveHighlightSuccess(action.highlightId));
    } catch (error) {
        yield put(actions.approveHighlightError(error));
    }
}

function* rejectHighlight(action) {
    try {
        yield call(api.rejectHighlight, ({
            highlightId: action.highlightId,
            reason: action.reason
        }));
        yield put(actions.rejectHighlightSuccess(action.highlightId));
    } catch (error) {
        yield put(actions.rejectHighlightError(error));
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
        takeEvery(actions.FETCH_PLAYER_STATS_REQUEST, getPlayerStats),
        takeEvery(actions.EDIT_PLAYER_STATS_REQUEST, editPlayerStats),
        takeEvery(actions.FETCH_USERS_WITH_EXTRA_ROLES_REQUEST, usersWithExtraRoles),
        takeEvery(actions.ADD_USER_ROLE_REQUEST, addUserRole),
        takeEvery(actions.REMOVE_USER_ROLE_REQUEST, removeUserRole),
        takeEvery(actions.CLEAR_DATABASE_REQUEST, clearDatabase),
        takeEvery(actions.ROLL_OVER_TO_NEXT_YEAR_REQUEST, rollOverToNextYear),
        takeEvery(actions.DELETE_ALL_OLD_USERS_REQUEST, deleteAllOldUsers),
        takeEvery(actions.FETCH_HIGHLIGHTS_FOR_APPROVAL_REQUEST, fetchHighlightsForApproval),
        takeEvery(actions.APPROVE_HIGHLIGHT_REQUEST, approveHighlight),
        takeEvery(actions.REJECT_HIGHLIGHT_REQUEST, rejectHighlight)
    ]);
}
