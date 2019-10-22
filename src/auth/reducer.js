import fp from 'lodash/fp';
import * as actions from './actions';

const initState = {
    authError: null,
    isAdmin: false,

    passwordResetErrorCode: '',
    passwordResetError: '',

    signUpErrorCode: '',
    signUpError: '',

    signInErrorCode: '',
    signInError: '',

    sendingEmailVerification: false,

    userPermissions: [],
    loadedPermissions: false
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
    case actions.SET_ADMIN: {
        return fp.set('isAdmin', action.isAdmin)(state);
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
    case actions.RESEND_VERIFICATION_EMAIL_REQUEST: {
        return fp.set('sendingEmailVerification', true)(state);
    }
    case actions.RESEND_VERIFICATION_EMAIL_SUCCESS: {
        return fp.set('sendingEmailVerification', false)(state);
    }
    case actions.RESEND_VERIFICATION_EMAIL_ERROR: {
        return fp.set('sendingEmailVerification', false)(state);
    }
    case actions.ADD_PERMISSIONS: {
        return fp.set('userPermissions', fp.union(action.permissions)(state.userPermissions))(state);
    }
    case actions.SET_LOADED_PERMISSIONS: {
        return fp.set('loadedPermissions', true)(state);
    }
    default:
        return state;
    }
};

export default authReducer;
