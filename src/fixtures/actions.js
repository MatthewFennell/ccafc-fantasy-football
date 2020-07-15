const pre = 'FIXTURES/';

export const FETCH_FIXTURES_REQUEST = `${pre}FETCH_FIXTURES_REQUEST`;
export const FETCH_FIXTURES_SUCCESS = `${pre}FETCH_FIXTURES_SUCCESS`;
export const ALREADY_FETCHED_FIXTURES = `${pre}ALREADY_FETCHED_FIXTURES`;

export const SET_MY_TEAM_REQUEST = `${pre}SET_MY_TEAM_REQUEST`;

export const FETCH_MY_TEAM_REQUEST = `${pre}FETCH_MY_TEAM_REQUEST`;

export const SET_MY_TEAM = `${pre}SET_MY_TEAM`;
export const CANCEL_LOADING_MY_TEAM = `${pre}CANCEL_LOADING_MY_TEAM`;

export const CANCEL_FETCHING_FIXTURES_AND_TEAM = `${pre}CANCEL_FETCHING_FIXTURES_AND_TEAM`;

export const SET_SUCCESS_MESSAGE = `${pre}SET_SUCCESS_MESSAGE`;
export const CLOSE_SUCCESS_MESSAGE = `${pre}CLOSE_SUCCESS_MESSAGE`;

export const cancelLoadingMyTeam = () => ({
    type: CANCEL_LOADING_MY_TEAM
});

export const cancelFetchingFixturesAndTeam = () => ({
    type: CANCEL_FETCHING_FIXTURES_AND_TEAM
});

export const setSuccessMessage = message => ({
    type: SET_SUCCESS_MESSAGE,
    message
});

export const closeSuccessMessage = () => ({
    type: CLOSE_SUCCESS_MESSAGE
});

export const setMyTeam = team => ({
    type: SET_MY_TEAM,
    team
});

export const fetchFixturesRequest = () => ({
    type: FETCH_FIXTURES_REQUEST
});

export const alreadyFetchedFixtures = () => ({
    type: ALREADY_FETCHED_FIXTURES
});

export const fetchFixturesSuccess = fixtures => ({
    type: FETCH_FIXTURES_SUCCESS,
    fixtures
});

export const setMyTeamRequest = team => ({
    type: SET_MY_TEAM_REQUEST,
    team
});

export const fetchMyTeamRequest = () => ({
    type: FETCH_MY_TEAM_REQUEST
});
