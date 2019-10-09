const pre = 'OVERVIEW/';

export const FETCH_USER_INFO_REQUEST = `${pre}FETCH_USER_INFO_REQUEST`;
export const FETCH_USER_INFO_SUCCESS = `${pre}FETCH_USER_INFO_SUCCESS`;
export const FETCH_USER_INFO_ERROR = `${pre}FETCH_USER_INFO_ERROR`;

export const fetchUserInfoRequest = () => ({
    type: FETCH_USER_INFO_REQUEST
});

export const fetchUserInfoSuccess = userInfo => ({
    type: FETCH_USER_INFO_SUCCESS,
    userInfo
});

export const fetchUserInfoError = error => ({
    type: FETCH_USER_INFO_ERROR,
    error
});
