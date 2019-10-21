import { functionToCall } from '../api/api';

export const getAllTeams = () => functionToCall('team-getAllTeams')()
    .then(response => response.data.map(team => ({
        id: team.id,
        text: team.data.team_name,
        value: team.data.team_name
    })));

export const createPlayer = request => functionToCall('player-createPlayer')(request);
export const deletePlayer = request => functionToCall('player-deletePlayer')(request);

export const createTeam = request => functionToCall('team-createTeam')(request);
export const deleteTeam = request => functionToCall('team-deleteTeam')(request);

export const addPointsForTeamInWeek = request => functionToCall('points-submitResult')(request);

export const getPlayersInTeam = request => functionToCall('team-getPlayersInTeam')(request)
    .then(response => response.data.map(player => ({
        id: player.id,
        text: player.name,
        value: player.name,
        position: player.position
    })));

export const submitResult = request => functionToCall('points-submitResult')(request);

export const triggerWeeklyTeams = request => functionToCall('weeklyTeam-triggerWeeklyTeams')(request);

export const getPlayerStats = request => functionToCall('playerStats')(request).then(result => result.data);

export const editStats = request => functionToCall('editPlayerStats')(request);
