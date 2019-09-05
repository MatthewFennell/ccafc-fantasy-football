import {
  all, call, takeEvery, put
} from 'redux-saga/effects';
import firebase from 'firebase';
import { push } from 'connected-react-router';
import { constants } from 'react-redux-firebase';
import * as actions from './actions';

import rsf from '../config/fbConfig';

function* signOut() {
  try {
    yield firebase.auth().signOut();
    yield put(actions.signOutSuccess());
    yield put(push('/signin'));
  } catch (error) {
    yield put(actions.signOutError(error));
  }
}

function* loggingIn(action) {
  if (action.auth && !action.auth.emailVerified) {
    yield put(push('/needToVerifyEmail'));
  }
}

function* signUp(action) {
  const actionCodeSettings = {
    url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    handleCodeInApp: true
  };
  try {
    const response = yield firebase
      .auth()
      .createUserWithEmailAndPassword(action.email, action.password);
    yield call(rsf.firestore.setDocument, `users/${response.user.uid}`, {
      firstName: action.firstName,
      lastName: action.lastName
    });
    yield firebase.auth().currentUser.sendEmailVerification(actionCodeSettings);
  } catch (error) {
    yield put(actions.signUpError(error));
  }
}

function* signIn(action) {
  try {
    yield firebase
      .auth()
      .signInWithEmailAndPassword(action.email, action.password);
    yield put(actions.signInSuccess());
  } catch (error) {
    yield put(actions.signInError(error));
  }
}

function* linkProfileToGoogle() {
  try {
    console.log('user', firebase.auth().currentUser);
    const provider = new firebase.auth.GoogleAuthProvider();
    yield firebase.auth().currentUser.linkWithPopup(provider);
  } catch (error) {
    console.log('error', error);
    yield put(actions.linkProfileToGoogleError(error));
  }
}

function* linkProfileToFacebook() {
  try {
    const provider = new firebase.auth.FacebookAuthProvider();
    yield firebase.auth().currentUser.linkWithPopup(provider);
  } catch (error) {
    yield put(actions.linkProfileToGoogleError(error));
  }
}

export default function* authSaga() {
  yield all([
    takeEvery(actions.SIGN_OUT, signOut),
    takeEvery(constants.actionTypes.LOGIN, loggingIn),
    takeEvery(actions.SIGN_UP, signUp),
    takeEvery(actions.SIGN_IN, signIn),
    takeEvery(actions.LINK_PROFILE_TO_GOOGLE, linkProfileToGoogle),
    takeEvery(actions.LINK_PROFILE_TO_FACEBOOK, linkProfileToFacebook)
  ]);
}
