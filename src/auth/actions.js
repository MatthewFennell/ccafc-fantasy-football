const pre = 'AUTH/';

export const SIGN_UP = `${pre}SIGN_UP`;
export const VERIFY_EMAIL_ADDRESS = `${pre}VERIFY_EMAIL_ADDRESS`;

export const SIGN_OUT = `${pre}SIGN_OUT`;
export const SIGN_OUT_SUCCESS = `${pre}SIGN_OUT_SUCCESS`;
export const SIGN_OUT_ERROR = `${pre}SIGN_OUT_ERROR`;

export const SIGN_IN = `${pre}SIGN_IN`;
export const SIGN_IN_SUCCESS = `${pre}SIGN_IN_SUCCESS`;
export const SIGN_IN_ERROR = `${pre}SIGN_IN_ERROR`;

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
