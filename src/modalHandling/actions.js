import { successDelay } from '../constants';

const pre = 'MODAL/';

export const SET_ERROR_MESSAGE = `${pre}SET_ERROR_MESSAGE`;
export const CLOSE_ERROR_MESSAGE = `${pre}CLOSE_ERROR_MESSAGE`;

export const SET_SUCCESS_MESSAGE = `${pre}SET_SUCCESS_MESSAGE`;
export const CLOSE_SUCCESS_MESSAGE = `${pre}CLOSE_SUCCESS_MESSAGE`;

export const setErrorMessage = (header, error) => ({
    type: SET_ERROR_MESSAGE,
    header,
    error
});

export const closeErrorMessage = () => ({
    type: CLOSE_ERROR_MESSAGE
});

export const setSuccessMessage = (message, delay = successDelay) => ({
    type: SET_SUCCESS_MESSAGE,
    message,
    delay
});

export const closeSuccessMessage = () => ({
    type: CLOSE_SUCCESS_MESSAGE
});
