import fp from 'lodash/fp';

export const getCurrentMinWeek = props => parseInt(fp.flow(fp.get('match'), fp.get('params'), fp.get('minWeek'))(props), 10);
export const getCurrentMaxWeek = props => parseInt(fp.flow(fp.get('match'), fp.get('params'), fp.get('maxWeek'))(props), 10);
export const getCurrentTeam = props => fp.flow(fp.get('match'), fp.get('params'), fp.get('teamId'))(props);

export const fetchedStatsAlready = (state, teamId, week) => fp.flow(
    fp.get(teamId),
    fp.get(`week-${week}`),
    fp.get('fetched')
)(state.stats.teamStatsByWeek);
