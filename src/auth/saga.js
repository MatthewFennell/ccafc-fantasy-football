import {
  all, takeEvery, put
} from 'redux-saga/effects';
import firebase from 'firebase';
import { push } from 'connected-react-router';
import * as actions from './actions';

function* signOut() {
  try {
    yield firebase.auth().signOut();
    yield put(actions.signOutSuccess());
    yield put(push('/signin'));
  } catch (error) {
    yield put(actions.signOutError(error));
  }
}

function* signInSuccess() {
  yield put(push('/dashboard'));
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

export default function* authSaga() {
  yield all([
    takeEvery(actions.SIGN_OUT, signOut),
    takeEvery(actions.SIGN_IN_SUCCESS, signInSuccess),
    takeEvery(actions.SIGN_OUT_SUCCESS, signOutSuccess),
    takeEvery(actions.REDIRECT_TO_SIGN_IN, redirectToSignIn),
    takeEvery(actions.REDIRECT_TO_SIGN_UP, redirectToSignUp)
  ]);
}
