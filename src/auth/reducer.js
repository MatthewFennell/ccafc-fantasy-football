import fp from 'lodash/fp';
import * as actions from './actions';

export const initialState = {
    allRoles: [],
    authError: null,
    disabledPages: ['only one'],
    loadedPermissions: false,
    loadingApp: false,
    isEditingPage: '',
    permissionMappings: {},
    sendingEmailVerification: false,
    userPermissions: []
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
    case actions.SET_LOADING_APP: {
        return fp.set('loadingApp', action.isLoadingApp)(state);
    }
    case actions.EDIT_DISABLED_PAGE_REQUEST: {
        return fp.set('isEditingPage', action.page)(state);
    }
    case actions.CANCEL_IS_EDITING_PAGE: {
        return fp.set('isEditingPage', '')(state);
    }
    case actions.RESEND_VERIFICATION_EMAIL_REQUEST: {
        return fp.set('sendingEmailVerification', true)(state);
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
