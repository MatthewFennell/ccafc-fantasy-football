import {
    all, call, put, select, takeEvery
} from 'redux-saga/effects';
import { setErrorMessage } from '../modalHandling/actions';
import { addNotification } from '../notifications/actions';
import * as actions from './actions';
import * as highlightsApi from './api';
import * as selectors from './selectors';

export function* submitHighlight(api, action) {
    try {
        yield call(api.submitVideo, {
            videoId: action.videoId,
            title: action.title
        });
        yield put(addNotification('Highlight successfully submitted for approval'));
    } catch (error) {
        yield put(setErrorMessage('Error Submitting Highlight', error));
    } finally {
        yield put(actions.cancelSubmittingHighlight());
    }
}

export function* getHighlights(api) {
    try {
        const fetchedVideos = yield select(selectors.fetchedVideos);
        if (!fetchedVideos) {
            const highlights = yield call(api.getHighlights);
            yield put(actions.fetchHighlightsSuccess(highlights));
        }
    } catch (error) {
        yield put(setErrorMessage('Error Fetching Highlights', error));
    } finally {
        yield put(actions.cancelFetchingVideos());
    }
}

export function* upvoteHighlight(api, action) {
    try {
        const result = yield call(api.upvoteHighlight, ({ highlightId: action.highlightId }));
        yield put(actions.upvoteHighlightSuccess(result));
    } catch (error) {
        yield put(setErrorMessage('Error Upvoting Highlight', error));
    } finally {
        yield put(actions.cancelVotingOnHighlight());
    }
}

export function* downvoteHighlight(api, action) {
    try {
        const result = yield call(api.downvoteHighlight, ({ highlightId: action.highlightId }));
        yield put(actions.downvoteHighlightSuccess(result));
    } catch (error) {
        yield put(setErrorMessage('Error Downvoting Highlight', error));
    } finally {
        yield put(actions.cancelVotingOnHighlight());
    }
}

export function* highlightsToBeApproved(api) {
    try {
        const alreadyFetched = yield select(selectors.fetchedApprovedVideos);
        if (!alreadyFetched) {
            const highlights = yield call(api.getHighlightsToBeApproved);
            yield put(actions.fetchUserHighlightsToBeApprovedSuccess(highlights));
        }
    } catch (error) {
        yield put(setErrorMessage('Error Fetching Highlights For Approval', error));
    } finally {
        yield put(actions.cancelLoadingVideosToBeApproved());
    }
}

export function* rejectedHighlights(api) {
    try {
        const alreadyFetched = yield select(selectors.fetchedRejectedVideos);
        if (!alreadyFetched) {
            const highlights = yield call(api.getRejectedHighlights);
            yield put(actions.fetchRejectedHighlightsSuccess(highlights));
        }
    } catch (error) {
        yield put(setErrorMessage('Error Fetching Rejected Highlights', error));
    } finally {
        yield put(actions.cancelFetchingRejectedVideos());
    }
}

export function* addCommentToVideo(api, action) {
    try {
        const newHighlight = yield call(api.addComment, ({
            collection: 'highlights',
            collectionId: action.videoId,
            comment: action.comment
        }));
        yield put(actions.addCommentToVideoSuccess(newHighlight));
    } catch (error) {
        yield put(setErrorMessage('Error Adding Comment', error));
    } finally {
        yield put(actions.cancelAddingCommentToVideo());
    }
}

export function* addReplyToVideo(api, action) {
    try {
        const newHighlight = yield call(api.addReply, ({
            collection: 'highlights',
            collectionId: action.videoId,
            commentId: action.commentId,
            reply: action.reply
        }));
        yield put(actions.addReplyToVideoSuccess(newHighlight));
    } catch (error) {
        yield put(setErrorMessage('Error Replying To Comment', error));
    } finally {
        yield put(actions.cancelAddingCommentToVideo());
    }
}

export function* deleteComment(api, action) {
    try {
        yield call(api.deleteComment, {
            collection: 'highlights',
            collectionId: action.videoId,
            commentId: action.commentId
        });
        yield put(actions.deleteCommentSuccess(action.videoId, action.commentId));
    } catch (error) {
        yield put(setErrorMessage('Error Deleting Comment', error));
    } finally {
        yield put(actions.cancelDeletingComment());
    }
}

export function* deleteReply(api, action) {
    try {
        yield call(api.deleteReply, {
            collection: 'highlights',
            collectionId: action.videoId,
            commentId: action.commentId,
            replyId: action.replyId
        });
        yield put(actions.deleteReplySuccess(action.videoId, action.commentId, action.replyId));
    } catch (error) {
        yield put(setErrorMessage('Error Deleting Reply', error));
    } finally {
        yield put(actions.cancelDeletingReply());
    }
}

export default function* overviewSaga() {
    yield all([
        takeEvery(actions.SUBMIT_HIGHLIGHT_REQUEST, submitHighlight, highlightsApi),
        takeEvery(actions.FETCH_HIGHLIGHTS_REQUEST, getHighlights, highlightsApi),
        takeEvery(actions.UPVOTE_HIGHLIGHT_REQUEST, upvoteHighlight, highlightsApi),
        takeEvery(actions.DOWNVOTE_HIGHLIGHT_REQUEST, downvoteHighlight, highlightsApi),
        takeEvery(actions.FETCH_USER_HIGHLIGHTS_TO_BE_APPROVED_REQUEST,
            highlightsToBeApproved, highlightsApi),
        takeEvery(actions.FETCH_REJECTED_HIGHLIGHTS_REQUEST, rejectedHighlights, highlightsApi),
        takeEvery(actions.ADD_COMMENT_TO_VIDEO_REQUEST, addCommentToVideo, highlightsApi),
        takeEvery(actions.ADD_REPLY_TO_VIDEO_REQUEST, addReplyToVideo, highlightsApi),
        takeEvery(actions.DELETE_COMMENT_REQUEST, deleteComment, highlightsApi),
        takeEvery(actions.DELETE_REPLY_REQUEST, deleteReply, highlightsApi)
    ]);
}
