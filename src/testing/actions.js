const pre = 'TESTING/';

export const CREATE_LEAGUE = `${pre}CREATE_LEAGUE`;
export const CREATE_LEAGUE_ERROR = `${pre}CREATE_LEAGUE_ERROR`;

export const FETCH_LEAGUES = `${pre}FETCH_LEAGUES`;
export const FETCH_LEAGUES_SUCCESS = `${pre}FETCH_LEAGUES_SUCCESS`;
export const FETCH_LEAGUES_ERROR = `${pre}FETCH_LEAGUES_ERROR`;

export const JOIN_LEAGUE = `${pre}JOIN_LEAGUE`;
export const JOIN_LEAGUE_SUCCESS = `${pre}JOIN_LEAGUE_SUCCESS`;
export const JOIN_LEAGUE_ERROR = `${pre}JOIN_LEAGUE_ERROR`;

export const INCREASE_SCORE = `${pre}INCREASE_SCORE`;
export const INCREASE_SCORE_SUCCESS = `${pre}INCREASE_SCORE_SUCCESS`;
export const INCREASE_SCORE_ERROR = `${pre}INCREASE_SCORE_ERROR`;

export const INCREASE_MY_SCORE = `${pre}INCREASE_MY_SCORE`;
export const INCREASE_MY_SCORE_ERROR = `${pre}INCREASE_MY_SCORE_ERROR`;

export const increaseMyScore = score => ({
  type: INCREASE_MY_SCORE,
  score
});

export const increaseScoreSuccess = myLeagues => ({
  type: INCREASE_SCORE_SUCCESS,
  myLeagues
});

export const increaseMyScoreError = error => ({
  type: INCREASE_MY_SCORE_ERROR,
  error
});

export const increaseScoreError = error => ({
  type: INCREASE_SCORE_ERROR,
  error
});

export const increaseScore = (score, leagueId) => ({
  type: INCREASE_SCORE,
  score,
  leagueId
});

export const joinLeague = leagueId => ({
  type: JOIN_LEAGUE,
  leagueId
});

export const joinLeagueSuccess = myLeagues => ({
  type: JOIN_LEAGUE_SUCCESS,
  myLeagues
});

export const joinLeagueError = error => ({
  type: JOIN_LEAGUE_ERROR,
  error
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
