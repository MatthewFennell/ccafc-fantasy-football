import firebase from 'firebase';

// Param func is the NAME of the function to call
const functionToCall = func => firebase
    .app()
    .functions('europe-west2')
    .httpsCallable(func);

export const getAllLeagues = () => functionToCall('league-getAllLeagues')().then(data => data.data.map(league => ({
    id: league.id,
    league_id: league.data.league_id,
    league_name: league.data.name,
    start_week: league.data.start_week,
    user_points: league.data.user_points
})));

export const getLeaguesIAmIn = () => functionToCall('league-getLeaguesIAmIn')().then(data => data.data.map(league => ({
    id: league.id,
    league_id: league.data.league_id,
    league_name: league.data.name,
    start_week: league.data.start_week,
    user_points: league.data.user_points
})));

export const joinLeague = leagueId => functionToCall('league-addUserToLeague')(leagueId);

export const addPointsInLeagueToUser = (leagueId, score) => functionToCall('league-addPointsInLeagueToUser')(leagueId, score);

export const addPointsToMe = (score, userId) => functionToCall('league-addPointsToUser')(score, userId);

export const createTeam = teamName => functionToCall('team-createTeam')(teamName);

export const createPlayer = (name, position, price, team) => functionToCall('player-createPlayer')(name, position, price, team);

export const getAllPlayers = () => functionToCall('player-getAllPlayers')().then(data => data.data.map(player => ({
    id: player.id,
    name: player.data.name,
    position: player.data.position,
    price: player.data.price,
    team: player.data.team
})));

export const addPlayerToActiveTeam = playerId => functionToCall('activeTeam-addPlayerToActiveTeam')(playerId);

export const triggerWeeklyTeams = week => functionToCall('weeklyTeam-triggerWeeklyTeams')(week);

export const getMyWeeklyTeams = () => functionToCall('weeklyTeam-getAllMyWeeklyTeams')().then(response => response.data.map(weeklyTeam => ({
    id: weeklyTeam.id,
    user_id: weeklyTeam.data.user_id,
    player_ids: weeklyTeam.data.player_ids,
    points: weeklyTeam.data.points,
    week: weeklyTeam.data.week,
    players: weeklyTeam.data.players
})));

export const addPointsToPlayerInWeek = (playerId, week, points) => functionToCall('weeklyTeam-addPointsToPlayerInWeek')(playerId, week, points);
