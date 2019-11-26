import fp from 'lodash/fp';
import * as actions from './actions';

const initState = {
    allTeams: [],

    creatingPlayer: false,
    createPlayerError: '',
    createPlayerErrorCode: '',

    creatingTeam: false,
    createTeamError: '',
    createTeamErrorCode: '',

    teamsWithPlayers: {},

    deletingPlayer: false,
    deletePlayerError: '',
    deletePlayerErrorCode: '',

    deletingTeam: false,
    deleteTeamError: false,
    deleteTeamErrorCode: false,

    submittingResult: false,
    submitResultError: '',
    submitResultErrorCode: '',

    triggeringWeek: false,
    triggerWeekError: '',
    triggerWeekErrorCode: '',

    playerStats: {},
    fetchingPlayerStats: false,

    usersWithExtraRoles: [],
    fetchingUsersWithExtraRoles: false,
    removeUserRoleError: '',
    removeUserRoleErrorCode: '',

    highlightsForApproval: []
};

const adminReducer = (state = initState, action) => {
    switch (action.type) {
    case actions.FETCH_TEAMS_SUCCESS: {
        return {
            ...state,
            allTeams: action.teams
        };
    }
    case actions.CREATE_PLAYER_REQUEST: {
        return fp.set('creatingPlayer', true)(state);
    }
    case actions.CREATE_PLAYER_SUCCESS: {
        return fp.set('creatingPlayer', false)(state);
    }
    case actions.CREATE_PLAYER_ERROR: {
        return {
            ...state,
            creatingPlayer: false,
            createPlayerError: action.error.message,
            createPlayerErrorCode: action.error.code
        };
    }
    case actions.CREATE_TEAM_REQUEST: {
        return fp.set('creatingTeam', true)(state);
    }
    case actions.CREATE_TEAM_SUCCESS: {
        return fp.set('creatingTeam', false)(state);
    }
    case actions.CREATE_TEAM_ERROR: {
        return {
            ...state,
            creatingTeam: false,
            createTeamError: action.error.message,
            createTeamErrorCode: action.error.code
        };
    }
    case actions.CLOSE_CREATE_PLAYER_ERROR: {
        return {
            ...state,
            createPlayerError: '',
            createPlayerErrorCode: ''
        };
    }
    case actions.CLOSE_CREATE_TEAM_ERROR: {
        return {
            ...state,
            createTeamError: '',
            createTeamErrorCode: ''
        };
    }
    case actions.FETCH_PLAYERS_FOR_TEAM_SUCCESS: {
        return {
            ...state,
            teamsWithPlayers: fp.set(action.teamName, action.players)(state.teamsWithPlayers)
        };
    }
    case actions.DELETE_PLAYER_REQUEST: {
        return fp.set('deletingPlayer', true)(state);
    }
    case actions.DELETE_PLAYER_ERROR: {
        return {
            ...state,
            deletingPlayer: false,
            deletePlayerError: action.error.message,
            deletePlayerErrorCode: action.error.code
        };
    }
    case actions.DELETE_PLAYER_SUCCESS: {
        return fp.set('deletingPlayer', false)(state);
    }
    case actions.CLOSE_DELETE_PLAYER_ERROR: {
        return {
            ...state,
            deletePlayerError: '',
            deletePlayerErrorCode: ''
        };
    }
    case actions.DELETE_TEAM_REQUEST: {
        return fp.set('deletingTeam', true)(state);
    }
    case actions.DELETE_TEAM_SUCCESS: {
        return fp.set('deletingTeam', false)(state);
    }
    case actions.DELETE_TEAM_ERROR: {
        return {
            ...state,
            deleteTeamError: action.error.message,
            deleteTeamErrorCode: action.error.code,
            deletingTeam: false
        };
    }
    case actions.CLOSE_DELETE_TEAM_ERROR: {
        return {
            ...state,
            deleteTeamError: '',
            deleteTeamErrorCode: ''
        };
    }
    case actions.SUBMIT_RESULT_REQUEST: {
        return fp.set('submittingResult', true)(state);
    }
    case actions.SUBMIT_RESULT_SUCCESS: {
        return fp.set('submittingResult', false)(state);
    }
    case actions.SUBMIT_RESULT_ERROR: {
        return {
            ...state,
            submitResultError: action.error.message,
            submitResultErrorCode: action.error.code,
            submittingResult: false
        };
    }
    case actions.CLOSE_SUBMIT_RESULT_ERROR: {
        return {
            ...state,
            submitResultError: '',
            submitResultErrorCode: ''
        };
    }
    case actions.TRIGGER_WEEK_SUCCESS: {
        return fp.set('triggeringWeek', false)(state);
    }
    case actions.TRIGGER_WEEK_REQUEST: {
        return fp.set('triggeringWeek', true)(state);
    }
    case actions.TRIGGER_WEEK_ERROR: {
        return {
            ...state,
            triggeringWeek: false,
            triggerWeekError: action.error.message,
            triggerWeekErrorCode: action.error.code
        };
    }
    case actions.CLOSE_TRIGGER_WEEK_ERROR: {
        return {
            ...state,
            triggerWeekError: '',
            triggerWeekErrorCode: ''
        };
    }
    case actions.FETCH_PLAYER_STATS_SUCCESS: {
        return fp.flow(
            fp.set('playerStats.fetching', false),
            fp.set('playerStats.assists', action.playerStats.assists),
            fp.set('playerStats.cleanSheet', action.playerStats.cleanSheet),
            fp.set('playerStats.goals', action.playerStats.goals),
            fp.set('playerStats.redCard', action.playerStats.redCard),
            fp.set('playerStats.yellowCard', action.playerStats.yellowCard),
            fp.set('playerStats.manOfTheMatch', action.playerStats.manOfTheMatch),
            fp.set('playerStats.dickOfTheDay', action.playerStats.dickOfTheDay),
            fp.set('playerStats.ownGoals', action.playerStats.ownGoals),
            fp.set('fetchingPlayerStats', false)
        )(state);
    }
    case actions.FETCH_PLAYER_STATS_REQUEST: {
        return fp.set('fetchingPlayerStats', true)(state);
    }
    case actions.FETCH_PLAYER_STATS_ERROR: {
        return fp.set('fetchingPlayerStats', false)(state);
    }
    case actions.FETCH_USERS_WITH_EXTRA_ROLES_SUCCESS: {
        return {
            ...state,
            usersWithExtraRoles: action.usersWithExtraRoles,
            fetchingUsersWithExtraRoles: false
        };
    }
    case actions.FETCH_USERS_WITH_EXTRA_ROLES_ERROR: {
        return fp.set('fetchingUsersWithExtraRoles', false)(state);
    }
    case actions.FETCH_USERS_WITH_EXTRA_ROLES_REQUEST: {
        return fp.set('fetchingUsersWithExtraRoles', true)(state);
    }
    case actions.LOAD_USERS_WITH_EXTRA_ROLES: {
        return fp.set('fetchingUsersWithExtraRoles', true)(state);
    }
    case actions.ALREADY_FETCHED_USERS_WITH_EXTRA_ROLES: {
        return fp.set('fetchingUsersWithExtraRoles', false)(state);
    }
    case actions.REMOVE_USER_ROLE_ERROR: {
        return {
            ...state,
            removeUserRoleError: action.error.message,
            removeUserRoleErrorCode: action.error.code
        };
    }
    case actions.CLOSE_REMOVE_USER_ROLE_ERROR: {
        return {
            ...state,
            removeUserRoleError: '',
            removeUserRoleErrorCode: ''
        };
    }
    case actions.FETCH_HIGHLIGHTS_FOR_APPROVAL_SUCCESS: {
        return {
            ...state,
            highlightsForApproval: action.highlights
        };
    }
    case actions.APPROVE_HIGHLIGHT_SUCCESS: {
        return {
            ...state,
            highlightsForApproval: state.highlightsForApproval
                .filter(x => x.id !== action.highlightId)
        };
    }
    case actions.REJECT_HIGHLIGHT_SUCCESS: {
        return {
            ...state,
            highlightsForApproval: state.highlightsForApproval
                .filter(x => x.id !== action.highlightId)
        };
    }
    default:
        return state;
    }
};

export default adminReducer;
