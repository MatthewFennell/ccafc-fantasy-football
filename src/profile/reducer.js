import fp from 'lodash/fp';
import * as actions from './actions';

export const initialState = {
    attemptedEmailToLink: '',

    updatingDisplayName: false,
    updateDisplayNameError: '',
    updateDisplayNameErrorCode: '',

    updatingTeamName: false,
    updateTeamNameError: '',
    updateTeamNameErrorCode: '',

    deletingAccount: false,
    deleteAccountError: '',
    deleteAccountErrorCode: '',

    photoUrlBeingUpdated: ''
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
    case actions.CLOSE_ACCOUNT_LINK_ERROR: {
        return {
            ...state,
            attemptedEmailToLink: '',
            linkAccountError: '',
            linkAccountErrorCode: ''
        };
    }
    case actions.UPDATE_PROFILE_PICTURE_REQUEST: {
        return fp.set('photoUrlBeingUpdated', action.photoUrl)(state);
    }
    case actions.SET_PHOTO_URL_BEING_UPDATED: {
        return fp.set('photoUrlBeingUpdated', action.photoUrl)(state);
    }
    case actions.UPDATE_DISPLAY_NAME_REQUEST: {
        return fp.set('updatingDisplayName', true)(state);
    }
    case actions.CANCEL_UPDATING_DISPLAY_NAME: {
        return fp.set('updatingDisplayName', false)(state);
    }
    case actions.CLOSE_DISPLAY_NAME_ERROR: {
        return {
            ...state,
            updateDisplayNameError: '',
            updateDisplayNameErrorCode: ''
        };
    }
    case actions.UPDATE_TEAM_NAME_REQUEST: {
        return fp.set('updatingTeamName', true)(state);
    }
    case actions.UPDATE_TEAM_NAME_SUCCESS: {
        return fp.set('updatingTeamName', false)(state);
    }
    case actions.UPDATE_TEAM_NAME_ERROR: {
        return {
            ...state,
            updatingTeamName: false,
            updateTeamNameError: action.error.message,
            updateTeamNameErrorCode: action.error.code
        };
    }
    case actions.CLOSE_TEAM_NAME_ERROR: {
        return {
            ...state,
            updateTeamNameError: '',
            updateTeamNameErrorCode: ''
        };
    }
    case actions.CLOSE_DELETE_ACCOUNT_ERROR: {
        return {
            ...state,
            deleteAccountError: '',
            deleteAccountErrorCode: ''
        };
    }
    case actions.DELETE_ACCOUNT_REQUEST: {
        return fp.set('deletingAccount', true)(state);
    }
    case actions.SET_DELETING_ACCOUNT: {
        return fp.set('deletingAccount', action.isDeleting)(state);
    }
    default:
        return state;
    }
};

export default profileReducer;
