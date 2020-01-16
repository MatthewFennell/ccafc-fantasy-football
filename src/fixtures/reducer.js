import fp from 'lodash/fp';
import * as actions from './actions';

const initialState = {
    fixtures: [],
    loadingFixtures: false,
    loadingMyTeam: false,
    myTeam: ''
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
    case actions.FETCH_MY_TEAM_ERROR: {
        return fp.set('loadingMyTeam', false)(state);
    }
    case actions.SET_MY_TEAM_ERROR: {
        return fp.set('loadingMyTeam', false)(state);
    }
    case actions.SET_MY_TEAM_REQUEST: {
        return fp.set('loadingMyTeam', true)(state);
    }
    default:
        return state;
    }
};

export default fixturesReducer;
