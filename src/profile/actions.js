const pre = 'PROFILE/';

export const LINK_PROFILE_TO_GOOGLE = `${pre}LINK_PROFILE_TO_GOOGLE`;
export const LINK_PROFILE_TO_GOOGLE_ERROR = `${pre}LINK_PROFILE_TO_GOOGLE_ERROR`;

export const LINK_PROFILE_TO_FACEBOOK = `${pre}LINK_PROFILE_TO_FACEBOOK`;
export const LINK_PROFILE_TO_FACEBOOK_ERROR = `${pre}LINK_PROFILE_TO_FACEBOOK_ERROR`;

export const CLOSE_ACCOUNT_LINK_ERROR = `${pre}CLOSE_ACCOUNT_LINK_ERROR`;

export const UPDATE_DISPLAY_NAME_REQUEST = `${pre}UPDATE_DISPLAY_NAME_REQUEST`;
export const UPDATE_DISPLAY_NAME_SUCCESS = `${pre}UPDATE_DISPLAY_NAME_SUCCESS`;
export const UPDATE_DISPLAY_NAME_ERROR = `${pre}UPDATE_DISPLAY_NAME_ERROR`;
export const CLOSE_DISPLAY_NAME_ERROR = `${pre}CLOSE_DISPLAY_NAME_ERROR`;

export const UPDATE_TEAM_NAME_REQUEST = `${pre}UPDATE_TEAM_NAME_REQUEST`;
export const UPDATE_TEAM_NAME_SUCCESS = `${pre}UPDATE_TEAM_NAME_SUCCESS`;
export const UPDATE_TEAM_NAME_ERROR = `${pre}UPDATE_TEAM_NAME_ERROR`;
export const CLOSE_TEAM_NAME_ERROR = `${pre}CLOSE_TEAM_NAME_ERROR`;

export const closeTeamNameError = () => ({
    type: CLOSE_TEAM_NAME_ERROR
});

export const updateTeamNameError = error => ({
    type: UPDATE_TEAM_NAME_ERROR,
    error
});

export const updateTeamNameSuccess = () => ({
    type: UPDATE_TEAM_NAME_SUCCESS
});

export const updateTeamNameRequest = teamName => ({
    type: UPDATE_TEAM_NAME_REQUEST,
    teamName
});


export const closeDisplayNameError = () => ({
    type: CLOSE_DISPLAY_NAME_ERROR
});

export const updateDisplayNameError = error => ({
    type: UPDATE_DISPLAY_NAME_ERROR,
    error
});

export const updateDisplayNameSuccess = () => ({
    type: UPDATE_DISPLAY_NAME_SUCCESS
});

export const updateDisplayNameRequest = displayName => ({
    type: UPDATE_DISPLAY_NAME_REQUEST,
    displayName
});

export const closeAccountLinkError = () => ({
    type: CLOSE_ACCOUNT_LINK_ERROR
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

export const linkProfileToFacebookError = error => ({
    type: LINK_PROFILE_TO_FACEBOOK_ERROR,
    error
});
