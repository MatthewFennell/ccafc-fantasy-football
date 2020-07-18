import * as actions from './actions';

export const initialState = {
    errorCode: '',
    errorHeader: '',
    errorMessage: ''
};

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
    case actions.SET_ERROR_MESSAGE: {
        return {
            ...state,
            errorMessage: action.error.message,
            errorCode: action.error.code,
            errorHeader: action.header
        };
    }
    case actions.CLOSE_ERROR_MESSAGE: {
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

export default errorReducer;
