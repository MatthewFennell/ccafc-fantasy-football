const pre = 'AUTH/';

export const SIGN_UP = `${pre}SIGN_UP`;
export const SIGN_UP_ERROR = `${pre}SIGN_UP_ERROR`;
export const VERIFY_EMAIL_ADDRESS = `${pre}VERIFY_EMAIL_ADDRESS`;
export const CLOSE_AUTH_ERROR = `${pre}CLOSE_AUTH_ERROR`;

export const SIGN_OUT = `${pre}SIGN_OUT`;
export const SIGN_OUT_SUCCESS = `${pre}SIGN_OUT_SUCCESS`;
export const SIGN_OUT_ERROR = `${pre}SIGN_OUT_ERROR`;

export const SIGN_IN = `${pre}SIGN_IN`;
export const SIGN_IN_SUCCESS = `${pre}SIGN_IN_SUCCESS`;
export const SIGN_IN_ERROR = `${pre}SIGN_IN_ERROR`;

export const LINK_PROFILE_TO_GOOGLE = `${pre}LINK_PROFILE_TO_GOOGLE`;
export const LINK_PROFILE_TO_GOOGLE_ERROR = `${pre}LINK_PROFILE_TO_GOOGLE_ERROR`;

export const LINK_PROFILE_TO_FACEBOOK = `${pre}LINK_PROFILE_TO_FACEBOOK`;
export const LINK_PROFILE_TO_FACEBOOK_ERROR = `${pre}LINK_PROFILE_TO_FACEBOOK_ERROR`;

export const UPDATE_DISPLAY_NAME = `${pre}UPDATE_DISPLAY_NAME`;
export const UPDATE_DISPLAY_NAME_ERROR = `${pre}UPDATE_DISPLAY_NAME_ERROR`;

export const SEND_PASSWORD_RESET_EMAIL = `${pre}SEND_PASSWORD_RESET_EMAIL`;
export const SEND_PASSWORD_RESET_EMAIL_ERROR = `${pre}SEND_PASSWORD_RESET_EMAIL_ERROR`;

export const closeAuthError = () => ({
    type: CLOSE_AUTH_ERROR
});

export const updateDisplayName = displayName => ({
    type: UPDATE_DISPLAY_NAME,
    displayName
});

export const updateDisplayNameError = error => ({
    type: UPDATE_DISPLAY_NAME,
    error
});

export const sendPasswordResetEmail = email => ({
    type: SEND_PASSWORD_RESET_EMAIL,
    email
});

export const sendPasswordResetEmailError = error => ({
    type: SEND_PASSWORD_RESET_EMAIL_ERROR,
    error
});

export const linkProfileToGoogle = () => ({
    type: LINK_PROFILE_TO_GOOGLE
});

export const linkProfileToGoogleError = error => ({
    type: LINK_PROFILE_TO_GOOGLE_ERROR,
    error
});

export const linkProfileToFacebook = () => ({
    type: LINK_PROFILE_TO_FACEBOOK
});

export const linkProfileToFacebookError = () => ({
    type: LINK_PROFILE_TO_FACEBOOK_ERROR
});

export const signUpError = error => ({
    type: SIGN_UP_ERROR,
    error
});

export const signUp = (email, password, firstName, lastName) => ({
    type: SIGN_UP,
    email,
    password,
    firstName,
    lastName
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

export const signOutError = error => ({
    type: SIGN_OUT_ERROR,
    error
});

export const signIn = (email, password) => ({
    type: SIGN_IN,
    email,
    password
});

export const signInSuccess = () => ({
    type: SIGN_IN_SUCCESS
});

export const signInError = error => ({
    type: SIGN_IN_ERROR,
    error
});
