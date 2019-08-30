const pre = 'PROFILE/';

export const LINK_PROFILE_TO_GOOGLE = `${pre}LINK_PROFILE_TO_GOOGLE`;
export const LINK_PROFILE_TO_GOOGLE_ERROR = `${pre}LINK_PROFILE_TO_GOOGLE_ERROR`;

export const LINK_PROFILE_TO_FACEBOOK = `${pre}LINK_PROFILE_TO_FACEBOOK`;
export const LINK_PROFILE_TO_FACEBOOK_ERROR = `${pre}LINK_PROFILE_TO_FACEBOOK_ERROR`;

export const linkProfileToGoogle = () => ({
  type: LINK_PROFILE_TO_GOOGLE
});

export const linkProfileToGoogleError = () => ({
  type: LINK_PROFILE_TO_GOOGLE_ERROR
});

export const linkProfileToFacebook = () => ({
  type: LINK_PROFILE_TO_FACEBOOK
});

export const linkProfileToFacebookError = () => ({
  type: LINK_PROFILE_TO_FACEBOOK_ERROR
});
