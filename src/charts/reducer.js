import fp from 'lodash/fp';
import * as actions from './actions';

const initState = {
    allTeams: []
};

const chartsReducer = (state = initState, action) => {
    switch (action.type) {
    case actions.FETCH_ALL_TEAMS_SUCCESS: {
        return fp.set('allTeams', action.allTeams)(state);
    }
    default:
        return state;
    }
};

export default chartsReducer;
