import fp from 'lodash/fp';
import * as adminActions from '../admin/actions';
import * as profileActions from '../profile/actions';
import * as actions from './actions';

export const initialState = {
    loadingVideos: false,
    loadingVideosToBeApproved: false,
    loadingRejectedVideos: false,
    videos: [],
    videosToBeApproved: [],
    videosRejected: [],
    highlightBeingVotedOn: '',

    loadedVideos: false,
    loadedRejectedVideos: false,
    loadedVideosToBeApproved: false,

    successMessage: '',
    isSubmittingHighlight: false,

    isAddingCommentToHighlight: false,
    commentBeingDeletedInfo: {},
    replyBeingDeletedInfo: {}
};

const highlightsReducer = (state = initialState, action) => {
    switch (action.type) {
    case actions.FETCH_HIGHLIGHTS_SUCCESS: {
        return {
            ...state,
            videos: action.highlights,
            loadedVideos: true
        };
    }
    case actions.DELETE_COMMENT_REQUEST: {
        return fp.set('commentBeingDeletedInfo', ({
            commentId: action.commentId,
            videoId: action.videoId
        }))(state);
    }
    case actions.CANCEL_DELETING_REPLY: {
        return fp.set('replyBeingDeletedInfo', {})(state);
    }
    case actions.DELETE_REPLY_REQUEST: {
        return fp.set('replyBeingDeletedInfo', ({
            commentId: action.commentId,
            videoId: action.videoId,
            replyId: action.replyId
        }))(state);
    }
    case actions.CANCEL_DELETING_COMMENT: {
        return fp.set('commentBeingDeletedInfo', {})(state);
    }
    case actions.FETCH_HIGHLIGHTS_REQUEST: {
        return fp.set('loadingVideos', true)(state);
    }
    case actions.SUBMIT_HIGHLIGHT_REQUEST: {
        return fp.set('isSubmittingHighlight', true)(state);
    }
    case actions.CANCEL_VOTING_ON_HIGHLIGHT: {
        return fp.set('highlightBeingVotedOn', '')(state);
    }
    case actions.UPVOTE_HIGHLIGHT_REQUEST: {
        return fp.set('highlightBeingVotedOn', action.highlightId)(state);
    }
    case actions.DOWNVOTE_HIGHLIGHT_REQUEST: {
        return fp.set('highlightBeingVotedOn', action.highlightId)(state);
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
    case actions.CANCEL_FETCHING_VIDEOS: {
        return fp.set('loadingVideos', false)(state);
    }
    case actions.FETCH_USER_HIGHLIGHTS_TO_BE_APPROVED_SUCCESS: {
        return {
            ...state,
            loadingVideosToBeApproved: false,
            videosToBeApproved: action.highlights,
            loadedVideosToBeApproved: true
        };
    }
    case actions.FETCH_REJECTED_HIGHLIGHTS_SUCCESS: {
        return {
            ...state,
            videosRejected: action.highlights,
            loadedRejectedVideos: true
        };
    }
    case actions.FETCH_USER_HIGHLIGHTS_TO_BE_APPROVED_REQUEST: {
        return fp.set('loadingVideosToBeApproved', true)(state);
    }
    case actions.FETCH_REJECTED_HIGHLIGHTS_REQUEST: {
        return fp.set('loadingRejectedVideos', true)(state);
    }
    case actions.CANCEL_FETCHING_REJECTED_VIDEOS: {
        return fp.set('loadingRejectedVideos', false)(state);
    }
    case actions.CANCEL_LOADING_VIDEOS_TO_BE_APPROVED: {
        return fp.set('loadingVideosToBeApproved', false)(state);
    }
    case adminActions.DELETE_HIGHLIGHT_SUCCESS: {
        return {
            ...state,
            videos: state.videos.filter(x => x.id !== action.highlight.id),
            loadingVideos: false
        };
    }
    case adminActions.APPROVE_HIGHLIGHT_SUCCESS: {
        return {
            ...state,
            videos: state.videos.concat([action.highlight]),
            loadingVideos: false
        };
    }
    case adminActions.REAPPROVE_REJECTED_HIGHLIGHT_SUCCESS: {
        return {
            ...state,
            videos: state.videos.concat([action.highlight]),
            loadingVideos: false
        };
    }
    case adminActions.APPROVE_HIGHLIGHT_REQUEST: {
        return fp.set('loadingVideos', true)(state);
    }
    case adminActions.REAPPROVE_REJECTED_HIGHLIGHT_REQUEST: {
        return fp.set('loadingVideos', true)(state);
    }
    case adminActions.DELETE_HIGHLIGHT_REQUEST: {
        return fp.set('loadingVideos', true)(state);
    }
    case actions.ADD_COMMENT_TO_VIDEO_REQUEST: {
        return fp.set('isAddingCommentToHighlight', true)(state);
    }
    case actions.ADD_REPLY_TO_VIDEO_REQUEST: {
        return fp.set('isAddingCommentToHighlight', true)(state);
    }
    case actions.CANCEL_ADDING_COMMENT_TO_VIDEO: {
        return fp.set('isAddingCommentToHighlight', false)(state);
    }
    case actions.ADD_COMMENT_TO_VIDEO_SUCCESS: {
        return {
            ...state,
            videos: state.videos.map(x => (x.id === action.video.id ? action.video : x)),
            isAddingCommentToHighlight: false
        };
    }
    case actions.ADD_REPLY_TO_VIDEO_SUCCESS: {
        return {
            ...state,
            videos: state.videos.map(x => (x.id === action.video.id ? action.video : x)),
            isAddingCommentToHighlight: false
        };
    }
    case actions.DELETE_COMMENT_SUCCESS: {
        return {
            ...state,
            videos: state.videos.map(x => (x.id === action.videoId ? ({
                ...x,
                comments: x.comments.filter(y => y.id !== action.commentId)
            }) : x))
        };
    }
    case actions.DELETE_REPLY_SUCCESS: {
        return {
            ...state,
            videos: state.videos.map(x => (x.id === action.videoId ? ({
                ...x,
                comments: x.comments.map(y => (y.id === action.commentId ? ({
                    ...y,
                    comments: y.comments.filter(z => z.id !== action.replyId)
                }) : y))
            }) : x))
        };
    }
    case profileActions.UPDATE_PROFILE_PICTURE_SUCCESS: {
        return {
            ...state,
            videos: state.videos.map(x => ({
                ...x,
                comments: x.comments.map(y => (y.userId === action.userId ? ({
                    ...y,
                    comments: y.comments.map(z => (z.userId === action.userId ? ({
                        ...z,
                        photoUrl: action.photoUrl
                    }) : z)),
                    photoUrl: action.photoUrl
                }) : ({
                    ...y,
                    comments: y.comments.map(z => (z.userId === action.userId ? ({
                        ...z,
                        photoUrl: action.photoUrl
                    }) : z))
                })))
            }))
        };
    }
    case actions.CLOSE_HIGHLIGHT_ERROR: {
        return {
            ...state,
            errorMessage: '',
            errorCode: '',
            errorHeader: ''
        };
    }
    case actions.SET_SUCCESS_MESSAGE: {
        return fp.set('successMessage', action.message)(state);
    }
    case actions.CANCEL_SUBMITTING_HIGHLIGHT: {
        return fp.set('isSubmittingHighlight', false)(state);
    }
    case actions.CLOSE_SUCCESS_MESSAGE: {
        return fp.set('successMessage', '')(state);
    }
    default:
        return state;
    }
};

export default highlightsReducer;
