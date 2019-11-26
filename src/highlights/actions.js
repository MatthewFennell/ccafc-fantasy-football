const pre = 'HIGHLIGHTS/';

export const SUBMIT_HIGHLIGHT_REQUEST = `${pre}SUBMIT_HIGHLIGHT_REQUEST`;
export const SUBMIT_HIGHLIGHT_ERROR = `${pre}SUBMIT_HIGHLIGHT_ERROR`;
export const CLOSE_HIGHLIGHT_ERROR = `${pre}CLOSE_HIGHLIGHT_ERROR`;

export const FETCH_HIGHLIGHTS_REQUEST = `${pre}FETCH_HIGHLIGHTS_REQUEST`;
export const FETCH_HIGHLIGHTS_SUCCESS = `${pre}FETCH_HIGHLIGHTS_SUCCESS`;

export const fetchHighlightsRequest = () => ({
    type: FETCH_HIGHLIGHTS_REQUEST
});

export const fetchHighlightsSuccess = highlights => ({
    type: FETCH_HIGHLIGHTS_SUCCESS,
    highlights
});

export const submitHighlightRequest = (videoId, title) => ({
    type: SUBMIT_HIGHLIGHT_REQUEST,
    videoId,
    title
});

export const submitHighlightError = error => ({
    type: SUBMIT_HIGHLIGHT_ERROR,
    error
});

export const closeHighlightError = () => ({
    type: CLOSE_HIGHLIGHT_ERROR
});
