import fp from 'lodash/fp';
import * as actions from './actions';

export const initialState = {
    successMessage: '',
    isAddingCommentToFeature: false,
    isSubmittingFeature: false,
    commentBeingDeletedInfo: { },
    replyBeingDeletedInfo: {}
};

const featureReducer = (state = initialState, action) => {
    switch (action.type) {
    case actions.SET_SUCCESS_MESSAGE: {
        return fp.set('successMessage', action.message)(state);
    }
    case actions.DELETE_COMMENT_REQUEST: {
        return fp.set('commentBeingDeletedInfo', ({
            commentId: action.commentId,
            featureId: action.featureId
        }))(state);
    }
    case actions.DELETE_REPLY_REQUEST: {
        return fp.set('replyBeingDeletedInfo', ({
            commentId: action.commentId,
            featureId: action.featureId,
            replyId: action.replyId
        }))(state);
    }
    case actions.CANCEL_DELETING_COMMENT: {
        return fp.set('commentBeingDeletedInfo', {})(state);
    }
    case actions.CANCEL_DELETING_REPLY: {
        return fp.set('replyBeingDeletedInfo', {})(state);
    }
    case actions.SUBMIT_FEATURE_REQUEST: {
        return fp.set('isSubmittingFeature', true)(state);
    }
    case actions.ADD_COMMENT_TO_FEATURE_REQUEST: {
        return fp.set('isAddingCommentToFeature')(true)(state);
    }
    case actions.ADD_REPLY_TO_COMMENT_REQUEST: {
        return fp.set('isAddingCommentToFeature')(true)(state);
    }
    case actions.CLOSE_SUCCESS_MESSAGE: {
        return fp.set('successMessage', '')(state);
    }
    case actions.CANCEL_ADDING_FEATURE_REQUEST: {
        return fp.set('isSubmittingFeature', false)(state);
    }
    case actions.CANCEL_ADDING_COMMENT_TO_FEATURE: {
        return fp.set('isAddingCommentToFeature', false)(state);
    }
    default:
        return state;
    }
};

export default featureReducer;
