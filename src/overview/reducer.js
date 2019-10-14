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
    case actions.ALREADY_FETCHED_USER_STATS: {
        return fp.set('fetchingUserStats', false)(state);
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
    case actions.FETCH_USER_INFO_FOR_WEEK_REQUEST: {
        return fp.set(`userInfo.${action.userId}.week-${action.week}.fetching`, true)(state);
    }
    case actions.FETCH_USER_INFO_FOR_WEEK_SUCCESS: {
        return fp.flow(
            fp.set(`userInfo.${action.userId}.week-${action.week}.weekPoints`, action.userInfo.weekPoints),
            fp.set(`userInfo.${action.userId}.week-${action.week}.averagePoints`, action.userInfo.averagePoints),
            fp.set(`userInfo.${action.userId}.week-${action.week}.highestPoints`, action.userInfo.highestPoints),
            fp.set(`userInfo.${action.userId}.week-${action.week}.fetched`, true),
            fp.set(`userInfo.${action.userId}.week-${action.week}.fetching`, false)
        )(state);
    }
    case actions.ALREADY_FETCHED_USER_INFO_FOR_WEEK: {
        return fp.set(`userInfo.${action.userId}.week-${action.week}.fetching`, false)(state);
    }
    case actions.FETCH_USER_INFO_FOR_WEEK_ERROR: {
        return fp.set(`userInfo.${action.userId}.week-${action.week}.fetching`, false)(state);
    }
    default:
        return state;
    }
};

export default overviewReducer;
