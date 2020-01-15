import fp from 'lodash/fp';
import * as actions from './actions';

const initialState = {
    fixtures: [],
    loadingFixtures: false
};

const fixturesReducer = (state = initialState, action) => {
    switch (action.type) {
    case actions.FETCH_FIXTURES_SUCCESS: {
        return {
            ...state,
            fixtures: action.fixtures,
            loadingFixtures: false
        };
    }
    case actions.FETCH_FIXTURES_REQUEST: {
        return fp.set('loadingFixtures', true)(state);
    }
    case actions.FETCH_FIXTURES_ERROR: {
        return fp.set('loadingFixtures', false)(state);
    }
    default:
        return state;
    }
};

export default fixturesReducer;
