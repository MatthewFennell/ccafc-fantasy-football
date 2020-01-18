const pre = 'featurerequest/';

export const SUBMIT_FEATURE_REQUEST_REQUEST = `${pre}SUBMIT_FEATURE_REQUEST_REQUEST`;
export const SUBMIT_FEATURE_REQUEST_SUCCESS = `${pre}SUBMIT_FEATURE_REQUEST_SUCCESS`;
export const SUBMIT_FEATURE_REQUEST_ERROR = `${pre}SUBMIT_FEATURE_REQUEST_ERROR`;

export const submitFeatureRequest = description => ({
    type: SUBMIT_FEATURE_REQUEST_REQUEST,
    description
});

export const submitFeatureError = error => ({
    type: SUBMIT_FEATURE_REQUEST_ERROR,
    error
});
