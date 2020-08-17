const pre = 'STATS/';

export const FETCH_TEAM_STATS_BY_WEEK_REQUEST = `${pre}FETCH_TEAM_STATS_BY_WEEK_REQUEST`;
export const FETCH_TEAM_STATS_BY_WEEK_SUCCESS = `${pre}FETCH_TEAM_STATS_BY_WEEK_SUCCESS`;
export const CANCEL_FETCHING_TEAM_STATS_BY_WEEK = `${pre}CANCEL_FETCHING_TEAM_STATS_BY_WEEK`;

export const fetchTeamStatsByWeekRequest = (teamId, minWeek, maxWeek) => ({
    type: FETCH_TEAM_STATS_BY_WEEK_REQUEST,
    teamId,
    minWeek,
    maxWeek
});

export const fetchTeamStatsByWeekSuccess = (teamId, minWeek, maxWeek, stats) => ({
    type: FETCH_TEAM_STATS_BY_WEEK_SUCCESS,
    teamId,
    minWeek,
    maxWeek,
    stats
});

export const cancelFetchingTeamStatsByWeek = teamId => ({
    type: CANCEL_FETCHING_TEAM_STATS_BY_WEEK,
    teamId
});
