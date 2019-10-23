import { functionToCall } from '../api/api';

export const updateDisplayName = request => functionToCall('auth-updateDisplayName')(request);
export const getRolePermissions = request => functionToCall('getRolePermissions')(request).then(response => response.data);
