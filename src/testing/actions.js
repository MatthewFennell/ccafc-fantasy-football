const pre = 'TESTING/';

export const CREATE_LEAGUE = `${pre}CREATE_LEAGUE`;
export const CREATE_LEAGUE_ERROR = `${pre}CREATE_LEAGUE_ERROR`;

export const FETCH_LEAGUES = `${pre}FETCH_LEAGUES`;
export const FETCH_LEAGUES_SUCCESS = `${pre}FETCH_LEAGUES_SUCCESS`;
export const FETCH_LEAGUES_ERROR = `${pre}FETCH_LEAGUES_ERROR`;

export const JOIN_LEAGUE = `${pre}JOIN_LEAGUE`;

export const joinLeague = leagueId => ({
  type: JOIN_LEAGUE,
  leagueId
});

export const createLeague = leagueName => ({
  type: CREATE_LEAGUE,
  leagueName
});

export const createLeagueError = () => ({
  type: CREATE_LEAGUE_ERROR
});

export const fetchLeaguesError = () => ({
  type: FETCH_LEAGUES_ERROR
});

export const fetchLeagues = () => ({
  type: FETCH_LEAGUES
});

export const fetchLeaguesSuccess = (allLeagues, myLeagues) => ({
  type: FETCH_LEAGUES_SUCCESS,
  allLeagues,
  myLeagues
});
