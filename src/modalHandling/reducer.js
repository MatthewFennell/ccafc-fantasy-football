import fp from 'lodash/fp';
import * as actions from './actions';

export const initialState = {
    errorCode: '',
    errorHeader: '',
    errorMessage: '',

    successMessage: ''
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
    case actions.SET_SUCCESS_MESSAGE: {
        return fp.set('successMessage', action.message)(state);
    }
    case actions.CLOSE_SUCCESS_MESSAGE: {
        return fp.set('successMessage', '')(state);
    }
    default:
        return state;
    }
};

export default errorReducer;
