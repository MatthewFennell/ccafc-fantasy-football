import * as actions from './actions';

const initialState = {
    userInfo: {},
    fetchedUserInfo: false
};

const overviewReducer = (state = initialState, action) => {
    switch (action.type) {
    case actions.FETCH_USER_INFO_SUCCESS:
        return {
            ...state,
            userInfo: action.userInfo,
            fetchedUserInfo: true
        };
    default:
        return state;
    }
};

export default overviewReducer;
