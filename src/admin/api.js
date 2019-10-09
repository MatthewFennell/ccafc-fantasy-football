import { functionToCall } from '../api/api';

export const getAllTeams = () => functionToCall('team-getAllTeams')()
    .then(response => response.data.map(team => ({
        id: team.id,
        text: team.data.team_name,
        value: team.data.team_name
    })));

export const createPlayer = request => functionToCall('player-createPlayer')(request);
