import {
  all, takeEvery, put
} from 'redux-saga/effects';
import firebase from 'firebase';
import * as actions from './actions';
import rsf from '../config/fbConfig';

function* signOut() {
  try {
    yield firebase.auth().signOut();
    yield put(actions.signOutSuccess());
  } catch (error) {
    yield put(actions.signOutError(error));
  }
}

function* signInSuccess() {
  console.log('sign in success');
}

export default function* authSaga() {
  yield all([
    takeEvery(actions.SIGN_OUT, signOut),
    takeEvery(actions.SIGN_IN_SUCCESS, signInSuccess)
  ]);
}
