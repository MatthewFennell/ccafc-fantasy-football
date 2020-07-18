const pre = 'AUTH/';

export const SIGN_UP = `${pre}SIGN_UP`;
export const VERIFY_EMAIL_ADDRESS = `${pre}VERIFY_EMAIL_ADDRESS`;
export const SIGN_OUT = `${pre}SIGN_OUT`;
export const SIGN_OUT_SUCCESS = `${pre}SIGN_OUT_SUCCESS`;

export const SIGN_IN = `${pre}SIGN_IN`;
export const SIGN_IN_SUCCESS = `${pre}SIGN_IN_SUCCESS`;

export const LINK_PROFILE_TO_GOOGLE = `${pre}LINK_PROFILE_TO_GOOGLE`;

export const LINK_PROFILE_TO_FACEBOOK = `${pre}LINK_PROFILE_TO_FACEBOOK`;

export const UPDATE_DISPLAY_NAME = `${pre}UPDATE_DISPLAY_NAME`;

export const SEND_PASSWORD_RESET_EMAIL = `${pre}SEND_PASSWORD_RESET_EMAIL`;

export const RESEND_VERIFICATION_EMAIL_REQUEST = `${pre}RESEND_VERIFICATION_EMAIL_REQUEST`;
export const CANCEL_SENDING_EMAIL_VERIFICATION = `${pre}CANCEL_SENDING_EMAIL_VERIFICATION`;

export const ADD_PERMISSIONS = `${pre}ADD_PERMISSIONS`;
export const SET_LOADED_PERMISSIONS = `${pre}SET_LOADED_PERMISSIONS`;
export const SET_PERMISSIONS_MAPPINGS_AND_ROLES = `${pre}SET_PERMISSIONS_MAPPINGS_AND_ROLES`;

export const EDIT_DISABLED_PAGE_REQUEST = `${pre}EDIT_DISABLED_PAGE_REQUEST`;
export const CANCEL_IS_EDITING_PAGE = `${pre}CANCEL_IS_EDITING_PAGE`;

export const SET_LOADING_APP = `${pre}SET_LOADING_APP`;

export const setLoadingApp = isLoadingApp => ({
    type: SET_LOADING_APP,
    isLoadingApp
});

export const cancelEditingPage = () => ({
    type: CANCEL_IS_EDITING_PAGE
});

export const editDisabledPageRequest = (page, isDisabled) => ({
    type: EDIT_DISABLED_PAGE_REQUEST,
    page,
    isDisabled
});

export const setPermissionsMappingsAndRoles = authInfo => ({
    type: SET_PERMISSIONS_MAPPINGS_AND_ROLES,
    authInfo
});

export const setLoadedPermissions = loaded => ({
    type: SET_LOADED_PERMISSIONS,
    loaded
});

export const addPermissions = permissions => ({
    type: ADD_PERMISSIONS,
    permissions
});

export const resendEmailVerificationRequest = () => ({
    type: RESEND_VERIFICATION_EMAIL_REQUEST
});

export const cancelSendingEmailVerification = () => ({
    type: CANCEL_SENDING_EMAIL_VERIFICATION
});

export const updateDisplayName = displayName => ({
    type: UPDATE_DISPLAY_NAME,
    displayName
});

export const sendPasswordResetEmail = email => ({
    type: SEND_PASSWORD_RESET_EMAIL,
    email
});

export const linkProfileToGoogle = () => ({
    type: LINK_PROFILE_TO_GOOGLE
});

export const linkProfileToFacebook = () => ({
    type: LINK_PROFILE_TO_FACEBOOK
});

export const signUp = (email, password, displayName) => ({
    type: SIGN_UP,
    email,
    password,
    displayName
});

export const verifyEmailAddress = () => ({
    type: VERIFY_EMAIL_ADDRESS
});

export const signOut = () => ({
    type: SIGN_OUT
});

export const signOutSuccess = () => ({
    type: SIGN_OUT_SUCCESS
});

export const signIn = (email, password) => ({
    type: SIGN_IN,
    email,
    password
});

export const signInSuccess = () => ({
    type: SIGN_IN_SUCCESS
});
