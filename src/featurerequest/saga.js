import {
    all, takeEvery, put, call
} from 'redux-saga/effects';
import * as actions from './actions';
import * as api from './api';

function* addReplyToComment(action) {
    try {
        yield call(api.addReply, {
            collection: 'feature-requests',
            reply: action.reply,
            collectionId: action.featureId,
            commentId: action.commentId
        });
    } catch (error) {
        yield put(actions.commentError(error));
    }
}

function* addCommentToFeature(action) {
    try {
        yield call(api.addComment,
            {
                collection: 'feature-requests',
                comment: action.comment,
                collectionId: action.featureId
            });
    } catch (error) {
        yield put(actions.commentError(error));
    }
}

function* submitFeature(action) {
    try {
        yield call(api.submitFeature, { description: action.description });
    } catch (error) {
        yield put(actions.submitFeatureError(error));
    }
}

function* deleteComment(action) {
    try {
        yield call(api.deleteComment, {
            collection: 'feature-requests',
            collectionId: action.featureId,
            commentId: action.commentId
        });
    } catch (error) {
        yield put(actions.deleteCommentError(error));
    }
}

function* deleteReply(action) {
    try {
        yield call(api.deleteReply, {
            collection: 'feature-requests',
            collectionId: action.featureId,
            commentId: action.commentId,
            replyId: action.replyId
        });
    } catch (error) {
        yield put(actions.deleteReplyError(error));
    }
}

export default function* featureRequestSaga() {
    yield all([
        takeEvery(actions.SUBMIT_FEATURE_REQUEST, submitFeature),
        takeEvery(actions.ADD_COMMENT_TO_FEATURE_REQUEST, addCommentToFeature),
        takeEvery(actions.ADD_REPLY_TO_COMMENT_REQUEST, addReplyToComment),
        takeEvery(actions.DELETE_COMMENT_REQUEST, deleteComment),
        takeEvery(actions.DELETE_REPLY_REQUEST, deleteReply)
    ]);
}
