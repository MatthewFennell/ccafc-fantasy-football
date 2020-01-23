const pre = 'features/';

export const SUBMIT_FEATURE_REQUEST = `${pre}SUBMIT_FEATURE_REQUEST`;
export const SUBMIT_FEATURE_ERROR = `${pre}SUBMIT_FEATURE_ERROR`;

export const ADD_COMMENT_TO_FEATURE_REQUEST = `${pre}ADD_COMMENT_TO_FEATURE_REQUEST`;
export const ADD_COMMENT_TO_FEATURE_ERROR = `${pre}ADD_COMMENT_TO_FEATURE_ERROR`;

export const ADD_REPLY_TO_COMMENT_REQUEST = `${pre}ADD_REPLY_TO_COMMENT_REQUEST`;
export const ADD_REPLY_TO_COMMENT_ERROR = `${pre}ADD_REPLY_TO_COMMENT_ERROR`;

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
