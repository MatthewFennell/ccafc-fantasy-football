const pre = 'LEAGUES/';

export const FETCH_LEAGUES_REQUEST = `${pre}FETCH_LEAGUES_REQUEST`;
export const FETCH_LEAGUES_SUCCESS = `${pre}FETCH_LEAGUES_SUCCESS`;
export const FETCH_LEAGUES_ERROR = `${pre}FETCH_LEAGUES_ERROR`;

export const fetchLeaguesRequest = () => ({
    type: FETCH_LEAGUES_REQUEST
});

export const fetchLeaguesSuccess = leagues => ({
    type: FETCH_LEAGUES_SUCCESS,
    leagues
});

export const fetchLeaguesError = error => ({
    type: FETCH_LEAGUES_ERROR,
    error
});
