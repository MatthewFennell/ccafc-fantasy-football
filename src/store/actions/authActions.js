export const signIn = (email, password) => ({
  type: "SIGN_IN",
  email,
  password
});

export const loginSuccess = () => ({
  type: "LOGIN_SUCCESS"
});

export const loginError = error => ({
  type: "LOGIN_ERROR",
  error
});

export const signOut = () => ({
  type: "LOGOUT"
});

export const signOutSuccess = () => ({
  type: "SIGN_OUT_SUCCESS"
});

export const signUp = newUser => ({
  type: "SIGNUP",
  newUser
});

export const signUpSuccess = () => ({
  type: "SIGN_UP_SUCCESS"
});

export const signUpError = error => ({
  type: "SIGN_UP_ERROR"
});
