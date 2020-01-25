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
        yield put(actions.addReplyToCommentError(error));
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
        yield put(actions.addCommentToFeatureError(error));
    }
}

function* submitFeature(action) {
    try {
        yield call(api.submitFeature, { description: action.description });
    } catch (error) {
        yield put(actions.submitFeatureError(error));
    }
}

export default function* featureRequestSaga() {
    yield all([
        takeEvery(actions.SUBMIT_FEATURE_REQUEST, submitFeature),
        takeEvery(actions.ADD_COMMENT_TO_FEATURE_REQUEST, addCommentToFeature),
        takeEvery(actions.ADD_REPLY_TO_COMMENT_REQUEST, addReplyToComment)
    ]);
}
