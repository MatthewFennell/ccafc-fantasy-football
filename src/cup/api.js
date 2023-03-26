import { functionToCall } from '../api/api';

export const fetchCup = request => functionToCall('cup-fetchCup')(request).then(response => response.data);

export const updateAutoRenew = request => functionToCall('cup-updateAutoRenew')(request).then(response => response.data);
