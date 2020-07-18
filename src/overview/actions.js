const pre = 'OVERVIEW/';

export const FETCH_MAX_GAMEWEEK_REQUEST = `${pre}FETCH_MAX_GAMEWEEK_REQUEST`;
export const FETCH_MAX_GAMEWEEK_SUCCESS = `${pre}FETCH_MAX_GAMEWEEK_SUCCESS`;

export const CHANGE_ACTIVE_GAME_WEEK = `${pre}CHANGE_ACTIVE_GAME_WEEK`;

export const FETCH_USER_STATS_REQUEST = `${pre}FETCH_USER_STATS_REQUEST`;
export const FETCH_USER_STATS_SUCCESS = `${pre}FETCH_USER_STATS_SUCCESS`;
export const CANCEL_FETCHING_USER_STATS = `${pre}CANCEL_FETCHING_USER_STATS`;

export const FETCH_USER_INFO_FOR_WEEK_REQUEST = `${pre}FETCH_USER_INFO_FOR_WEEK_REQUEST`;
export const FETCH_USER_INFO_FOR_WEEK_SUCCESS = `${pre}FETCH_USER_INFO_FOR_WEEK_SUCCESS`;
export const CANCEL_FETCHING_USER_INFO_FOR_WEEK = `${pre}CANCEL_FETCHING_USER_INFO_FOR_WEEK`;

export const FETCH_USER_INFO_FOR_WEEK_REQUEST_BACKGROUND = `${pre}FETCH_USER_INFO_FOR_WEEK_REQUEST_BACKGROUND`;

export const cancelFetchingUserStats = userId => ({
    type: CANCEL_FETCHING_USER_STATS,
    userId
});

export const fetchUserInfoForWeekRequestBackground = (userId, week) => ({
    type: FETCH_USER_INFO_FOR_WEEK_REQUEST_BACKGROUND,
    userId,
    week
});

export const fetchUserInfoForWeekRequest = (userId, week) => ({
    type: FETCH_USER_INFO_FOR_WEEK_REQUEST,
    userId,
    week
});

export const fetchUserInfoForWeekSuccess = (userId, week, userInfo) => ({
    type: FETCH_USER_INFO_FOR_WEEK_SUCCESS,
    userId,
    week,
    userInfo
});

export const cancelFetchingUserInfoForWeek = (userId, week) => ({
    type: CANCEL_FETCHING_USER_INFO_FOR_WEEK,
    userId,
    week
});

// -------------------------------------------------------------------- \\

export const fetchMaxGameWeekRequest = () => ({
    type: FETCH_MAX_GAMEWEEK_REQUEST
});

export const fetchMaxGameWeekSuccess = gameWeek => ({
    type: FETCH_MAX_GAMEWEEK_SUCCESS,
    gameWeek
});

export const fetchUserStatsRequest = userId => ({
    type: FETCH_USER_STATS_REQUEST,
    userId
});

export const fetchUserStatsSuccess = (userId, stats) => ({
    type: FETCH_USER_STATS_SUCCESS,
    userId,
    stats
});

export const changeActiveGameWeek = week => ({
    type: CHANGE_ACTIVE_GAME_WEEK,
    week
});
