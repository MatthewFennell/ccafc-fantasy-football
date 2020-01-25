const pre = 'features/';

export const SUBMIT_FEATURE_REQUEST = `${pre}SUBMIT_FEATURE_REQUEST`;
export const SUBMIT_FEATURE_ERROR = `${pre}SUBMIT_FEATURE_ERROR`;

export const ADD_COMMENT_TO_FEATURE_REQUEST = `${pre}ADD_COMMENT_TO_FEATURE_REQUEST`;
export const ADD_COMMENT_TO_FEATURE_ERROR = `${pre}ADD_COMMENT_TO_FEATURE_ERROR`;

export const ADD_REPLY_TO_COMMENT_REQUEST = `${pre}ADD_REPLY_TO_COMMENT_REQUEST`;
export const ADD_REPLY_TO_COMMENT_ERROR = `${pre}ADD_REPLY_TO_COMMENT_ERROR`; // TO:DO - Make common section for comments
// Object creators / action definers etc

export const DELETE_COMMENT_REQUEST = `${pre}DELETE_COMMENT_REQUEST`;
export const DELETE_COMMENT_ERROR = `${pre}DELETE_COMMENT_ERROR`;

export const DELETE_REPLY_REQUEST = `${pre}DELETE_REPLY_REQUEST`;
export const DELETE_REPLY_ERROR = `${pre}DELETE_REPLY_ERROR`;

export const submitFeatureRequest = description => ({
    type: SUBMIT_FEATURE_REQUEST,
    description
});

export const submitFeatureError = error => ({
    type: SUBMIT_FEATURE_ERROR,
    error
});

export const addCommentToFeatureRequest = (comment, featureId) => ({
    type: ADD_COMMENT_TO_FEATURE_REQUEST,
    comment,
    featureId
});

export const addCommentToFeatureError = error => ({
    type: ADD_COMMENT_TO_FEATURE_ERROR,
    error
});

export const addReplyToCommentRequest = (reply, featureId, commentId) => ({
    type: ADD_REPLY_TO_COMMENT_REQUEST,
    reply,
    featureId,
    commentId
});

export const addReplyToCommentError = error => ({
    type: ADD_REPLY_TO_COMMENT_ERROR,
    error
});

export const deleteCommentRequest = (featureId, commentId) => ({
    type: DELETE_COMMENT_REQUEST,
    featureId,
    commentId
});

export const deleteCommentError = error => ({
    type: DELETE_COMMENT_ERROR,
    error
});

export const deleteReplyRequest = (featureId, commentId, replyId) => ({
    type: DELETE_REPLY_REQUEST,
    featureId,
    commentId,
    replyId
});

export const deleteReplyError = error => ({
    type: DELETE_REPLY_ERROR,
    error
});
