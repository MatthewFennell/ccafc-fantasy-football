const pre = 'features/';

export const ADD_COMMENT_TO_FEATURE_REQUEST = `${pre}ADD_COMMENT_TO_FEATURE_REQUEST`;
export const ADD_REPLY_TO_COMMENT_REQUEST = `${pre}ADD_REPLY_TO_COMMENT_REQUEST`;
export const CANCEL_ADDING_COMMENT_TO_FEATURE = `${pre}CANCEL_ADDING_COMMENT_TO_FEATURE`;

export const DELETE_COMMENT_REQUEST = `${pre}DELETE_COMMENT_REQUEST`;
export const CANCEL_DELETING_COMMENT = `${pre}CANCEL_DELETING_COMMENT`;
export const DELETE_REPLY_REQUEST = `${pre}DELETE_REPLY_REQUEST`;
export const CANCEL_DELETING_REPLY = `${pre}CANCEL_DELETING_REPLY`;

export const SUBMIT_FEATURE_REQUEST = `${pre}SUBMIT_FEATURE_REQUEST`;
export const CANCEL_ADDING_FEATURE_REQUEST = `${pre}CANCEL_ADDING_FEATURE_REQUEST`;

export const cancelAddingFeatureRequest = () => ({
    type: CANCEL_ADDING_FEATURE_REQUEST
});

export const cancelAddingCommentToFeature = () => ({
    type: CANCEL_ADDING_COMMENT_TO_FEATURE
});

export const submitFeatureRequest = (description, isBug) => ({
    type: SUBMIT_FEATURE_REQUEST,
    description,
    isBug
});

export const addCommentToFeatureRequest = (comment, featureId) => ({
    type: ADD_COMMENT_TO_FEATURE_REQUEST,
    comment,
    featureId
});

export const addReplyToCommentRequest = (reply, featureId, commentId) => ({
    type: ADD_REPLY_TO_COMMENT_REQUEST,
    reply,
    featureId,
    commentId
});

export const deleteCommentRequest = (featureId, commentId) => ({
    type: DELETE_COMMENT_REQUEST,
    featureId,
    commentId
});

export const cancelDeletingComment = () => ({
    type: CANCEL_DELETING_COMMENT
});

export const cancelDeletingReply = () => ({
    type: CANCEL_DELETING_REPLY
});

export const deleteReplyRequest = (featureId, commentId, replyId) => ({
    type: DELETE_REPLY_REQUEST,
    featureId,
    commentId,
    replyId
});
