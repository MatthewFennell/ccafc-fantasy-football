import fp from 'lodash/fp';
import * as actions from './actions';

const initState = {
    teamStatsByWeek: {}
};

const statsReducer = (state = initState, action) => {
    switch (action.type) {
    case actions.FETCH_TEAM_STATS_BY_WEEK_REQUEST: {
        return fp.set(`teamStatsByWeek.${action.teamId}.fetching`, true)(state);
    }
    case actions.FETCH_TEAM_STATS_BY_WEEK_ERROR: {
        return fp.set(`teamStatsByWeek.${action.teamId}.fetching`, false)(state);
    }
    case actions.FETCH_TEAM_STATS_BY_WEEK_SUCCESS: {
        const fetchInfo = property => fp.flow(
            fp.get(action.teamId),
            fp.get(property)
        )(state.teamStatsByWeek) || [];

        const currentStats = fetchInfo('stats');
        const weeksFetched = fetchInfo('weeksFetched');

        return fp.flow(
            fp.set(`teamStatsByWeek.${action.teamId}.stats`, fp.union(currentStats, action.stats)),
            fp.set(`teamStatsByWeek.${action.teamId}.fetching`, false),
            fp.set(`teamStatsByWeek.${action.teamId}.weeksFetched`, fp.union(fp.range(action.minWeek, action.maxWeek + 1), weeksFetched).sort())
        )(state);
    }
    default:
        return state;
    }
};

export default statsReducer;
