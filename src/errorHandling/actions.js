const pre = 'ERROR/';

export const SET_ERROR_MESSAGE = `${pre}SET_ERROR_MESSAGE`;
export const CLOSE_ERROR_MESSAGE = `${pre}CLOSE_ERROR_MESSAGE`;

export const setErrorMessage = (header, error) => ({
    type: SET_ERROR_MESSAGE,
    header,
    error
});

export const closeErrorMessage = () => ({
    type: CLOSE_ERROR_MESSAGE
});
