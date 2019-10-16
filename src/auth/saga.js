import {
    all, call, takeEvery, put
} from 'redux-saga/effects';
import firebase from 'firebase';
import { push } from 'connected-react-router';
import { constants } from 'react-redux-firebase';
import * as actions from './actions';
import * as api from '../api/api';
import * as consts from '../constants';
import { fetchMaxGameWeekRequest } from '../overview/actions';

function* signOut() {
    try {
        yield firebase.auth().signOut();
        yield put(actions.signOutSuccess());
    } catch (error) {
        yield put(actions.signOutError(error));
    }
}

function* loggingIn(action) {
    yield put(fetchMaxGameWeekRequest());
    if (action.auth && !action.auth.emailVerified) {
        yield put(push(consts.URL.VERIFY_EMAIL));
    }
    const user = yield firebase.auth().currentUser.getIdTokenResult();
    console.log('claims', user.claims);
    const isAdmin = user.claims.admin || false;
    yield put(actions.setAdmin(isAdmin));
}

function* signUp(action) {
    const actionCodeSettings = {
        url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
        handleCodeInApp: true
    };
    try {
        yield firebase.auth().createUserWithEmailAndPassword(action.email, action.password);
        yield call(api.updateDisplayName, ({ displayName: `${action.firstName} ${action.lastName}` }));
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
        const provider = new firebase.auth.GoogleAuthProvider();
        yield firebase.auth().currentUser.linkWithPopup(provider);
    } catch (error) {
        yield put(actions.linkProfileToGoogleError(error));
    }
}

function* linkProfileToFacebook() {
    try {
        const provider = new firebase.auth.FacebookAuthProvider();
        yield firebase.auth().currentUser.linkWithPopup(provider);
    } catch (error) {
        yield put(actions.linkProfileToFacebookError(error));
    }
}

function* sendResetPasswordEmail(action) {
    try {
        yield firebase.auth().sendPasswordResetEmail(action.email);
    } catch (error) {
        yield put(actions.sendPasswordResetEmailError(error));
    }
}

export default function* authSaga() {
    yield all([
        takeEvery(actions.SIGN_OUT, signOut),
        takeEvery(constants.actionTypes.LOGIN, loggingIn),
        takeEvery(actions.SIGN_UP, signUp),
        takeEvery(actions.SIGN_IN, signIn),
        takeEvery(actions.LINK_PROFILE_TO_GOOGLE, linkProfileToGoogle),
        takeEvery(actions.LINK_PROFILE_TO_FACEBOOK, linkProfileToFacebook),
        takeEvery(actions.SEND_PASSWORD_RESET_EMAIL, sendResetPasswordEmail)
    ]);
}
