import fp from 'lodash/fp';
import * as actions from './actions';

const initState = {
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
    case actions.FETCH_USERS_IN_LEAGUE_SUCCESS: {
        return {
            ...state,
            usersInLeague: fp.set(action.leagueId, action.usersInLeague)(state.usersInLeague)
        };
    }
    default:
        return state;
    }
};

export default authReducer;
