import {
    all, call, takeEvery, put, delay, fork
} from 'redux-saga/effects';
import firebase from 'firebase';
import { push } from 'connected-react-router';
import { constants } from 'react-redux-firebase';
import * as actions from './actions';
import * as authApi from './api';
import * as consts from '../constants';
import { fetchMaxGameWeekRequest } from '../overview/actions';
import { setErrorMessage } from '../errorHandling/actions';

const actionCodeSettings = {
    url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    handleCodeInApp: true
};

export function* signOut() {
    try {
        yield firebase.auth().signOut();
        yield put(actions.signOutSuccess());
    } catch (error) {
        yield put(setErrorMessage('Error Signing Out', error));
    }
}

export function* setAppLoading() {
    yield put(actions.setLoadingApp(true));
    yield delay(3000);
    yield put(actions.setLoadingApp(false));
}

export function* loggingIn(api, action) {
    try {
        yield fork(setAppLoading);
        yield put(fetchMaxGameWeekRequest());
        if (action.auth && !action.auth.emailVerified) {
            yield put(push(consts.URL.VERIFY_EMAIL));
        }
        const user = yield firebase.auth().currentUser.getIdTokenResult();
        const rolePermissions = yield call(api.getRolePermissions);
        yield put(actions.setPermissionsMappingsAndRoles(rolePermissions));

        yield all(rolePermissions.allRoles.map(role => {
            if (user.claims[role]) {
                const permissions = rolePermissions.mappings[role];
                return put(actions.addPermissions(permissions));
            }
            return null;
        }));
        yield put(actions.setLoadedPermissions(true));
    } catch (error) {
        yield put(setErrorMessage('Error Signing In', error));
    }
}

export function* signUp(api, action) {
    try {
        yield firebase.auth().createUserWithEmailAndPassword(action.email, action.password);
        yield call(api.updateDisplayName, ({ displayName: action.displayName }));
        yield delay(2000);
        yield firebase.auth().currentUser.sendEmailVeriication(actionCodeSettings);
    } catch (error) {
        yield put(setErrorMessage('Error Signing Up', error));
    }
}

export function* signIn(action) {
    try {
        yield firebase
            .auth()
            .signInWithEmailAndPassword(action.email, action.password);
        yield put(actions.signInSuccess());
    } catch (error) {
        yield put(setErrorMessage('Error Signing In', error));
    }
}

export function* sendResetPasswordEmail(action) {
    try {
        yield firebase.auth().sendPasswordResetEmail(action.email);
    } catch (error) {
        yield put(setErrorMessage('Error Sending Password Reset Email', error));
    }
}

export function* resendVerificationEmall() {
    try {
        yield firebase.auth().currentUser.sendEmailVerification(actionCodeSettings);
    } catch (error) {
        yield put(setErrorMessage('Error Sending Verification Email', error));
    } finally {
        yield put(actions.cancelSendingEmailVerification());
    }
}

export function* editDisabledPage(api, action) {
    try {
        yield call(api.editDisabledPages, ({
            page: action.page,
            isDisabled: action.isDisabled
        }));
    } catch (error) {
        yield put(setErrorMessage('Error Editing Disabled Pages', error));
    } finally {
        yield put(actions.cancelEditingPage(''));
    }
}

export default function* authSaga() {
    yield all([
        takeEvery(actions.SIGN_OUT, signOut),
        takeEvery(constants.actionTypes.LOGIN, loggingIn, authApi),
        takeEvery(actions.SIGN_UP, signUp, authApi),
        takeEvery(actions.SIGN_IN, signIn),
        takeEvery(actions.SEND_PASSWORD_RESET_EMAIL, sendResetPasswordEmail),
        takeEvery(actions.RESEND_VERIFICATION_EMAIL_REQUEST, resendVerificationEmall),
        takeEvery(actions.EDIT_DISABLED_PAGE_REQUEST, editDisabledPage, authApi)
    ]);
}
