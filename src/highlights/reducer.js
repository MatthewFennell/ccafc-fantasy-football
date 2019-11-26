import fp from 'lodash/fp';
import * as actions from './actions';

const initialState = {
    loadingVideos: false,
    loadingVideosToBeApproved: false,
    loadingRejectedVideos: false,
    videos: [],
    videosToBeApproved: [],
    videosRejected: [],
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
    case actions.FETCH_USER_HIGHLIGHTS_TO_BE_APPROVED_SUCCESS: {
        return {
            ...state,
            loadingVideosToBeApproved: false,
            videosToBeApproved: action.highlights
        };
    }
    case actions.FETCH_REJECTED_HIGHLIGHTS_SUCCESS: {
        return {
            ...state,
            loadingRejectedVideos: false,
            videosRejected: action.highlights
        };
    }
    case actions.FETCH_USER_HIGHLIGHTS_TO_BE_APPROVED_REQUEST: {
        return fp.set('loadingVideosToBeApproved', true)(state);
    }
    case actions.FETCH_REJECTED_HIGHLIGHTS_REQUEST: {
        return fp.set('loadingRejectedVideos', true)(state);
    }
    default:
        return state;
    }
};

export default highlightsReducer;
