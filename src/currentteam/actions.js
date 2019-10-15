const pre = 'LEAGUES/';

export const FETCH_ACTIVE_TEAM_REQUEST = `${pre}FETCH_ACTIVE_TEAM_REQUEST`;
export const FETCH_ACTIVE_TEAM_SUCCESS = `${pre}FETCH_ACTIVE_TEAM_SUCCESS`;
export const FETCH_ACTIVE_TEAM_ERROR = `${pre}FETCH_ACTIVE_TEAM_ERROR`;
export const ALREADY_FETCHED_ACTIVE_TEAM = `${pre}ALREADY_FETCHED_ACTIVE_TEAM`;

export const fetchActiveTeamRequest = userId => ({
    type: FETCH_ACTIVE_TEAM_REQUEST,
    userId
});

export const fetchActiveTeamError = (userId, error) => ({
    type: FETCH_ACTIVE_TEAM_ERROR,
    userId,
    error
});

export const fetchActiveTeamSuccess = (userId, activeTeam) => ({
    type: FETCH_ACTIVE_TEAM_SUCCESS,
    userId,
    activeTeam
});

export const alreadyFetchedActiveTeam = userId => ({
    type: ALREADY_FETCHED_ACTIVE_TEAM,
    userId
});
