const pre = 'HIGHLIGHTS/';

export const SUBMIT_HIGHLIGHT_REQUEST = `${pre}SUBMIT_HIGHLIGHT_REQUEST`;
export const SUBMIT_HIGHLIGHT_ERROR = `${pre}SUBMIT_HIGHLIGHT_ERROR`;
export const CLOSE_HIGHLIGHT_ERROR = `${pre}CLOSE_HIGHLIGHT_ERROR`;

export const submitHighlightRequest = videoId => ({
    type: SUBMIT_HIGHLIGHT_REQUEST,
    videoId
});

export const submitHighlightError = error => ({
    type: SUBMIT_HIGHLIGHT_ERROR,
    error
});

export const closeHighlightError = () => ({
    type: CLOSE_HIGHLIGHT_ERROR
});
