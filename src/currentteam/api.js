import { functionToCall } from '../api/api';

export const fetchActiveTeam = request => functionToCall('activeTeam-fetchActiveTeam')(request)
    .then(data => data.data);

export const makeCaptain = request => functionToCall('activeTeam-makeCaptain')(request);
