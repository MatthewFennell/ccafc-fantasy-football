import { all, call, takeEvery, put } from "redux-saga/effects";
import firebase from "firebase";
import * as api from "../../api/api";
import {
  loginSuccess,
  loginError,
  signOutSuccess,
  signUpSuccess,
  signUpError
} from "../actions/authActions";

import rsf from "../../config/fbConfig";

console.log("rsf", rsf);

function* ping(action) {
  const { pong } = yield call(rsf.functions.call, "ping", {
    ping: "newTodo",
    token: "registrationToken"
  });
  console.log("ping", pong);

  const test = yield api.addMessage({ data: "data" });
  console.log("received", test);

  const addMessage = firebase.functions().httpsCallable("addMessage");
  yield addMessage({ data: "data" });

  const databaseStuff = firebase.functions().httpsCallable("getDatabase");
  yield databaseStuff();

  const addCity = firebase.functions().httpsCallable("addCity");
  yield addCity();
}

function* signIn(action) {
  try {
    console.log("signing in");
    yield firebase
      .auth()
      .signInWithEmailAndPassword(action.email, action.password);
    yield put(loginSuccess());
  } catch (error) {
    console.log("error", error);
    yield put(loginError(error));
  }
}

function* signOut(action) {
  try {
    yield firebase.auth().signOut();
    yield put(signOutSuccess());
  } catch (error) {
    console.log("error", error);
  }
}

function* signUp(action) {
  try {
    console.log("action", action);

    const response = yield firebase
      .auth()
      .createUserWithEmailAndPassword(
        action.newUser.email,
        action.newUser.password
      );
    console.log("response", response);

    // Need to use 'setDocument' in order to set the ID - https://n6g7.github.io/redux-saga-firebase/guides/custom-keys
    yield call(rsf.firestore.setDocument, `users/${response.user.uid}`, {
      firstName: action.newUser.firstName,
      lastName: action.newUser.lastName
    });
  } catch (error) {
    console.log("error", error);
  }
}

export default function* functionRootSaga() {
  yield all([
    takeEvery("CREATE_PROJECT", ping),
    takeEvery("SIGN_IN", signIn),
    takeEvery("LOGOUT", signOut),
    takeEvery("SIGNUP", signUp)
  ]);
}
