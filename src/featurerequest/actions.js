const pre = 'featurerequest/';

export const SUBMIT_FEATURE_REQUEST = `${pre}SUBMIT_FEATURE_REQUEST`;
export const SUBMIT_FEATURE_ERROR = `${pre}SUBMIT_FEATURE_ERROR`;


export const ADD_COMMENT_REQUEST = `${pre}ADD_COMMENT_REQUEST`;
export const ADD_COMMENT_ERROR = `${pre}ADD_COMMENT_ERROR`;

export const submitFeatureRequest = description => ({
    type: SUBMIT_FEATURE_REQUEST,
    description
});

export const submitFeatureError = error => ({
    type: SUBMIT_FEATURE_ERROR,
    error
});

export const addCommentRequest = description => ({
    type: ADD_COMMENT_REQUEST,
    description
});
