const pre = 'LEAGUES/';

export const FETCH_LEAGUES_REQUEST = `${pre}FETCH_LEAGUES_REQUEST`;
export const FETCH_LEAGUES_SUCCESS = `${pre}FETCH_LEAGUES_SUCCESS`;
export const CANCEL_FETCHING_LEAGUES = `${pre}CANCEL_FETCHING_LEAGUES`;

export const FETCH_USERS_IN_LEAGUE_REQUEST = `${pre}FETCH_USERS_IN_LEAGUE_REQUEST`;
export const FETCH_USERS_IN_LEAGUE_SUCCESS = `${pre}FETCH_USERS_IN_LEAGUE_SUCCESS`;
export const ALREADY_FETCHED_USERS_IN_LEAGUE = `${pre}ALREADY_FETCHED_USERS_IN_LEAGUE`;
export const FETCH_MORE_USER_IN_LEAGUE_SUCCESS = `${pre}FETCH_MORE_USER_IN_LEAGUE_SUCCESS`;
export const FETCHED_ALL_USERS_IN_LEAGUE = `${pre}FETCHED_ALL_USERS_IN_LEAGUE`;
export const FETCHING_USERS_IN_LEAGUE = `${pre}FETCHING_USERS_IN_LEAGUE`;
export const CANCEL_FETCHING_USERS_IN_LEAGUE = `${pre}CANCEL_FETCHING_USERS_IN_LEAGUE`;

export const CREATE_LEAGUE_REQUEST = `${pre}CREATE_LEAGUE_REQUEST`;
export const CREATE_LEAGUE_SUCCESS = `${pre}CREATE_LEAGUE_SUCCESS`;
export const CANCEL_CREATING_LEAGUE = `${pre}CANCEL_CREATING_LEAGUE`;

export const JOIN_LEAGUE_REQUEST = `${pre}JOIN_LEAGUE_REQUEST`;
export const JOIN_LEAGUE_SUCCESS = `${pre}JOIN_LEAGUE_SUCCESS`;
export const CANCEL_JOINING_LEAGUE = `${pre}CANCEL_JOINING_LEAGUE`;

export const LEAVE_LEAGUE_REQUEST = `${pre}LEAVE_LEAGUE_REQUEST`;
export const LEAVE_LEAGUE_SUCCESS = `${pre}LEAVE_LEAGUE_SUCCESS`;
export const CANCEL_LEAVING_LEAGUE = `${pre}CANCEL_LEAVING_LEAGUE`;

export const fetchingUsersInLeague = leagueId => ({
    type: FETCHING_USERS_IN_LEAGUE,
    leagueId
});

export const fetchMoreUsersInLeagueSuccess = (leagueId, newUsers, previousId) => ({
    type: FETCH_MORE_USER_IN_LEAGUE_SUCCESS,
    leagueId,
    newUsers,
    previousId
});

export const fetchedAllUsersInLeague = leagueId => ({
    type: FETCHED_ALL_USERS_IN_LEAGUE,
    leagueId
});

export const cancelFetchingUsersInLeague = leagueId => ({
    type: CANCEL_FETCHING_USERS_IN_LEAGUE,
    leagueId
});

export const fetchLeaguesRequest = () => ({
    type: FETCH_LEAGUES_REQUEST
});

export const fetchLeaguesSuccess = leagues => ({
    type: FETCH_LEAGUES_SUCCESS,
    leagues
});

export const cancelFetchingLeagues = () => ({
    type: CANCEL_FETCHING_LEAGUES
});

export const alreadyFetchedUsersInLeague = leagueId => ({
    type: ALREADY_FETCHED_USERS_IN_LEAGUE,
    leagueId
});

export const fetchUsersInLeagueRequest = (
    leagueId, maxGameWeek, requestedSize, pageNumber, rowsPerPage
) => ({
    type: FETCH_USERS_IN_LEAGUE_REQUEST,
    leagueId,
    maxGameWeek,
    requestedSize,
    pageNumber,
    rowsPerPage
});

export const fetchUsersInLeagueSuccess = (leagueId, usersInLeague, numberOfUsers, leagueName) => ({
    type: FETCH_USERS_IN_LEAGUE_SUCCESS,
    leagueId,
    usersInLeague,
    numberOfUsers,
    leagueName
});

export const createLeagueRequest = (leagueName, startWeek) => ({
    type: CREATE_LEAGUE_REQUEST,
    leagueName,
    startWeek
});

export const createLeagueSuccess = leagues => ({
    type: CREATE_LEAGUE_SUCCESS,
    leagues
});

export const cancelCreatingLeague = () => ({
    type: CANCEL_CREATING_LEAGUE
});

export const joinLeagueRequest = leagueName => ({
    type: JOIN_LEAGUE_REQUEST,
    leagueName
});

export const joinLeagueSuccess = leagues => ({
    type: JOIN_LEAGUE_SUCCESS,
    leagues
});

export const cancelJoiningLeague = () => ({
    type: CANCEL_JOINING_LEAGUE
});

export const leaveLeagueRequest = leagueId => ({
    type: LEAVE_LEAGUE_REQUEST,
    leagueId
});

export const leaveLeagueSuccess = leagues => ({
    type: LEAVE_LEAGUE_SUCCESS,
    leagues
});

export const cancelLeavingLeague = () => ({
    type: CANCEL_LEAVING_LEAGUE
});
