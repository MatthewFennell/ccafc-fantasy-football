import { functionToCall } from '../api/api';

export const fetchActiveTeam = request => functionToCall('getActiveTeam')(request)
    .then(data => data.data);
