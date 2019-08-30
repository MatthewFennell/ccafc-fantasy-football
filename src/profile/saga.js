import {
  all, takeEvery, put
} from 'redux-saga/effects';
import firebase from 'firebase';
import * as actions from './actions';


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
    takeEvery(actions.LINK_PROFILE_TO_GOOGLE, linkProfileToGoogle),
    takeEvery(actions.LINK_PROFILE_TO_FACEBOOK, linkProfileToFacebook)
  ]);
}
