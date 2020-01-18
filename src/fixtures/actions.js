const pre = 'FIXTURES/';

export const FETCH_FIXTURES_REQUEST = `${pre}FETCH_FIXTURES_REQUEST`;
export const FETCH_FIXTURES_SUCCESS = `${pre}FETCH_FIXTURES_SUCCESS`;
export const FETCH_FIXTURES_ERROR = `${pre}FETCH_FIXTURES_ERROR`;

export const SET_MY_TEAM_REQUEST = `${pre}SET_MY_TEAM_REQUEST`;
export const SET_MY_TEAM_ERROR = `${pre}SET_MY_TEAM_ERROR`;

export const FETCH_MY_TEAM_REQUEST = `${pre}FETCH_MY_TEAM_REQUEST`;
export const FETCH_MY_TEAM_ERROR = `${pre}FETCH_MY_TEAM_ERROR`;

export const SET_MY_TEAM = `${pre}SET_MY_TEAM`;

export const setMyTeam = team => ({
    type: SET_MY_TEAM,
    team
});

export const fetchFixturesRequest = () => ({
    type: FETCH_FIXTURES_REQUEST
});

export const fetchFixturesSuccess = fixtures => ({
    type: FETCH_FIXTURES_SUCCESS,
    fixtures
});

export const fetchFixturesError = error => ({
    type: FETCH_FIXTURES_ERROR,
    error
});

export const setMyTeamRequest = team => ({
    type: SET_MY_TEAM_REQUEST,
    team
});

export const setMyTeamError = error => ({
    type: SET_MY_TEAM_ERROR,
    error
});

export const fetchMyTeamRequest = () => ({
    type: FETCH_MY_TEAM_REQUEST
});

export const fetchMyTeamError = error => ({
    type: FETCH_MY_TEAM_ERROR,
    error
});
