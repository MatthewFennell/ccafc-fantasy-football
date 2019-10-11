const pre = 'LEAGUES/';

export const FETCH_ACTIVE_TEAM_REQUEST = `${pre}FETCH_ACTIVE_TEAM_REQUEST`;
export const FETCH_ACTIVE_TEAM_SUCCESS = `${pre}FETCH_ACTIVE_TEAM_SUCCESS`;
export const FETCH_ACTIVE_TEAM_ERROR = `${pre}FETCH_ACTIVE_TEAM_ERROR`;

export const fetchActiveTeamRequest = userId => ({
    type: FETCH_ACTIVE_TEAM_REQUEST,
    userId
});

export const fetchActiveTeamError = error => ({
    type: FETCH_ACTIVE_TEAM_ERROR,
    error
});

export const fetchActiveTeamSuccess = (userId, activeTeam) => ({
    type: FETCH_ACTIVE_TEAM_SUCCESS,
    userId,
    activeTeam
});
