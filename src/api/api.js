import firebase from 'firebase';

// Param func is the NAME of the function to call
export const functionToCall = func => firebase
    .app()
    .functions('europe-west2')
    .httpsCallable(func);
