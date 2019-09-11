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

export const CREATE_TEAM = `${pre}CREATE_TEAM`;
export const CREATE_TEAM_SUCCESS = `${pre}CREATE_TEAM_SUCCESS`;
export const CREATE_TEAM_ERROR = `${pre}CREATE_TEAM_ERROR`;

export const CREATE_PLAYER = `${pre}CREATE_PLAYER`;
export const CREATE_PLAYER_SUCCESS = `${pre}CREATE_PLAYER_SUCCESS`;
export const CREATE_PLAYER_ERROR = `${pre}CREATE_PLAYER_ERROR`;

export const FETCH_PLAYERS = `${pre}FETCH_PLAYERS`;
export const FETCH_PLAYERS_SUCCESS = `${pre}FETCH_PLAYERS_SUCCESS`;
export const FETCH_PLAYERS_ERROR = `${pre}FETCH_PLAYERS_ERROR`;

export const ADD_PLAYER_TO_ACTIVE_TEAM = `${pre}ADD_PLAYER_TO_ACTIVE_TEAM`;
export const ADD_PLAYER_TO_ACTIVE_TEAM_ERROR = `${pre}ADD_PLAYER_TO_ACTIVE_TEAM_ERROR`;

export const TRIGGER_WEEKLY_TEAMS = `${pre}TRIGGER_WEEKLY_TEAMS`;
export const TRIGGER_WEEKLY_TEAMS_ERROR = `${pre}TRIGGER_WEEKLY_TEAMS_ERROR`;

export const FETCH_WEEKLY_PLAYERS = `${pre}FETCH_WEEKLY_PLAYERS`;
export const FETCH_WEEKLY_PLAYERS_SUCCESS = `${pre}FETCH_WEEKLY_PLAYERS_SUCCESS`;
export const FETCH_WEEKLY_PLAYERS_ERROR = `${pre}FETCH_WEEKLY_PLAYERS_ERROR`;

export const ADD_POINTS_TO_PLAYER = `${pre}ADD_POINTS_TO_PLAYER`;
export const ADD_POINTS_TO_PLAYER_SUCCESS = `${pre}ADD_POINTS_TO_PLAYER_SUCCESS`;
export const ADD_POINTS_TO_PLAYER_ERROR = `${pre}ADD_POINTS_TO_PLAYER_ERROR`;

export const FETCH_WEEKLY_PLAYERS_FOR_USER_FOR_WEEK = `${pre}FETCH_WEEKLY_PLAYERS_FOR_USER_FOR_WEEK`;
export const FETCH_WEEKLY_PLAYERS_FOR_USER_FOR_WEEK_SUCCESS = `${pre}FETCH_WEEKLY_PLAYERS_FOR_USER_FOR_WEEK_SUCCESS`;

export const SET_ACTIVE_TEAM = `${pre}SET_ACTIVE_TEAM`;

export const setActiveTeam = activeTeam => ({
    type: SET_ACTIVE_TEAM,
    activeTeam
});

export const fetchWeeklyPlayersForUserForWeek = (userId, week) => ({
    type: FETCH_WEEKLY_PLAYERS_FOR_USER_FOR_WEEK,
    userId,
    week
});

export const fetchWeeklyPlayersForUserForWeekSuccess = (userId, week, weeklyPlayers) => ({
    type: FETCH_WEEKLY_PLAYERS_FOR_USER_FOR_WEEK_SUCCESS,
    userId,
    week,
    weeklyPlayers
});


export const addPointsToPlayer = (playerId, week, points) => ({
    type: ADD_POINTS_TO_PLAYER,
    playerId,
    week,
    points
});

export const addPointsToPlayerError = error => ({
    type: ADD_POINTS_TO_PLAYER_ERROR,
    error
});

export const fetchWeeklyTeams = () => ({
    type: FETCH_WEEKLY_PLAYERS
});

export const fetchWeeklyTeamsSuccess = myWeeklyTeams => ({
    type: FETCH_WEEKLY_PLAYERS_SUCCESS,
    myWeeklyTeams
});

export const fetchWeeklyTeamsError = error => ({
    type: FETCH_WEEKLY_PLAYERS_ERROR,
    error
});


export const triggerWeeklyTeams = week => ({
    type: TRIGGER_WEEKLY_TEAMS,
    week
});

export const triggerWeeklyTeamsError = error => ({
    type: TRIGGER_WEEKLY_TEAMS_ERROR,
    error
});

export const addPlayerToActiveTeamError = error => ({
    type: ADD_PLAYER_TO_ACTIVE_TEAM_ERROR,
    error
});


export const addPlayerToActiveTeam = playerId => ({
    type: ADD_PLAYER_TO_ACTIVE_TEAM,
    playerId
});

export const fetchPlayers = () => ({
    type: FETCH_PLAYERS
});

export const fetchPlayersSuccess = allPlayers => ({
    type: FETCH_PLAYERS_SUCCESS,
    allPlayers
});

export const createPlayer = (name, position, price, team) => ({
    type: CREATE_PLAYER,
    name,
    position,
    price,
    team
});

export const createPlayerError = error => ({
    type: CREATE_PLAYER_ERROR,
    error
});

export const createTeam = teamName => ({
    type: CREATE_TEAM,
    teamName
});

export const createTeamError = error => ({
    type: CREATE_TEAM_ERROR,
    error
});

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
