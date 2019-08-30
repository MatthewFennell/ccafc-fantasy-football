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

function* signOutSuccess() {
  yield put(push('/sigin'));
}

function* redirectToSignIn() {
  yield put(push('/signin'));
}

function* redirectToSignUp() {
  yield put(push('/signup'));
}

function* loggingIn(action) {
  if (action.auth) {
    if (action.auth.emailVerified) {
      yield put(push('/dashboard'));
    } else {
      yield put(push('/needToVerifyEmail'));
    }
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
    console.log('sign up error', error);
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

export default function* authSaga() {
  yield all([
    takeEvery(actions.SIGN_OUT, signOut),
    takeEvery(actions.SIGN_OUT_SUCCESS, signOutSuccess),
    takeEvery(actions.REDIRECT_TO_SIGN_IN, redirectToSignIn),
    takeEvery(actions.REDIRECT_TO_SIGN_UP, redirectToSignUp),
    takeEvery(constants.actionTypes.LOGIN, loggingIn),
    takeEvery(actions.SIGN_UP, signUp),
    takeEvery(actions.SIGN_IN, signIn)
  ]);
}
