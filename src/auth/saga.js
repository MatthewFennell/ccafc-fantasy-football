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

const actionCodeSettings = {
    url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    handleCodeInApp: true
};

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
    const isAdmin = user.claims.admin || false;
    yield put(actions.setAdmin(isAdmin));
}

function* signUp(action) {
    try {
        yield firebase.auth().createUserWithEmailAndPassword(action.email, action.password);
        yield call(api.updateDisplayName, ({ displayName: action.displayName }));
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

function* sendResetPasswordEmail(action) {
    try {
        yield firebase.auth().sendPasswordResetEmail(action.email);
    } catch (error) {
        yield put(actions.sendPasswordResetEmailError(error));
    }
}

function* resendVerificationEmall() {
    try {
        yield firebase.auth().currentUser.sendEmailVerification(actionCodeSettings);
        yield put(actions.resendEmailVerificationSuccess());
    } catch (error) {
        yield put(actions.resendEmailVerificationError(error));
    }
}

export default function* authSaga() {
    yield all([
        takeEvery(actions.SIGN_OUT, signOut),
        takeEvery(constants.actionTypes.LOGIN, loggingIn),
        takeEvery(actions.SIGN_UP, signUp),
        takeEvery(actions.SIGN_IN, signIn),
        takeEvery(actions.SEND_PASSWORD_RESET_EMAIL, sendResetPasswordEmail),
        takeEvery(actions.RESEND_VERIFICATION_EMAIL_REQUEST, resendVerificationEmall)
    ]);
}
