import { functionToCall } from '../api/api';

// eslint-disable-next-line import/prefer-default-export
export const updateDisplayName = request => functionToCall('updateDisplayName')(request);
