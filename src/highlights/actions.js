const pre = 'HIGHLIGHTS/';

export const SUBMIT_HIGHLIGHT_REQUEST = `${pre}SUBMIT_HIGHLIGHT_REQUEST`;
export const SUBMIT_HIGHLIGHT_ERROR = `${pre}SUBMIT_HIGHLIGHT_ERROR`;
export const CLOSE_HIGHLIGHT_ERROR = `${pre}CLOSE_HIGHLIGHT_ERROR`;

export const FETCH_HIGHLIGHTS_REQUEST = `${pre}FETCH_HIGHLIGHTS_REQUEST`;
export const FETCH_HIGHLIGHTS_SUCCESS = `${pre}FETCH_HIGHLIGHTS_SUCCESS`;
export const FETCH_HIGHLIGHTS_ERROR = `${pre}FETCH_HIGHLIGHTS_ERROR`;

export const UPVOTE_HIGHLIGHT_REQUEST = `${pre}UPVOTE_HIGHLIGHT_REQUEST`;
export const UPVOTE_HIGHLIGHT_SUCCESS = `${pre}UPVOTE_HIGHLIGHT_SUCCESS`;
export const UPVOTE_HIGHLIGHT_ERROR = `${pre}UPVOTE_HIGHLIGHT_ERROR`;

export const DOWNVOTE_HIGHLIGHT_REQUEST = `${pre}DOWNVOTE_HIGHLIGHT_REQUEST`;
export const DOWNVOTE_HIGHLIGHT_SUCCESS = `${pre}DOWNVOTE_HIGHLIGHT_SUCCESS`;
export const DOWNVOTE_HIGHLIGHT_ERROR = `${pre}DOWNVOTE_HIGHLIGHT_ERROR`;

export const downvoteHighlightRequest = highlightId => ({
    type: DOWNVOTE_HIGHLIGHT_REQUEST,
    highlightId
});

export const downvoteHighlightSuccess = highlight => ({
    type: DOWNVOTE_HIGHLIGHT_SUCCESS,
    highlight
});

export const downvoteHighlightError = error => ({
    type: DOWNVOTE_HIGHLIGHT_ERROR,
    error
});

export const upvoteHighlightRequest = highlightId => ({
    type: UPVOTE_HIGHLIGHT_REQUEST,
    highlightId
});

export const upvoteHighlightSuccess = highlight => ({
    type: UPVOTE_HIGHLIGHT_SUCCESS,
    highlight
});

export const upvoteHighlightError = error => ({
    type: UPVOTE_HIGHLIGHT_ERROR,
    error
});

export const fetchHighlightsRequest = () => ({
    type: FETCH_HIGHLIGHTS_REQUEST
});

export const fetchHighlightsSuccess = highlights => ({
    type: FETCH_HIGHLIGHTS_SUCCESS,
    highlights
});

export const fetchHighlightsError = error => ({
    type: FETCH_HIGHLIGHTS_ERROR,
    error
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
