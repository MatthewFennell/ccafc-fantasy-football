const pre = 'TESTING/';

export const CREATE_LEAGUE = `${pre}CREATE_LEAGUE`;
export const CREATE_LEAGUE_ERROR = `${pre}CREATE_LEAGUE_ERROR`;

export const createLeague = leagueName => ({
  type: CREATE_LEAGUE,
  leagueName
});

export const createLeagueError = () => ({
  type: CREATE_LEAGUE_ERROR
});
