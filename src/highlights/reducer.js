import fp from 'lodash/fp';
import * as actions from './actions';

const initialState = {
    submitLinkError: '',
    submitLinkErrorCode: ''
};

const highlightsReducer = (state = initialState, action) => {
    switch (action.type) {
    case actions.SUBMIT_HIGHLIGHT_ERROR: {
        return {
            ...state,
            submitLinkError: action.error.message,
            submitLinkErrorCode: action.error.code
        };
    }
    case actions.CLOSE_HIGHLIGHT_ERROR: {
        return {
            ...state,
            submitLinkError: '',
            submitLinkErrorCode: ''
        };
    }
    default:
        return state;
    }
};

export default highlightsReducer;
