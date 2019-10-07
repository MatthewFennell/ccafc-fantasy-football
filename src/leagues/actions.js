const pre = 'LEAGUES/';

export const FETCH_LEAGUES_REQUEST = `${pre}FETCH_LEAGUES_REQUEST`;
export const FETCH_LEAGUES_SUCCESS = `${pre}FETCH_LEAGUES_SUCCESS`;
export const FETCH_LEAGUES_ERROR = `${pre}FETCH_LEAGUES_ERROR`;

export const FETCH_USERS_IN_LEAGUE_REQUEST = `${pre}FETCH_USERS_IN_LEAGUE_REQUEST`;
export const FETCH_USERS_IN_LEAGUE_SUCCESS = `${pre}FETCH_USERS_IN_LEAGUE_SUCCESS`;
export const FETCH_USERS_IN_LEAGUE_ERROR = `${pre}FETCH_USERS_IN_LEAGUE_ERROR`;

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

export const fetchUsersInLeagueRequest = leagueId => ({
    type: FETCH_USERS_IN_LEAGUE_REQUEST,
    leagueId
});

export const fetchUsersInLeagueSuccess = (leagueId, usersInLeague) => ({
    type: FETCH_USERS_IN_LEAGUE_SUCCESS,
    leagueId,
    usersInLeague
});

export const fetchUsersInLeagueError = error => ({
    type: FETCH_USERS_IN_LEAGUE_ERROR,
    error
});
