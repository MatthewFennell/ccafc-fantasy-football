import fp from 'lodash/fp';
import * as actions from './actions';

const initState = {
    createLeagueError: '',
    createLeagueErrorCode: '',
    leagues: [],
    usersInLeague: {}
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
    case actions.FETCH_LEAGUES_SUCCESS: {
        return {
            ...state,
            leagues: action.leagues
        };
    }
    case actions.CREATE_LEAGUE_SUCCESS: {
        return {
            ...state,
            leagues: action.leagues
        };
    }
    case actions.JOIN_LEAGUE_SUCCESS: {
        return {
            ...state,
            leagues: action.leagues
        };
    }
    case actions.LEAVE_LEAGUE_SUCCESS: {
        return {
            ...state,
            leagues: action.leagues
        };
    }
    case actions.FETCH_USERS_IN_LEAGUE_SUCCESS: {
        return {
            ...state,
            usersInLeague: fp.set(action.leagueId, action.usersInLeague)(state.usersInLeague)
        };
    }
    case actions.CREATE_LEAGUE_ERROR: {
        return {
            ...state,
            createLeagueError: action.error.message,
            createLeagueErrorCode: action.error.code
        };
    }
    case actions.CLOSE_CREATE_LEAGUE_ERROR: {
        return {
            ...state,
            createLeagueError: '',
            createLeagueErrorCode: ''
        };
    }
    default:
        return state;
    }
};

export default authReducer;
