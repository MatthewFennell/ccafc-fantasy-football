import { functionToCall } from '../api/api';

export const getTeamStatsByWeek = request => functionToCall('points-teamStatsByWeek')(request).then(response => response.data);
