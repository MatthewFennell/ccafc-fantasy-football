import fp from 'lodash/fp';
import * as actions from './actions';

export const initialState = {
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

    fetchingLeagues: false,
    fetchingUsersInLeague: false,

    fetchedAllUsersInLeague: {},

    errorHeader: '',
    errorMessage: '',
    errorCode: '',

    cup: {},
    isFetchingCup: false,
    hasFetchedCup: false
};

const cupReducer = (state = initialState, action) => {
    switch (action.type) {
    case actions.FETCH_CUP_REQUEST: {
        return fp.set('isFetchingCup', true)(state);
    }
    case actions.SET_IS_FETCHING_CUP: {
        return fp.set('isFetchingCup', action.isFetching)(state);
    }
    case actions.FETCH_CUP_SUCCESS: {
        return {
            ...state,
            cup: action.cup,
            hasFetchedCup: true
        };
    }
    case actions.SET_CUP_ERROR: {
        return {
            ...state,
            errorMessage: action.error.message,
            errorCode: action.error.code,
            errorHeader: action.header
        };
    }
    case actions.CLOSE_CUP_ERROR: {
        return {
            ...state,
            errorMessage: '',
            errorCode: '',
            errorHeader: ''
        };
    }
    default:
        return state;
    }
};

export default cupReducer;
