import fp from 'lodash/fp';
import * as actions from './actions';

const initState = {
    teamStatsByWeek: {}
};

const statsReducer = (state = initState, action) => {
    switch (action.type) {
    case actions.FETCH_TEAM_STATS_BY_WEEK_REQUEST: {
        return fp.set(`teamStatsByWeek.${action.teamId}.week-${action.week}.fetching`, true)(state);
    }
    case actions.FETCH_TEAM_STATS_BY_WEEK_SUCCESS: {
        return fp.flow(
            fp.set(`teamStatsByWeek.${action.teamId}.week-${action.week}.fetching`, false),
            fp.set(`teamStatsByWeek.${action.teamId}.week-${action.week}.fetched`, true),
            fp.set(`teamStatsByWeek.${action.teamId}.week-${action.week}.stats`, action.stats)
        )(state);
    }
    case actions.FETCH_TEAM_STATS_BY_WEEK_ERROR: {
        return fp.set(`teamStatsByWeek.${action.teamId}.week-${action.week}.fetching`, false)(state);
    }
    default:
        return state;
    }
};

export default statsReducer;
