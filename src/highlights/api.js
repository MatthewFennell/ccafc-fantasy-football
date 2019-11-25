import { functionToCall } from '../api/api';

export const submitVideo = request => functionToCall('submitHighlightForApproval')(request);
