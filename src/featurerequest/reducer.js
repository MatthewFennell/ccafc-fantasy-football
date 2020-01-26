import * as actions from './actions';

const initState = {
    commentError: '',
    commentErrorCode: ''
};

const featureReducer = (state = initState, action) => {
    switch (action.type) {
    case actions.COMMENT_ERROR: {
        return {
            ...state,
            commentError: action.error.message,
            commentErrorCode: action.error.code
        };
    }
    case actions.CLOSE_COMMENT_ERROR: {
        return {
            ...state,
            commentError: '',
            commentErrorCode: ''
        };
    }
    default:
        return state;
    }
};

export default featureReducer;
