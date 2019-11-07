import { functionToCall } from '../api/api';

// eslint-disable-next-line import/prefer-default-export
export const getTeamStatsByWeek = request => functionToCall('teamStatsByWeek')(request).then(response => response.data);
