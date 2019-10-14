import { functionToCall } from '../api/api';

export const fetchActiveTeam = request => functionToCall('users-getActiveTeam')(request)
    .then(data => data.data);
