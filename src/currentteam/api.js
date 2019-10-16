import { functionToCall } from '../api/api';

export const fetchActiveTeam = request => functionToCall('fetchActiveTeam')(request)
    .then(data => data.data);

export const makeCaptain = request => functionToCall('makeCaptain')(request);
