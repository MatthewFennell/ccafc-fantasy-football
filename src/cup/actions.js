const pre = 'CUP/';

export const FETCH_CUP_REQUEST = `${pre}FETCH_CUP_REQUEST`;
export const FETCH_CUP_SUCCESS = `${pre}FETCH_CUP_SUCCESS`;
export const SET_IS_FETCHING_CUP = `${pre}SET_IS_FETCHING_CUP`;

export const SET_CUP_ERROR = `${pre}SET_CUP_ERROR`;
export const CLOSE_CUP_ERROR = `${pre}CLOSE_CUP_ERROR`;

export const fetchCupRequest = () => ({
    type: FETCH_CUP_REQUEST
});

export const fetchCupSuccess = cup => ({
    type: FETCH_CUP_SUCCESS,
    cup
});

export const setIsFetchingCup = isFetching => ({
    type: SET_IS_FETCHING_CUP,
    isFetching
});

export const setCupError = (error, header) => ({
    type: SET_CUP_ERROR,
    error,
    header
});

export const closeCupError = () => ({
    type: CLOSE_CUP_ERROR
});
