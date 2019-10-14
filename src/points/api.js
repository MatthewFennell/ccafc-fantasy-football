import { functionToCall } from '../api/api';

export const fetchPointsForUserInWeek = request => functionToCall('pointsForWeek')(request)
    .then(data => data.data);
