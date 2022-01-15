import fp from 'lodash/fp';
import * as actions from './actions';

export const initialState = {
    cup: {},
    cupTwo: {},
    isFetchingCup: false,
    hasFetchedCup: false
};

const cupReducer = (state = initialState, action) => {
    switch (action.type) {
    case actions.FETCH_CUP_REQUEST: {
        return fp.set('isFetchingCup', true)(state);
    }
    case actions.SET_IS_FETCHING_CUP: {
        return fp.set('isFetchingCup', action.isFetching)(state);
    }
    case actions.FETCH_CUP_SUCCESS: {
        return {
            ...state,
            cup: action.cup,
            cupTwo: action.cupTwo,
            hasFetchedCup: true
        };
    }
    default:
        return state;
    }
};

export default cupReducer;
