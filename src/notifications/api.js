import { functionToCall } from '../api/api';

// eslint-disable-next-line import/prefer-default-export
export const removeNotification = request => functionToCall('users-removeNotification')(request);
