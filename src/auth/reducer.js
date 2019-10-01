import * as actions from './actions';

const initState = {
    attemptedEmailToLink: '',
    linkAccountErrorCode: '',
    linkAccountError: '',

    authError: null,

    passwordResetErrorCode: '',
    passwordResetError: '',

    signUpErrorCode: '',
    signUpError: '',

    signInErrorCode: '',
    signInError: ''
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
    case actions.SIGN_UP_ERROR: {
        return {
            ...state,
            signUpError: action.error.message,
            signUpErrorCode: action.error.code
        };
    }
    case actions.SIGN_IN_ERROR: {
        return {
            ...state,
            signInError: action.error.message,
            signInErrorCode: action.error.code
        };
    }
    case actions.SEND_PASSWORD_RESET_EMAIL_ERROR: {
        return {
            ...state,
            passwordResetError: action.error.message,
            passwordResetErrorCode: action.error.code
        };
    }
    case actions.LINK_PROFILE_TO_FACEBOOK_ERROR: {
        return {
            ...state,
            attemptedEmailToLink: action.error.email,
            linkAccountErrorCode: action.error.code,
            linkAccountError: action.error.message
        };
    }
    case actions.LINK_PROFILE_TO_GOOGLE_ERROR: {
        return {
            ...state,
            attemptedEmailToLink: action.error.email,
            linkAccountErrorCode: action.error.code,
            linkAccountError: action.error.message
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
