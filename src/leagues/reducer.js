import fp from 'lodash/fp';
import * as actions from './actions';

const initState = {
    createLeagueError: '',
    createLeagueErrorCode: '',
    creatingLeague: false,

    joinLeagueError: '',
    joinLeagueErrorCode: '',
    joiningLeague: false,

    leagues: [],

    leaveLeagueError: '',
    leaveLeagueErrorCode: '',
    leavingLeague: false,

    usersInLeague: {},

    fetchingLeague: false,
    fetchingUsersInLeague: false
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
    case actions.FETCH_LEAGUES_SUCCESS: {
        return {
            ...state,
            leagues: action.leagues,
            fetchingLeagues: false
        };
    }
    case actions.fetchLeaguesError: {
        return fp.set('fetchingLeagues', false)(state);
    }
    case actions.ALREADY_FETCHED_LEAGUES: {
        return fp.set('fetchingLeagues', false)(state);
    }
    case actions.CREATE_LEAGUE_SUCCESS: {
        return {
            ...state,
            leagues: action.leagues,
            creatingLeague: false
        };
    }
    case actions.CREATE_LEAGUE_REQUEST: {
        return fp.set('creatingLeague', true)(state);
    }
    case actions.JOIN_LEAGUE_REQUEST: {
        return fp.set('joiningLeague', true)(state);
    }
    case actions.LEAVE_LEAGUE_REQUEST: {
        return fp.set('leavingLeague', true)(state);
    }
    case actions.JOIN_LEAGUE_SUCCESS: {
        return {
            ...state,
            leagues: action.leagues,
            joiningLeague: false
        };
    }
    case actions.JOIN_LEAGUE_ERROR: {
        return {
            ...state,
            joinLeagueError: action.error.message,
            joinLeagueErrorCode: action.error.code,
            joiningLeague: false
        };
    }
    case actions.CLOSE_JOIN_LEAGUE_ERROR: {
        return {
            ...state,
            joinLeagueError: '',
            joinLeagueErrorCode: ''
        };
    }
    case actions.LEAVE_LEAGUE_SUCCESS: {
        return {
            ...state,
            leagues: action.leagues,
            leavingLeague: false
        };
    }
    case actions.LEAVE_LEAGUE_ERROR: {
        return {
            ...state,
            leavingLeague: false,
            leaveLeagueError: action.error.message,
            leaveLeagueErrorCode: action.error.code
        };
    }
    case actions.FETCH_USERS_IN_LEAGUE_SUCCESS: {
        return {
            ...state,
            usersInLeague: fp.set(action.leagueId, action.usersInLeague)(state.usersInLeague),
            fetchingUsersInLeague: false
        };
    }
    case actions.CREATE_LEAGUE_ERROR: {
        return {
            ...state,
            createLeagueError: action.error.message,
            createLeagueErrorCode: action.error.code,
            creatingLeague: false
        };
    }
    case actions.CLOSE_CREATE_LEAGUE_ERROR: {
        return {
            ...state,
            createLeagueError: '',
            createLeagueErrorCode: ''
        };
    }
    case actions.FETCH_LEAGUES_REQUEST: {
        return fp.set('fetchingLeagues', true)(state);
    }
    case actions.FETCH_USERS_IN_LEAGUE_REQUEST: {
        return fp.set('fetchingUsersInLeague', true)(state);
    }
    case actions.FETCH_USERS_IN_LEAGUE_ERROR: {
        return fp.set('fetchingUsersInLeague', false)(state);
    }
    case actions.ALREADY_FETCHED_USERS_IN_LEAGUE: {
        return fp.set('fetchingUsersInLeague', false)(state);
    }
    default:
        return state;
    }
};

export default authReducer;
