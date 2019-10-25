import { functionToCall } from '../api/api';

// eslint-disable-next-line import/prefer-default-export
export const getAllPlayers = request => functionToCall('player-getAllPlayers')(request).then(response => response.data.map(p => ({
    ...p,
    position: p.position[0] + p.position.slice(1).toLowerCase()
})));

export const getAllTeams = request => functionToCall('team-getAllTeams')(request).then(response => response.data);
