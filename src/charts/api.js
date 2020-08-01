import { functionToCall } from '../api/api';

export const getAllTeams = () => functionToCall('team-getAllTeams')()
    .then(response => response.data);
