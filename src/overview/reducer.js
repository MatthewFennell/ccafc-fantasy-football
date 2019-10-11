import fp from 'lodash/fp';
import * as actions from './actions';

const initialState = {
    currentGameWeek: null,
    totalPoints: null,
    remainingBudget: null,
    remainingTransfers: null,
    userInfo: { },
    fetchedUserStats: false,
    fetchedInitialUserInfo: false,
    fetchingUserInfo: false,
    maxGameWeek: null
};

const overviewReducer = (state = initialState, action) => {
    switch (action.type) {
    case actions.FETCH_INITIAL_USER_WEEK_INFO_REQUEST: {
        return fp.set('fetchingUserInfo', true)(state);
    }
    case actions.FETCH_INITIAL_USER_WEEK_INFO_SUCCESS: {
        const {
            gameWeek, ...rest
        } = action.userInfo;
        return {
            ...state,
            currentGameWeek: gameWeek,
            userInfo: fp.set(gameWeek, ({
                fetched: true,
                ...rest
            }))(state.userInfo),
            fetchingUserInfo: false,
            maxGameWeek: gameWeek,
            fetchedInitialUserInfo: true
        };
    }
    case actions.FETCH_INITIAL_USER_WEEK_INFO_ERROR: {
        return fp.set('fetchingUserInfo', false)(state);
    }
    case actions.ALREADY_FETCHED_USER_INFO: {
        return fp.set('fetchingUserInfo', false)(state);
    }
    case actions.FETCH_USER_INFO_FOR_WEEK_REQUEST: {
        return fp.set(`userInfo.${action.gameWeek}.fetching`, true)(state);
    }
    case actions.FETCH_USER_INFO_FOR_WEEK_SUCCESS: {
        return fp.flow(
            fp.set(`userInfo.${action.gameWeek}`, action.usersWeeklyInfo),
            fp.set(`userInfo.${action.gameWeek}.fetching`, false),
            fp.set(`userInfo.${action.gameWeek}.fetched`, true),
            fp.set('currentGameWeek', action.gameWeek),
        )(state);
    }
    case actions.FETCH_USER_INFO_FOR_WEEK_ERROR: {
        return fp.set(`userInfo.${action.gameWeek}.fetching`, false)(state);
    }
    case actions.CHANGE_ACTIVE_GAME_WEEK: {
        return fp.set('currentGameWeek', action.week)(state);
    }
    case actions.FETCH_USER_STATS_SUCCESS: {
        return {
            ...state,
            totalPoints: action.stats.totalPoints,
            remainingBudget: action.stats.remainingBudget,
            remainingTransfers: action.stats.remainingTransfers,
            fetchedUserStats: true
        };
    }
    default:
        return state;
    }
};

export default overviewReducer;
