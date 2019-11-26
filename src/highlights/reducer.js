import fp from 'lodash/fp';
import * as actions from './actions';

const initialState = {
    loadingVideos: false,
    videos: [],
    submitLinkError: '',
    submitLinkErrorCode: ''
};

const highlightsReducer = (state = initialState, action) => {
    switch (action.type) {
    case actions.SUBMIT_HIGHLIGHT_ERROR: {
        return {
            ...state,
            submitLinkError: action.error.message,
            submitLinkErrorCode: action.error.code
        };
    }
    case actions.CLOSE_HIGHLIGHT_ERROR: {
        return {
            ...state,
            submitLinkError: '',
            submitLinkErrorCode: ''
        };
    }
    case actions.FETCH_HIGHLIGHTS_SUCCESS: {
        return {
            ...state,
            videos: action.highlights,
            loadingVideos: false
        };
    }
    case actions.FETCH_HIGHLIGHTS_REQUEST: {
        return fp.set('loadingVideos', true)(state);
    }
    case actions.UPVOTE_HIGHLIGHT_SUCCESS: {
        return {
            ...state,
            videos: state.videos.map(x => (x.id === action.highlight.id ? action.highlight : x))
        };
    }
    case actions.DOWNVOTE_HIGHLIGHT_SUCCESS: {
        return {
            ...state,
            videos: state.videos.map(x => (x.id === action.highlight.id ? action.highlight : x))
        };
    }
    case actions.ALREADY_FETCHED_VIDEOS: {
        return fp.set('loadingVideos', false)(state);
    }
    default:
        return state;
    }
};

export default highlightsReducer;
