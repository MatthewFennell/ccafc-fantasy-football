import * as actions from './actions';

const initState = {
    authError: null,
    signUpError: ''
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
    case actions.SIGN_UP_ERROR: {
        return {
            ...state,
            signUpError: action.error.message
        };
    }
    case actions.CLOSE_SIGN_UP_ERROR: {
        return {
            ...state,
            signUpError: ''
        };
    }
    default:
        return state;
    }
};

export default authReducer;
