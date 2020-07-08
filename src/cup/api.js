import { functionToCall } from '../api/api';

// eslint-disable-next-line import/prefer-default-export
export const fetchCup = request => functionToCall('cup-fetchCup')(request).then(response => response.data);
