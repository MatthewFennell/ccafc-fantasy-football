const pre = 'ADMIN/';

export const FETCH_TEAMS_REQUEST = `${pre}FETCH_TEAMS_REQUEST`;
export const FETCH_TEAMS_SUCCESS = `${pre}FETCH_TEAMS_SUCCESS`;
export const FETCH_TEAMS_ERROR = `${pre}FETCH_TEAMS_ERROR`;

export const CREATE_PLAYER_REQUEST = `${pre}CREATE_PLAYER_REQUEST`;
export const CREATE_PLAYER_SUCCESS = `${pre}CREATE_PLAYER_SUCCESS`;
export const CREATE_PLAYER_ERROR = `${pre}CREATE_PLAYER_ERROR`;
export const CLOSE_CREATE_PLAYER_ERROR = `${pre}CLOSE_CREATE_PLAYER_ERROR`;

export const fetchTeamsRequest = () => ({
    type: FETCH_TEAMS_REQUEST
});

export const fetchTeamsSuccess = teams => ({
    type: FETCH_TEAMS_SUCCESS,
    teams
});

export const fetchTeamsError = error => ({
    type: FETCH_TEAMS_ERROR,
    error
});

// ------------------------------------------- \\

export const createPlayerRequest = (name, position, price, team) => ({
    type: CREATE_PLAYER_REQUEST,
    name,
    position,
    price,
    team
});

export const createPlayerError = error => ({
    type: CREATE_PLAYER_ERROR,
    error
});

export const closeCreatePlayerError = () => ({
    type: CLOSE_CREATE_PLAYER_ERROR
});
