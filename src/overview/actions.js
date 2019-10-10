const pre = 'OVERVIEW/';

export const FETCH_INITIAL_USER_WEEK_INFO_REQUEST = `${pre}FETCH_INITIAL_USER_WEEK_INFO_REQUEST`;
export const FETCH_INITIAL_USER_WEEK_INFO_SUCCESS = `${pre}FETCH_INITIAL_USER_WEEK_INFO_SUCCESS`;
export const FETCH_INITIAL_USER_WEEK_INFO_ERROR = `${pre}FETCH_INITIAL_USER_WEEK_INFO_ERROR`;
export const ALREADY_FETCHED_USER_INFO = `${pre}ALREADY_FETCHED_USER_INFO`;

export const FETCH_USER_INFO_FOR_WEEK_REQUEST = `${pre}FETCH_USER_INFO_FOR_WEEK_REQUEST`;
export const FETCH_USER_INFO_FOR_WEEK_ERROR = `${pre}FETCH_USER_INFO_FOR_WEEK_ERROR`;
export const FETCH_USER_INFO_FOR_WEEK_SUCCESS = `${pre}FETCH_USER_INFO_FOR_WEEK_SUCCESS`;

export const CHANGE_ACTIVE_GAME_WEEK = `${pre}CHANGE_ACTIVE_GAME_WEEK`;

export const FETCH_USER_STATS_REQUEST = `${pre}FETCH_USER_STATS_REQUEST`;
export const FETCH_USER_STATS_SUCCESS = `${pre}FETCH_USER_STATS_SUCCESS`;
export const FETCH_USER_STATS_ERROR = `${pre}FETCH_USER_STATS_ERROR`;

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

export const fetchInitialUserWeekInfoRequest = () => ({
    type: FETCH_INITIAL_USER_WEEK_INFO_REQUEST
});

export const fetchInitialUserWeekInfoSuccess = userInfo => ({
    type: FETCH_INITIAL_USER_WEEK_INFO_SUCCESS,
    userInfo
});

export const fetchInitialUserWeekInfoError = error => ({
    type: FETCH_INITIAL_USER_WEEK_INFO_ERROR,
    error
});

export const alreadyFetchedUserInfo = () => ({
    type: ALREADY_FETCHED_USER_INFO
});

export const fetchUserInfoForWeekRequest = week => ({
    type: FETCH_USER_INFO_FOR_WEEK_REQUEST,
    week
});

export const fetchUserInfoForWeekSuccess = (gameWeek, usersWeeklyInfo) => ({
    type: FETCH_USER_INFO_FOR_WEEK_SUCCESS,
    gameWeek,
    usersWeeklyInfo
});


export const fetchUserInfoForWeekError = (error, week) => ({
    type: FETCH_USER_INFO_FOR_WEEK_ERROR,
    error,
    week
});

export const changeActiveGameWeek = week => ({
    type: CHANGE_ACTIVE_GAME_WEEK,
    week
});
