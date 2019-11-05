import fp from 'lodash/fp';
import * as actions from './actions';

const initState = {
    teamStatsByWeek: {},
    minWeekFetched: null,
    maxWeekFetched: null
};

const statsReducer = (state = initState, action) => {
    switch (action.type) {
    case actions.FETCH_TEAM_STATS_BY_WEEK_REQUEST: {
        return fp.set(`teamStatsByWeek.${action.teamId}.week-${action.week}.fetching`, true)(state);
    }
    case actions.FETCH_TEAM_STATS_BY_WEEK_SUCCESS: {
        return fp.flow(
            fp.set('minWeekFetched', Math.min(state.minWeekFetched, action.minWeek) || action.minWeek),
            fp.set('maxWeekFetched', Math.max(state.maxWeekFetched, action.maxWeek) || action.maxWeek),
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
