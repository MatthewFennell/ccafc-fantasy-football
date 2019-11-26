import {
    all, takeEvery, put, call
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

function* getHighlights() {
    try {
        const highlights = yield call(api.getHighlights);
        yield put(actions.fetchHighlightsSuccess(highlights));
    } catch (error) {
        yield put(actions.fetchHighlightsError(error));
    }
}

function* upvoteHighlight(action) {
    try {
        const result = yield call(api.upvoteHighlight, ({ highlightId: action.highlightId }));
        yield put(actions.upvoteHighlightSuccess(result));
    } catch (error) {
        yield put(actions.upvoteHighlightError(error));
    }
}

function* downvoteHighlight(action) {
    try {
        const result = yield call(api.downvoteHighlight, ({ highlightId: action.highlightId }));
        yield put(actions.downvoteHighlightSuccess(result));
    } catch (error) {
        yield put(actions.downvoteHighlightError(error));
    }
}

export default function* overviewSaga() {
    yield all([
        takeEvery(actions.SUBMIT_HIGHLIGHT_REQUEST, submitHighlight),
        takeEvery(actions.FETCH_HIGHLIGHTS_REQUEST, getHighlights),
        takeEvery(actions.UPVOTE_HIGHLIGHT_REQUEST, upvoteHighlight),
        takeEvery(actions.DOWNVOTE_HIGHLIGHT_REQUEST, downvoteHighlight)
    ]);
}
