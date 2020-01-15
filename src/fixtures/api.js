import { functionToCall } from '../api/api';

// eslint-disable-next-line import/prefer-default-export
export const scrapeData = request => functionToCall('scrapeData')(request)
    .then(data => data.data);
