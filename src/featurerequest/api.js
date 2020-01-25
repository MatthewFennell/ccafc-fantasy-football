import { functionToCall } from '../api/api';

export const submitFeature = request => functionToCall('features-submitFeature')(request);
export { addComment, addReply, deleteComment } from '../common/api/api';
