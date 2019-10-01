import * as actions from './actions';

const initState = {
    authError: null,
    passwordResetError: '',
    signUpError: '',
    signInError: ''
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
    case actions.SIGN_UP_ERROR: {
        return {
            ...state,
            signUpError: action.error.message
        };
    }
    case actions.SIGN_IN_ERROR: {
        return {
            ...state,
            signInError: action.error.message
        };
    }
    case actions.SEND_PASSWORD_RESET_EMAIL_ERROR: {
        return {
            ...state,
            passwordResetError: action.error.message
        };
    }
    case actions.CLOSE_AUTH_ERROR: {
        return {
            initState
        };
    }
    default:
        return state;
    }
};

export default authReducer;
