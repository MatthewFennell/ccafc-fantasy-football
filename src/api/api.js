import firebase from 'firebase';

// Param func is the NAME of the function to call
const functionToCall = func => firebase
    .app()
    .functions('europe-west2')
    .httpsCallable(func);

export const getAllLeagues = () => functionToCall('league-getAllLeagues')()
    .then(data => data.data.map(league => ({
        id: league.id,
        league_id: league.data.league_id,
        league_name: league.data.name,
        start_week: league.data.start_week,
        user_points: league.data.user_points
    })));

export const getLeaguesIAmIn = () => functionToCall('league-getLeaguesIAmIn')()
    .then(data => data.data.map(league => ({
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

export const getAllPlayers = () => functionToCall('player-getAllPlayers')()
    .then(data => data.data.map(player => ({
        id: player.id,
        name: player.data.name,
        position: player.data.position,
        price: player.data.price,
        team: player.data.team
    })));

export const addPlayerToActiveTeam = playerId => functionToCall('activeTeam-addPlayerToActiveTeam')(playerId);

export const triggerWeeklyTeams = week => functionToCall('weeklyTeam-triggerWeeklyTeams')(week);

export const getAllWeeklyPlayers = () => functionToCall('weeklyTeam-getAllMyWeeklyPlayers')()
    .then(response => response.data.map(weeklyPlayer => ({
        id: weeklyPlayer.id,
        name: weeklyPlayer.data.name,
        player_id: weeklyPlayer.data.player_id,
        points: weeklyPlayer.data.points,
        position: weeklyPlayer.data.positionk,
        price: weeklyPlayer.data.price,
        team: weeklyPlayer.data.team,
        user_id: weeklyPlayer.data.user_id,
        week: weeklyPlayer.data.week
    })));

export const getWeeklyPlayersForUserInWeek = (userId, week) => functionToCall('weeklyTeam-getWeeklyPlayersForUserInWeek')(userId, week)
    .then(response => response.data.map(weeklyPlayer => ({
        id: weeklyPlayer.id,
        name: weeklyPlayer.data.name,
        player_id: weeklyPlayer.data.player_id,
        points: weeklyPlayer.data.points,
        position: weeklyPlayer.data.positionk,
        price: weeklyPlayer.data.price,
        team: weeklyPlayer.data.team,
        user_id: weeklyPlayer.data.user_id,
        week: weeklyPlayer.data.week
    })));

export const addPointsToPlayerInWeek = (playerId, week, points) => functionToCall('weeklyTeam-addPointsToPlayerInWeek')(playerId, week, points);

export const setActiveTeam = activeTeam => functionToCall('activeTeam-setActiveTeam')(activeTeam);

export const updateWeeklyTeam = playersToAdd => functionToCall('activeTeam-updateActiveTeam')(playersToAdd);

export const addPointsForTeamInWeek = request => functionToCall('points-submitResult')(request);

export const fetchMyActiveTeam = () => functionToCall('activeTeam-fetchMyActiveTeam')()
    .then(response => response.data.map(player => ({
        id: player.id,
        name: player.data.name,
        player_id: player.data.player_id,
        position: player.data.position,
        price: player.data.price,
        team: player.data.team
    })));

export const fetchTeams = () => functionToCall('team-getAllTeams')()
    .then(response => response.data.map(team => ({
        id: team.id,
        team_name: team.data.team_name,
        wins: team.data.wins,
        draws: team.data.draws,
        losses: team.data.losses,
        goalsAgainst: team.data.goalsAgainst,
        goalsFor: team.data.goalsFor
    })));
