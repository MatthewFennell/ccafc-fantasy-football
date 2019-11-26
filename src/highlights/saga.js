import {
    all, takeEvery, put, select, call
} from 'redux-saga/effects';
import firebase from 'firebase';
import * as actions from './actions';
import * as api from './api';

function* submitHighlight(action) {
    try {
        yield call(api.submitVideo, {
            videoId: action.videoId,
            title: action.title,
            email: firebase.auth().currentUser.email
        });
    } catch (error) {
        yield put(actions.submitHighlightError(error));
    }
}

export default function* overviewSaga() {
    yield all([
        takeEvery(actions.SUBMIT_HIGHLIGHT_REQUEST, submitHighlight)
    ]);
}
