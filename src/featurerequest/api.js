import { functionToCall } from '../api/api';

export const submitFeature = request => functionToCall('features-submitFeature')(request);

export const addCommentToFeature = request => functionToCall('features-addCommentToFeature')(request);
export const addReplyToComment = request => functionToCall('features-addReplyToComment')(request);
