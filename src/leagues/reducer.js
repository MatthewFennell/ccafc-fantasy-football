import fp from 'lodash/fp';
import * as actions from './actions';

export const initialState = {
    creatingLeague: false,
    leavingLeague: false,
    joiningLeague: false,
    leagues: [],
    usersInLeague: {},
    fetchingLeagues: false,
    fetchingUsersInLeague: false,
    fetchedAllUsersInLeague: {}
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
    case actions.FETCH_LEAGUES_SUCCESS: {
        return fp.set('leagues', action.leagues)(state);
    }
    case actions.CANCEL_FETCHING_LEAGUES: {
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
    case actions.CANCEL_JOINING_LEAGUE: {
        return fp.set('joiningLeague', true)(state);
    }
    case actions.LEAVE_LEAGUE_SUCCESS: {
        return {
            ...state,
            leagues: action.leagues,
            leavingLeague: false
        };
    }
    case actions.CANCEL_LEAVING_LEAGUE: {
        return fp.set('leavingLeague', false)(state);
    }
    case actions.FETCH_USERS_IN_LEAGUE_SUCCESS: {
        return fp.flow(
            fp.set(`usersInLeague.${action.leagueId}.users`, action.usersInLeague),
            fp.set(`usersInLeague.${action.leagueId}.numberOfUsers`, action.numberOfUsers),
            fp.set(`usersInLeague.${action.leagueId}.leagueName`, action.leagueName)
        )(state);
    }
    case actions.CANCEL_FETCHING_USERS_IN_LEAGUE: {
        return fp.set(`usersInLeague.${action.leagueId}.fetching`, false)(state);
    }
    case actions.CANCEL_CREATING_LEAGUE: {
        return fp.set('creatingLeague', false)(state);
    }
    case actions.FETCH_LEAGUES_REQUEST: {
        return fp.set('fetchingLeagues', true)(state);
    }
    case actions.FETCHING_USERS_IN_LEAGUE: {
        return fp.set(`usersInLeague.${action.leagueId}.fetching`, true)(state);
    }
    case actions.ALREADY_FETCHED_USERS_IN_LEAGUE: {
        return fp.set(`usersInLeague.${action.leagueId}.fetching`, false)(state);
    }
    case actions.FETCH_MORE_USER_IN_LEAGUE_SUCCESS: {
        // Add then sort by position (remove network nonsense)
        const sortedResult = fp.sortBy('position')(fp.get(`${action.leagueId}.users`)(state.usersInLeague).concat(action.newUsers));
        return {
            ...state,
            usersInLeague: fp.set(`${action.leagueId}.users`, sortedResult)(state.usersInLeague)
        };
    }
    case actions.FETCHED_ALL_USERS_IN_LEAGUE: {
        return fp.set(`usersInLeague.${action.leagueId}.fetchedAll`, true)(state);
    }
    default:
        return state;
    }
};

export default authReducer;
