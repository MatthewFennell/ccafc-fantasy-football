import { functionToCall } from '../api/api';

export const updateDisplayName = request => functionToCall('auth-updateDisplayName')(request);

export const updateTeamName = request => functionToCall('auth-updateTeamName')(request);

export const deleteUser = request => functionToCall('deleteUser')(request);
