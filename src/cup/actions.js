const pre = 'CUP/';

export const FETCH_CUP_REQUEST = `${pre}FETCH_CUP_REQUEST`;
export const FETCH_CUP_SUCCESS = `${pre}FETCH_CUP_SUCCESS`;
export const SET_IS_FETCHING_CUP = `${pre}SET_IS_FETCHING_CUP`;
export const SET_AUTO_RENEW_CUP = `${pre}SET_AUTO_RENEW_CUP`;
export const HAS_UPDATED_CUP = `${pre}HAS_UPDATED_CUP`;

export const fetchCupRequest = () => ({
    type: FETCH_CUP_REQUEST
});

export const hasUpdatedCup = () => ({
    type: HAS_UPDATED_CUP
});

export const fetchCupSuccess = (cup, cupTwo, cupThree) => ({
    type: FETCH_CUP_SUCCESS,
    cup,
    cupTwo,
    cupThree
});

export const setIsFetchingCup = isFetching => ({
    type: SET_IS_FETCHING_CUP,
    isFetching
});

export const setAutoRenewCup = (cupId, isAutoRenew) => ({
    type: SET_AUTO_RENEW_CUP,
    cupId,
    isAutoRenew
});
