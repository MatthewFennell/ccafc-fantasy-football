import {
  all, call, takeEvery, put
} from 'redux-saga/effects';
import firebase from 'firebase';
import * as api from '../../api/api';
import {
  loginSuccess,
  loginError,
  signOutSuccess
} from '../actions/authActions';

import rsf from '../../config/fbConfig';
import { signOutError } from '../../auth/actions';


function* ping() {
  const { pong } = yield call(rsf.functions.call, 'ping', {
    ping: 'newTodo',
    token: 'registrationToken'
  });

  const test = yield api.addMessage({ data: 'data' });

  const databaseStuff = firebase
    .app()
    .functions('europe-west2')
    .httpsCallable('getDatabase');
  yield databaseStuff();

  const addCity = firebase
    .app()
    .functions('europe-west2')
    .httpsCallable('addCity');
  yield addCity();
}

function* signIn(action) {
  try {
    yield firebase
      .auth()
      .signInWithEmailAndPassword(action.email, action.password);
    yield put(loginSuccess());
  } catch (error) {
    yield put(loginError(error));
  }
}

function* signOut() {
  try {
    yield firebase.auth().signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutError());
  }
}

function* signUp(action) {
  try {
    const response = yield firebase
      .auth()
      .createUserWithEmailAndPassword(
        action.newUser.email,
        action.newUser.password,
      );

    // Need to use 'setDocument' in order to set the ID - https://n6g7.github.io/redux-saga-firebase/guides/custom-keys
    yield call(rsf.firestore.setDocument, `users/${response.user.uid}`, {
      firstName: action.newUser.firstName,
      lastName: action.newUser.lastName
    });
  } catch (error) {
  }
}

function* createUser(action) {
  console.log('create action', action);
  try {
    yield call(rsf.firestore.setDocument, `users/${action.user.uid}`, {
      displayName: action.user.displayName
    });
  } catch (error) {
    console.log('error', error);
  }
}

export default function* functionRootSaga() {
  yield all([
    takeEvery('CREATE_PROJECT', ping),
    takeEvery('SIGN_IN', signIn),
    takeEvery('LOGOUT', signOut),
    takeEvery('SIGNUP', signUp),
    takeEvery('CREATE_USER', createUser)
  ]);
}
