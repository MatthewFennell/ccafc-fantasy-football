import { functionToCall } from '../../api/api';

// eslint-disable-next-line import/prefer-default-export
export const addComment = request => functionToCall('comments-addComment')(request)
    .then(response => response.data);

export const addReply = request => functionToCall('comments-addReply')(request)
    .then(response => response.data);

export const deleteComment = request => functionToCall('deleteComment')(request)
    .then(response => response.data);
