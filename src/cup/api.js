import { functionToCall } from '../api/api';

export const fetchCup = request => functionToCall('cup-fetchCup')(request).then(response => response.data);
