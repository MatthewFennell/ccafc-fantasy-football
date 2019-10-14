import fp from 'lodash/fp';
import * as actions from './actions';

const initialState = {
    fetchedUserStats: false,
    fetchingUserStats: false,

    totalPoints: null,
    remainingBudget: null,
    remainingTransfers: null,
    userInfo: { },
    maxGameWeek: null
};

const overviewReducer = (state = initialState, action) => {
    switch (action.type) {
    case actions.FETCH_USER_STATS_REQUEST: {
        return fp.set('fetchingUserStats', true)(state);
    }
    case actions.FETCH_USER_STATS_SUCCESS: {
        return {
            ...state,
            remainingBudget: action.stats.remainingBudget,
            remainingTransfers: action.stats.remainingTransfers,
            totalPoints: action.stats.totalPoints,
            fetchingUserStats: false,
            fetchedUserStats: true
        };
    }
    case actions.FETCH_MAX_GAMEWEEK_SUCCESS: {
        return fp.set('maxGameWeek', action.gameWeek)(state);
    }
    default:
        return state;
    }
};

export default overviewReducer;
