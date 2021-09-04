import firebase from 'firebase';
import {
    all, call, put, takeEvery
} from 'redux-saga/effects';
import { signOut } from '../auth/actions';
import { setErrorMessage } from '../modalHandling/actions';
import { addNotification } from '../notifications/actions';
import * as actions from './actions';
import * as profileApi from './api';

export function* linkProfileToGoogle() {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        yield firebase.auth().currentUser.linkWithPopup(provider);
        yield put(addNotification('Profile Successfully linked to Google'));
    } catch (error) {
        yield put(setErrorMessage(`Error Linking Email To Google - ${error.email}`, error));
    }
}

export function* linkProfileToFacebook(api) {
    try {
        const provider = new firebase.auth.FacebookAuthProvider();
        yield firebase.auth().currentUser.linkWithPopup(provider);
        yield call(api.linkFacebookAccount);
        yield put(addNotification('Profile Successfully linked to Facebook'));
    } catch (error) {
        yield put(setErrorMessage, `Error Linking Email To Facebook - ${error.email}`, error);
    }
}

export function* updateDisplayName(api, action) {
    try {
        yield call(api.updateDisplayName, { displayName: action.displayName });
        yield put(actions.updateDisplayNameSuccess());
        yield put(addNotification('Display Name successfully updated'));
    } catch (error) {
        yield put(setErrorMessage('Error Updating Display Name', error));
    } finally {
        yield put(actions.cancelUpdatingDisplayName());
    }
}

export function* updateTeamName(api, action) {
    try {
        yield call(api.updateTeamName, { teamName: action.teamName });
        yield put(addNotification('Team Name successfully updated'));
    } catch (error) {
        yield put(setErrorMessage('Error Updating Team Name', error));
    } finally {
        yield put(actions.cancelUpdatingTeamName());
    }
}

export function* deleteAccount(api, action) {
    try {
        const currentEmail = firebase.auth().currentUser.email;
        if (currentEmail !== action.email) {
            yield put(setErrorMessage('Error Deleting Account', { code: 'not-found', message: 'That is not your email' }));
        } else {
            yield call(api.deleteUser, { email: action.email });
            yield put(signOut());
        }
    } catch (error) {
        yield put(setErrorMessage('Error Deleting Account', error));
    } finally {
        yield put(actions.cancelDeletingAccount());
    }
}

export function* updateProfilePicture(api, action) {
    try {
        yield call(api.updateProfilePicture, ({
            photoUrl: action.photoUrl
        }));
        const userId = firebase.auth().currentUser.uid;
        yield put(actions.updateProfilePictureSuccess(action.photoUrl, userId));
        yield put(addNotification('Profile picture successfully updated'));
    } catch (error) {
        yield put(setErrorMessage('Error Updating Profile Picture', error));
    } finally {
        yield put(actions.cancelPhotoUrlBeingUpdated());
    }
}

export default function* authSaga() {
    yield all([
        takeEvery(actions.LINK_PROFILE_TO_GOOGLE, linkProfileToGoogle, profileApi),
        takeEvery(actions.LINK_PROFILE_TO_FACEBOOK, linkProfileToFacebook, profileApi),
        takeEvery(actions.UPDATE_DISPLAY_NAME_REQUEST, updateDisplayName, profileApi),
        takeEvery(actions.UPDATE_TEAM_NAME_REQUEST, updateTeamName, profileApi),
        takeEvery(actions.DELETE_ACCOUNT_REQUEST, deleteAccount, profileApi),
        takeEvery(actions.UPDATE_PROFILE_PICTURE_REQUEST, updateProfilePicture, profileApi)
    ]);
}
