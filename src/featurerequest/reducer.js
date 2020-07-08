import fp from 'lodash/fp';
import * as actions from './actions';

export const initialState = {
    errorHeader: '',
    errorMessage: '',
    errorCode: '',

    successMessage: '',

    isAddingCommentToFeature: false,
    isSubmittingFeature: false
};

const featureReducer = (state = initialState, action) => {
    switch (action.type) {
    case actions.SET_SUCCESS_MESSAGE: {
        return fp.flow(
            fp.set('successMessage', action.message),
            fp.set('isSubmittingFeature', false)
        )(state);
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
    case actions.SET_ADDING_COMMENT_TO_FEATURE: {
        return fp.set('isAddingCommentToFeature')(action.isAdding)(state);
    }
    case actions.CLOSE_SUCCESS_MESSAGE: {
        return fp.set('successMessage', '')(state);
    }
    case actions.FEATURE_REQUEST_ERROR: {
        return {
            ...state,
            errorMessage: action.error.message,
            errorCode: action.error.code,
            errorHeader: action.header,
            isAddingCommentToFeature: false
        };
    }
    case actions.CLOSE_FEATURE_REQUEST_ERROR: {
        return {
            ...state,
            errorMessage: '',
            errorCode: '',
            errorHeader: ''
        };
    }
    default:
        return state;
    }
};

export default featureReducer;
