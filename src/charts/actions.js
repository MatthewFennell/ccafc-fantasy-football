const pre = 'CHARTS/';

export const FETCH_ALL_TEAMS_REQUEST = `${pre}FETCH_ALL_TEAMS_REQUEST`;
export const FETCH_ALL_TEAMS_SUCCESS = `${pre}FETCH_ALL_TEAMS_SUCCESS`;
export const CANCEL_FETCHING_TEAMS = `${pre}CANCEL_FETCHING_TEAMS`;

export const cancelFetchingTeams = () => ({
    type: CANCEL_FETCHING_TEAMS
});

export const fetchAllTeamsRequest = () => ({
    type: FETCH_ALL_TEAMS_REQUEST
});

export const fetchAllTeamsSuccess = allTeams => ({
    type: FETCH_ALL_TEAMS_SUCCESS,
    allTeams
});
