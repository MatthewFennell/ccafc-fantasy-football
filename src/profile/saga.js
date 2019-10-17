import {
    all, takeEvery, put, call
} from 'redux-saga/effects';
import firebase from 'firebase';
import * as actions from './actions';
import * as api from './api';

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

function* updateDisplayName(action) {
    try {
        yield call(api.updateDisplayName, { displayName: action.displayName });
        yield put(actions.updateDisplayNameSuccess());
    } catch (error) {
        yield put(actions.updateDisplayNameError(error));
    }
}

export default function* authSaga() {
    yield all([
        takeEvery(actions.LINK_PROFILE_TO_GOOGLE, linkProfileToGoogle),
        takeEvery(actions.LINK_PROFILE_TO_FACEBOOK, linkProfileToFacebook),
        takeEvery(actions.UPDATE_DISPLAY_NAME_REQUEST, updateDisplayName)
    ]);
}
