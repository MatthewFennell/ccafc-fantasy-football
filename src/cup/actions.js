const pre = 'CUP/';

export const FETCH_CUP_REQUEST = `${pre}FETCH_CUP_REQUEST`;
export const FETCH_CUP_SUCCESS = `${pre}FETCH_CUP_SUCCESS`;
export const SET_IS_FETCHING_CUP = `${pre}SET_IS_FETCHING_CUP`;

export const fetchCupRequest = () => ({
    type: FETCH_CUP_REQUEST
});

export const fetchCupSuccess = (cup, cupTwo) => ({
    type: FETCH_CUP_SUCCESS,
    cup,
    cupTwo
});

export const setIsFetchingCup = isFetching => ({
    type: SET_IS_FETCHING_CUP,
    isFetching
});
