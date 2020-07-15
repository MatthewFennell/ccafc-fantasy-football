const pre = 'CHARTS/';

export const FETCH_ALL_TEAMS_REQUEST = `${pre}FETCH_ALL_TEAMS_REQUEST`;
export const FETCH_ALL_TEAMS_SUCCESS = `${pre}FETCH_ALL_TEAMS_SUCCESS`;
export const STOP_FETCHING_ALL_TEAMS = `${pre}STOP_FETCHING_ALL_TEAMS`;
export const ALREADY_FETCHED_TEANS = `${pre}ALREADY_FETCHED_TEANS`;

export const alreadyFetchedTeams = () => ({
    type: ALREADY_FETCHED_TEANS
});

export const fetchAllTeamsRequest = () => ({
    type: FETCH_ALL_TEAMS_REQUEST
});

export const fetchAllTeamsSuccess = allTeams => ({
    type: FETCH_ALL_TEAMS_SUCCESS,
    allTeams
});

export const stopFetchingAllTeams = () => ({
    type: STOP_FETCHING_ALL_TEAMS
});
