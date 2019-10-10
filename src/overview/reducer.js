import fp from 'lodash/fp';
import * as actions from './actions';

const initialState = {
    userInfo: { },
    fetchedUserInfo: false,
    fetchingUserInfo: false
};

const overviewReducer = (state = initialState, action) => {
    switch (action.type) {
    case actions.FETCH_USER_INFO_REQUEST: {
        return fp.set('fetchingUserInfo', true)(state);
    }
    case actions.FETCH_USER_INFO_SUCCESS:
        return {
            ...state,
            userInfo: action.userInfo,
            fetchedUserInfo: true,
            fetchingUserInfo: false
        };
    case actions.FETCH_USER_INFO_ERROR: {
        return fp.set('fetchingUserInfo', false)(state);
    }
    case actions.ALREADY_FETCHED_USER_INFO: {
        return fp.set('fetchingUserInfo', false)(state);
    }
    default:
        return state;
    }
};

export default overviewReducer;