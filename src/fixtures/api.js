import { functionToCall } from '../api/api';

export const getFixtures = request => functionToCall('fixtures-findFixtures')(request)
    .then(response => response.data);

export const setMyTeam = request => functionToCall('setMyTeam')(request);

export const fetchMyTeam = request => functionToCall('getMyTeam')(request)
    .then(response => response.data);
