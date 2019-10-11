import fp from 'lodash/fp';
import * as actions from './actions';

const initState = {
    activeTeam: {}
};

const activeTeamReducer = (state = initState, action) => {
    switch (action.type) {
    case actions.FETCH_ACTIVE_TEAM_SUCCESS: {
        return fp.flow(
            fp.set(`activeTeam.${action.userId}`, action.activeTeam),
            fp.set(`activeTeam.${action.userId}.fetching`, false),
            fp.set(`activeTeam.${action.userId}.fetched`, true),
        )(state);
    }
    case actions.FETCH_ACTIVE_TEAM_ERROR: {
        return fp.set(`activeTeam.${action.userId}.fetching`, false)(state);
    }
    default:
        return state;
    }
};

export default activeTeamReducer;
