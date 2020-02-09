import {
    all, takeEvery, put, call
} from 'redux-saga/effects';
import firebase from 'firebase';
import * as actions from './actions';
import * as api from './api';
import { signOut } from '../auth/actions';

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
        yield call(api.linkFacebookAccount);
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

function* updateTeamName(action) {
    try {
        yield call(api.updateTeamName, { teamName: action.teamName });
        yield put(actions.updateTeamNameSuccess());
    } catch (error) {
        yield put(actions.updateTeamNameError(error));
    }
}

function* deleteAccount(action) {
    try {
        const currentEmail = firebase.auth().currentUser.email;
        if (currentEmail !== action.email) {
            yield put(actions.deleteAccountError({ code: 'not-found', message: 'That is not your email' }));
        } else {
            yield call(api.deleteUser, { email: action.email });
            yield put(actions.deleteAccountSuccess());
            yield put(signOut());
        }
    } catch (error) {
        yield put(actions.deleteAccountError(error));
    }
}

function* updateProfilePicture(action) {
    try {
        yield call(api.updateProfilePicture, ({
            photoUrl: action.photoUrl
        }));
        const userId = firebase.auth().currentUser.uid;
        yield put(actions.updateProfilePictureSuccess(action.photoUrl, userId));
    } catch (error) {
        yield put(actions.updateProfilePictureError(error));
    }
}

export default function* authSaga() {
    yield all([
        takeEvery(actions.LINK_PROFILE_TO_GOOGLE, linkProfileToGoogle),
        takeEvery(actions.LINK_PROFILE_TO_FACEBOOK, linkProfileToFacebook),
        takeEvery(actions.UPDATE_DISPLAY_NAME_REQUEST, updateDisplayName),
        takeEvery(actions.UPDATE_TEAM_NAME_REQUEST, updateTeamName),
        takeEvery(actions.DELETE_ACCOUNT_REQUEST, deleteAccount),
        takeEvery(actions.UPDATE_PROFILE_PICTURE_REQUEST, updateProfilePicture)
    ]);
}
