const pre = 'CHARTS/';

export const FETCH_ALL_TEAMS_REQUEST = `${pre}FETCH_ALL_TEAMS_REQUEST`;
export const FETCH_ALL_TEAMS_SUCCESS = `${pre}FETCH_ALL_TEAMS_SUCCESS`;
export const FETCH_ALL_TEAMS_ERROR = `${pre}FETCH_ALL_TEAMS_ERROR`;

export const fetchAllTeamsRequest = () => ({
    type: FETCH_ALL_TEAMS_REQUEST
});

export const fetchAllTeamsSuccess = allTeams => ({
    type: FETCH_ALL_TEAMS_SUCCESS,
    allTeams
});

export const fetchAllTeamsError = error => ({
    type: FETCH_ALL_TEAMS_ERROR,
    error
});
