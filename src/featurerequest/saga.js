import {
    all, call, put, takeEvery, takeLatest
} from 'redux-saga/effects';
import { setErrorMessage } from '../modalHandling/actions';
import { addNotification } from '../notifications/actions';
import * as actions from './actions';
import * as featuresApi from './api';

export function* addReplyToComment(api, action) {
    try {
        yield call(api.addReply, {
            collection: 'feature-requests',
            reply: action.reply,
            collectionId: action.featureId,
            commentId: action.commentId
        });
    } catch (error) {
        yield put(setErrorMessage('Error Replying To Feature Request', error));
    } finally {
        yield put(actions.cancelAddingCommentToFeature());
    }
}

export function* addCommentToFeature(api, action) {
    try {
        yield call(api.addComment,
            {
                collection: 'feature-requests',
                comment: action.comment,
                collectionId: action.featureId
            });
    } catch (error) {
        yield put(setErrorMessage('Error Adding Comment To Feature Request', error));
    } finally {
        yield put(actions.cancelAddingCommentToFeature());
    }
}

export function* submitFeature(api, action) {
    try {
        yield call(api.submitFeature, {
            description: action.description,
            isBug: action.isBug
        });
        yield put(addNotification(`${action.isBug ? 'Bug' : 'Feature'} submitted successfully`));
    } catch (error) {
        yield put(setErrorMessage('Error Submitting Feature Request', error));
    } finally {
        yield put(actions.cancelAddingFeatureRequest());
    }
}

export function* deleteComment(api, action) {
    try {
        yield call(api.deleteComment, {
            collection: 'feature-requests',
            collectionId: action.featureId,
            commentId: action.commentId
        });
    } catch (error) {
        yield put(setErrorMessage('Error Deleting Comment', error));
    } finally {
        yield put(actions.cancelDeletingComment());
    }
}

export function* deleteReply(api, action) {
    try {
        yield call(api.deleteReply, {
            collection: 'feature-requests',
            collectionId: action.featureId,
            commentId: action.commentId,
            replyId: action.replyId
        });
    } catch (error) {
        yield put(setErrorMessage('Error Deleting Reply', error));
    } finally {
        yield put(actions.cancelDeletingReply());
    }
}

export default function* featureRequestSaga() {
    yield all([
        takeLatest(actions.SUBMIT_FEATURE_REQUEST, submitFeature, featuresApi),
        takeEvery(actions.ADD_COMMENT_TO_FEATURE_REQUEST, addCommentToFeature, featuresApi),
        takeEvery(actions.ADD_REPLY_TO_COMMENT_REQUEST, addReplyToComment, featuresApi),
        takeEvery(actions.DELETE_COMMENT_REQUEST, deleteComment, featuresApi),
        takeEvery(actions.DELETE_REPLY_REQUEST, deleteReply, featuresApi)
    ]);
}
