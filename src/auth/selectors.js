export const getSignUpError = state => state.auth.signUpError;
export const getSignUpErrorCode = state => state.auth.signUpErrorCode;

export const getSignInError = state => state.auth.signInError;
export const getSignInErrorCode = state => state.auth.signInErrorCode;

export const getPasswordResetErrorCode = state => state.auth.passwordResetErrorCode;
export const getPasswordResetError = state => state.auth.passwordResetError;

export const getLinkAccountError = state => state.auth.linkAccountError;
export const getLinkAccountErrorCode = state => state.auth.linkAccountErrorCode;
export const getAttemptedEmailToLink = state => state.auth.attemptedEmailToLink;
