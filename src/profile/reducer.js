import fp from 'lodash/fp';
import * as actions from './actions';

const initState = {
    attemptedEmailToLink: '',
    linkAccountErrorCode: '',
    linkAccountError: '',

    updatingDisplayName: false,
    updateDisplayNameError: '',
    updateDisplayNameErrorCode: ''
};

const profileReducer = (state = initState, action) => {
    switch (action.type) {
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
    case actions.CLOSE_ACCOUNT_LINK_ERROR: {
        return {
            ...state,
            linkAccountError: '',
            linkAccountErrorCode: ''
        };
    }
    case actions.UPDATE_DISPLAY_NAME_REQUEST: {
        return fp.set('updatingDisplayName', true)(state);
    }
    case actions.UPDATE_DISPLAY_NAME_SUCCESS: {
        return fp.set('updatingDisplayName', false)(state);
    }
    case actions.UPDATE_DISPLAY_NAME_ERROR: {
        return {
            ...state,
            updatingDisplayName: false,
            updateDisplayNameError: action.error.message,
            updateDisplayNameErrorCode: action.error.code
        };
    }
    case actions.CLOSE_DISPLAY_NAME_ERROR: {
        return {
            ...state,
            updateDisplayNameError: '',
            updateDisplayNameErrorCode: ''
        };
    }
    default:
        return state;
    }
};

export default profileReducer;
