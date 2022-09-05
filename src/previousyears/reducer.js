import fp from 'lodash/fp';
import * as actions from './actions';

export const initialState = {
    fetchingHistory: false,
    history: {},
    previousYears: []
};

const previousYearReducer = (state = initialState, action) => {
    switch (action.type) {
    case actions.SET_HISTORY_FOR_YEAR: {
        return fp.set(`history.${action.year}`, action.history)(state);
    }
    case actions.SET_FETCHING_HISTORY: {
        return fp.set('fetchingHistory', action.isFetching)(state);
    }
    case actions.SET_PREVIOUS_YEARS_AVAILABLE: {
        return fp.set('previousYears', action.previousYears)(state);
    }
    default:
        return state;
    }
};

export default previousYearReducer;
