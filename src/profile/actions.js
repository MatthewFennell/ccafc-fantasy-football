const pre = 'PROFILE/';

export const LINK_PROFILE_TO_GOOGLE = `${pre}LINK_PROFILE_TO_GOOGLE`;
export const LINK_PROFILE_TO_FACEBOOK = `${pre}LINK_PROFILE_TO_FACEBOOK`;

export const UPDATE_DISPLAY_NAME_REQUEST = `${pre}UPDATE_DISPLAY_NAME_REQUEST`;
export const UPDATE_DISPLAY_NAME_SUCCESS = `${pre}UPDATE_DISPLAY_NAME_SUCCESS`;
export const CANCEL_UPDATING_DISPLAY_NAME = `${pre}CANCEL_UPDATING_DISPLAY_NAME`;

export const UPDATE_TEAM_NAME_REQUEST = `${pre}UPDATE_TEAM_NAME_REQUEST`;
export const CANCEL_UPDATING_TEAM_NAME = `${pre}CANCEL_UPDATING_TEAM_NAME`;

export const DELETE_ACCOUNT_REQUEST = `${pre}DELETE_ACCOUNT_REQUEST`;
export const CANCEL_DELETING_ACCOUNT = `${pre}CANCEL_DELETING_ACCOUNT`;

export const UPDATE_PROFILE_PICTURE_REQUEST = `${pre}UPDATE_PROFILE_PICTURE_REQUEST`;
export const UPDATE_PROFILE_PICTURE_SUCCESS = `${pre}UPDATE_PROFILE_PICTURE_SUCCESS`;
export const CANCEL_PHOTO_URL_BEING_UPDATED = `${pre}CANCEL_PHOTO_URL_BEING_UPDATED`;

export const updateProfilePictureRequest = photoUrl => ({
    type: UPDATE_PROFILE_PICTURE_REQUEST,
    photoUrl
});

export const updateProfilePictureSuccess = (photoUrl, userId) => ({
    type: UPDATE_PROFILE_PICTURE_SUCCESS,
    photoUrl,
    userId
});

export const cancelPhotoUrlBeingUpdated = () => ({
    type: CANCEL_PHOTO_URL_BEING_UPDATED
});

export const cancelDeletingAccount = () => ({
    type: CANCEL_DELETING_ACCOUNT
});

export const deleteAccountRequest = email => ({
    type: DELETE_ACCOUNT_REQUEST,
    email
});

export const cancelUpdatingTeamName = () => ({
    type: CANCEL_UPDATING_TEAM_NAME
});

export const updateTeamNameRequest = teamName => ({
    type: UPDATE_TEAM_NAME_REQUEST,
    teamName
});

export const updateDisplayNameSuccess = () => ({
    type: UPDATE_DISPLAY_NAME_SUCCESS
});

export const cancelUpdatingDisplayName = () => ({
    type: CANCEL_UPDATING_DISPLAY_NAME
});

export const updateDisplayNameRequest = displayName => ({
    type: UPDATE_DISPLAY_NAME_REQUEST,
    displayName
});

export const linkProfileToGoogle = () => ({
    type: LINK_PROFILE_TO_GOOGLE
});

export const linkProfileToFacebook = () => ({
    type: LINK_PROFILE_TO_FACEBOOK
});
