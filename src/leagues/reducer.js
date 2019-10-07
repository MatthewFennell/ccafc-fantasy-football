import * as actions from './actions';

const initState = {
    leagues: []
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
    case actions.FETCH_LEAGUES_SUCCESS: {
        return {
            ...state,
            leagues: action.leagues
        };
    }
    default:
        return state;
    }
};

export default authReducer;
