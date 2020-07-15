import fp from 'lodash/fp';
import * as actions from './actions';

export const initialState = {
    fixtures: [],
    loadingFixtures: false,
    loadingMyTeam: false,
    myTeam: '',

    successMessage: ''
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
    case actions.ALREADY_FETCHED_FIXTURES: {
        return fp.set('loadingFixtures', false)(state);
    }
    case actions.SET_MY_TEAM: {
        return {
            ...state,
            myTeam: action.team,
            loadingMyTeam: false
        };
    }
    case actions.FETCH_MY_TEAM_REQUEST: {
        return fp.set('loadingMyTeam', true)(state);
    }
    case actions.CANCEL_LOADING_MY_TEAM: {
        return fp.set('loadingMyTeam', false)(state);
    }
    case actions.SET_MY_TEAM_REQUEST: {
        return fp.set('loadingMyTeam', true)(state);
    }
    case actions.CANCEL_FETCHING_FIXTURES_AND_TEAM: {
        return {
            ...state,
            loadingFixtures: false,
            loadingMyTeam: false
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

export default fixturesReducer;
