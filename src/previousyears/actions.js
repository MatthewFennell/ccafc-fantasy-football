const pre = 'PREVIOUS_YEARS/';

export const FETCH_PREVIOUS_YEARS_AVAILABLE = `${pre}FETCH_PREVIOUS_YEARS_AVAILABLE`;
export const FETCH_HISTORY_FOR_YEAR = `${pre}FETCH_HISTORY_FOR_YEAR`;
export const SET_HISTORY_FOR_YEAR = `${pre}SET_HISTORY_FOR_YEAR`;
export const SET_FETCHING_HISTORY = `${pre}SET_FETCHING_HISTORY`;
export const SET_PREVIOUS_YEARS_AVAILABLE = `${pre}SET_PREVIOUS_YEARS_AVAILABLE`;

export const fetchPreviousYearsAvailable = () => ({
    type: FETCH_PREVIOUS_YEARS_AVAILABLE
});

export const fetchHistoryForYear = year => ({
    type: FETCH_HISTORY_FOR_YEAR,
    year
});

export const setHistoryForYear = (year, history) => ({
    type: SET_HISTORY_FOR_YEAR,
    year,
    history
});

export const setFetchingHistory = isFetching => ({
    type: SET_FETCHING_HISTORY,
    isFetching
});

export const setPreviousYearsAvailable = previousYears => ({
    type: SET_PREVIOUS_YEARS_AVAILABLE,
    previousYears
});
