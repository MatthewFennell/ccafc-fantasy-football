import { functionToCall } from '../api/api';

export const fetchPointsForUserInWeek = request => functionToCall('points-pointsForWeek')(request)
    .then(data => data.data);

export const getUserInfo = request => functionToCall('users-getUser')(request)
    .then(data => data.data);
