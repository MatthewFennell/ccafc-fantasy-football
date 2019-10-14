const pre = 'OVERVIEW/';

export const FETCH_MAX_GAMEWEEK_REQUEST = `${pre}FETCH_MAX_GAMEWEEK_REQUEST`;
export const FETCH_MAX_GAMEWEEK_SUCCESS = `${pre}FETCH_MAX_GAMEWEEK_SUCCESS`;
export const FETCH_MAX_GAMEWEEK_ERROR = `${pre}FETCH_MAX_GAMEWEEK_ERROR`;

export const CHANGE_ACTIVE_GAME_WEEK = `${pre}CHANGE_ACTIVE_GAME_WEEK`;

export const FETCH_USER_STATS_REQUEST = `${pre}FETCH_USER_STATS_REQUEST`;
export const FETCH_USER_STATS_SUCCESS = `${pre}FETCH_USER_STATS_SUCCESS`;
export const FETCH_USER_STATS_ERROR = `${pre}FETCH_USER_STATS_ERROR`;

export const FETCH_USER_INFO_FOR_WEEK_REQUEST = `${pre}FETCH_USER_INFO_FOR_WEEK_REQUEST`;
export const FETCH_USER_INFO_FOR_WEEK_SUCCESS = `${pre}FETCH_USER_INFO_FOR_WEEK_SUCCESS`;
export const FETCH_USER_INFO_FOR_WEEK_ERROR = `${pre}FETCH_USER_INFO_FOR_WEEK_ERROR`;

export const ALREADY_FETCHED_USER_INFO_FOR_WEEK = `${pre}ALREADY_FETCHED_USER_INFO_FOR_WEEK`;
export const ALREADY_FETCHED_USER_STATS = `${pre}ALREADY_FETCHED_USER_STATS`;

export const FETCH_USER_INFO_FOR_WEEK_REQUEST_BACKGROUND = `${pre}FETCH_USER_INFO_FOR_WEEK_REQUEST_BACKGROUND`;

export const fetchUserInfoForWeekRequestBackground = (userId, week) => ({
    type: FETCH_USER_INFO_FOR_WEEK_REQUEST_BACKGROUND,
    userId,
    week
});

export const alreadyFetchedUserInfoForWeek = (userId, week) => ({
    type: ALREADY_FETCHED_USER_INFO_FOR_WEEK,
    userId,
    week
});

export const alreadyFetchedUserStats = () => ({
    type: ALREADY_FETCHED_USER_STATS
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

export const fetchUserInfoForWeekError = (userId, week, error) => ({
    type: FETCH_USER_INFO_FOR_WEEK_ERROR,
    error
});

// -------------------------------------------------------------------- \\

export const fetchMaxGameWeekRequest = () => ({
    type: FETCH_MAX_GAMEWEEK_REQUEST
});

export const fetchMaxGameWeekSuccess = gameWeek => ({
    type: FETCH_MAX_GAMEWEEK_SUCCESS,
    gameWeek
});

export const fetchMaxGameWeekError = error => ({
    type: FETCH_MAX_GAMEWEEK_ERROR,
    error
});

export const fetchUserStatsRequest = () => ({
    type: FETCH_USER_STATS_REQUEST
});

export const fetchUserStatsSuccess = stats => ({
    type: FETCH_USER_STATS_SUCCESS,
    stats
});

export const fetchUserStatsError = error => ({
    type: FETCH_USER_STATS_ERROR,
    error
});

export const changeActiveGameWeek = week => ({
    type: CHANGE_ACTIVE_GAME_WEEK,
    week
});
