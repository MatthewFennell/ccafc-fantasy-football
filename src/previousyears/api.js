import { functionToCall } from '../api/api';

export const fetchPreviousYearsAvailable = request => functionToCall('previousYears-previousYears')(request)
    .then(data => data.data);

export const fetchHistoryForYear = request => functionToCall('previousYears-getHistoryForYear')(request)
    .then(data => data.data);
