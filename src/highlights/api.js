import { functionToCall } from '../api/api';

export const submitVideo = request => functionToCall('submitHighlightForApproval')(request);
export const getHighlights = request => functionToCall('getHighlights')(request).then(response => response.data);
