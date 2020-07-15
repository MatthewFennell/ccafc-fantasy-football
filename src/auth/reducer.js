import fp from 'lodash/fp';
import * as actions from './actions';

export const initialState = {
    authError: null,

    sendingEmailVerification: false,

    userPermissions: [],
    loadedPermissions: false,

    permissionMappings: {},
    allRoles: [],

    disabledPages: ['only one'],
    loadingApp: false,

    isEditingPage: ''
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
    case actions.SET_LOADING_APP: {
        return {
            ...state,
            loadingApp: action.isLoadingApp
        };
    }
    case actions.EDIT_DISABLED_PAGE_REQUEST: {
        return fp.set('isEditingPage', action.page)(state);
    }
    case actions.SET_IS_EDITING_PAGE: {
        return fp.set('isEditingPage', action.isEditing)(state);
    }
    case actions.RESEND_VERIFICATION_EMAIL_REQUEST: {
        return fp.set('sendingEmailVerification', true)(state);
    }
    case actions.RESEND_VERIFICATION_EMAIL_SUCCESS: {
        return fp.set('sendingEmailVerification', false)(state);
    }
    case actions.CANCEL_SENDING_EMAIL_VERIFICATION: {
        return fp.set('sendingEmailVerification', false)(state);
    }
    case actions.ADD_PERMISSIONS: {
        return fp.set('userPermissions', fp.union(action.permissions)(state.userPermissions))(state);
    }
    case actions.SET_LOADED_PERMISSIONS: {
        return fp.set('loadedPermissions', action.loaded)(state);
    }
    case actions.SET_PERMISSIONS_MAPPINGS_AND_ROLES: {
        return {
            ...state,
            permissionMappings: action.authInfo.mappings,
            allRoles: action.authInfo.allRoles
        };
    }
    default:
        return state;
    }
};

export default authReducer;
