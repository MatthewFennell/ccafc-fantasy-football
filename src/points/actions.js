const pre = 'POINTS/';

export const FETCH_USER_POINTS_FOR_WEEK_REQUEST = `${pre}FETCH_USER_POINTS_FOR_WEEK_REQUEST`;
export const FETCH_USER_POINTS_FOR_WEEK_SUCCESS = `${pre}FETCH_USER_POINTS_FOR_WEEK_SUCCESS`;
export const FETCH_USER_POINTS_FOR_WEEK_ERROR = `${pre}FETCH_USER_POINTS_FOR_WEEK_ERROR`;
export const CANCEL_FETCHING_USER_POINTS_FOR_WEEK = `${pre}CANCEL_FETCHING_USER_POINTS_FOR_WEEK`;

export const SET_USER_DETAILS = `${pre}SET_USER_DETAILS`;
export const SET_USER_DETAILS_FETCHING = `${pre}SET_USER_DETAILS_FETCHING`;
export const CANCEL_FETCHING_USER_DETAILS = `${pre}CANCEL_FETCHING_USER_DETAILS`;
export const FETCH_USER_POINTS_FOR_WEEK_REQUEST_BACKGROUND = `${pre}FETCH_USER_POINTS_FOR_WEEK_REQUEST_BACKGROUND`;

export const setUserDetails = (userId, details) => ({
    type: SET_USER_DETAILS,
    userId,
    details
});

export const setUserDetailsFetching = (userId, isFetching) => ({
    type: SET_USER_DETAILS_FETCHING,
    userId,
    isFetching
});

export const fetchUserPointsForWeekRequest = (userId, week) => ({
    type: FETCH_USER_POINTS_FOR_WEEK_REQUEST,
    userId,
    week
});

export const fetchUserPointsForWeekRequestBackground = (userId, week) => ({
    type: FETCH_USER_POINTS_FOR_WEEK_REQUEST_BACKGROUND,
    userId,
    week
});

export const fetchUserPointsForWeekSuccess = (userId, week, team) => ({
    type: FETCH_USER_POINTS_FOR_WEEK_SUCCESS,
    userId,
    week,
    team
});

export const fetchUserPointsForWeekError = (userId, week, error) => ({
    type: FETCH_USER_POINTS_FOR_WEEK_ERROR,
    userId,
    week,
    error
});

export const cancelFetchingUserPointsForWeek = (userId, week) => ({
    type: CANCEL_FETCHING_USER_POINTS_FOR_WEEK,
    userId,
    week
});

export const cancelFetchingUserDetails = userId => ({
    type: CANCEL_FETCHING_USER_DETAILS,
    userId
});
