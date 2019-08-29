const pre = 'AUTH/';

export const SIGN_OUT = `${pre}SIGN_OUT`;
export const SIGN_OUT_SUCCESS = `${pre}SIGN_OUT_SUCCESS`;
export const SIGN_OUT_ERROR = `${pre}SIGN_OUT_ERROR`;

export const SIGN_IN = `${pre}SIGN_IN`;
export const SIGN_IN_SUCCESS = `${pre}SIGN_IN_SUCCESS`;
export const SIGN_IN_ERROR = `${pre}SIGN_IN_ERROR`;

export const REDIRECT_TO_SIGN_IN = `${pre}REDIRECT_TO_SIGN_IN`;
export const REDIRECT_TO_SIGN_UP = `${pre}REDIRECT_TO_SIGN_UP`;

export const redirectToSignUp = () => ({
  type: REDIRECT_TO_SIGN_UP
});

export const redirectToSignIn = () => ({
  type: REDIRECT_TO_SIGN_IN
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

export const signIn = () => ({
  type: SIGN_IN
});

export const signInSuccess = () => ({
  type: SIGN_IN_SUCCESS
});

export const signInError = error => ({
  type: SIGN_IN_ERROR,
  error
});
