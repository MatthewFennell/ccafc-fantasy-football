const pre = 'TRANSFERS/';

export const FETCH_ALL_PLAYERS_REQUEST = `${pre}FETCH_ALL_PLAYERS_REQUEST`;
export const FETCH_ALL_PLAYERS_SUCCESS = `${pre}FETCH_ALL_PLAYERS_SUCCESS`;
export const FETCH_ALL_PLAYERS_ERROR = `${pre}FETCH_ALL_PLAYERS_ERROR`;

export const FETCH_ALL_TEAMS_REQUEST = `${pre}FETCH_ALL_TEAMS_REQUEST`;
export const FETCH_ALL_TEAMS_SUCCESS = `${pre}FETCH_ALL_TEAMS_SUCCESS`;
export const FETCH_ALL_TEAMS_ERROR = `${pre}FETCH_ALL_TEAMS_ERROR`;

export const ADD_PLAYER_TO_CURRENT_TEAM_REQUEST = `${pre}ADD_PLAYER_TO_CURRENT_TEAM_REQUEST`;
export const ADD_PLAYER_TO_CURRENT_TEAM_SUCCESS = `${pre}ADD_PLAYER_TO_CURRENT_TEAM_SUCCESS`;

export const addPlayerToCurrentTeamRequest = player => ({
    type: ADD_PLAYER_TO_CURRENT_TEAM_REQUEST,
    player
});

export const addPlayerToCurrentTeamSuccess = player => ({
    type: ADD_PLAYER_TO_CURRENT_TEAM_SUCCESS,
    player
});

export const fetchAllPlayersRequest = () => ({
    type: FETCH_ALL_PLAYERS_REQUEST
});

export const fetchAllPlayersSuccess = players => ({
    type: FETCH_ALL_PLAYERS_SUCCESS,
    players
});

export const fetchAllPlayersError = error => ({
    type: FETCH_ALL_PLAYERS_ERROR,
    error
});

export const fetchAllTeamsRequest = () => ({
    type: FETCH_ALL_TEAMS_REQUEST
});

export const fetchAllTeamsSuccess = teams => ({
    type: FETCH_ALL_TEAMS_SUCCESS,
    teams
});

export const fetchAllTeamsError = error => ({
    type: FETCH_ALL_TEAMS_ERROR,
    error
});
