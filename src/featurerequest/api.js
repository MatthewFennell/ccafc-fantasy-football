import { functionToCall } from '../api/api';

export const submitFeature = request => functionToCall('submitFeature')(request);
