import {
    all, takeEvery, put, call, select
} from 'redux-saga/effects';
import firebase from 'firebase';
import * as actions from './actions';
import * as api from './api';
import * as selectors from './selectors';

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
        const fetchedVideos = yield select(selectors.fetchedVideos);
        if (!fetchedVideos) {
            const highlights = yield call(api.getHighlights);
            yield put(actions.fetchHighlightsSuccess(highlights));
        } else {
            yield put(actions.alreadyFetchedVideos());
        }
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

function* highlightsToBeApproved() {
    try {
        const alreadyFetched = yield select(selectors.fetchedApprovedVideos);
        if (!alreadyFetched) {
            const highlights = yield call(api.getHighlightsToBeApproved);
            yield put(actions.fetchUserHighlightsToBeApprovedSuccess(highlights));
        } else {
            yield put(actions.alreadyFetchedApprovedHighlights());
        }
    } catch (error) {
        yield put(actions.fetchUserHighlightsToBeApprovedError(error));
    }
}

function* rejectedHighlights() {
    try {
        const alreadyFetched = yield select(selectors.fetchedRejectedVideos);
        if (!alreadyFetched) {
            const highlights = yield call(api.getRejectedHighlights);
            yield put(actions.fetchRejectedHighlightsSuccess(highlights));
        } else {
            yield put(actions.alreadyFetchedRejectedVideos());
        }
    } catch (error) {
        yield put(actions.fetchRejectedHighlightsError(error));
    }
}

export default function* overviewSaga() {
    yield all([
        takeEvery(actions.SUBMIT_HIGHLIGHT_REQUEST, submitHighlight),
        takeEvery(actions.FETCH_HIGHLIGHTS_REQUEST, getHighlights),
        takeEvery(actions.UPVOTE_HIGHLIGHT_REQUEST, upvoteHighlight),
        takeEvery(actions.DOWNVOTE_HIGHLIGHT_REQUEST, downvoteHighlight),
        takeEvery(actions.FETCH_USER_HIGHLIGHTS_TO_BE_APPROVED_REQUEST, highlightsToBeApproved),
        takeEvery(actions.FETCH_REJECTED_HIGHLIGHTS_REQUEST, rejectedHighlights)
    ]);
}
