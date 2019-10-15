import { functionToCall } from '../api/api';

// eslint-disable-next-line import/prefer-default-export
export const fetchActiveTeam = request => functionToCall('users-getActiveTeam')(request)
    .then(data => data.data);
