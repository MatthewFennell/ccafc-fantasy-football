import fp from 'lodash/fp';
import * as actions from './actions';

export const initialState = {
    fetchingHistory: false,
    history: {}
};

const previousYearReducer = (state = initialState, action) => {
    switch (action.type) {
    case actions.SET_HISTORY_FOR_YEAR: {
        return fp.set(`history.${action.year}`, action.history)(state);
    }
    case actions.SET_FETCHING_HISTORY: {
        return fp.set('fetchingHistory', action.isFetching)(state);
    }
    default:
        return state;
    }
};

export default previousYearReducer;
