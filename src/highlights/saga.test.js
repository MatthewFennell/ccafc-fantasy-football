import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { noop } from 'lodash';
import * as sagas from './saga';
import * as actions from './actions';
import * as selectors from './selectors';
import { successDelay } from '../constants';
import { setErrorMessage } from '../errorHandling/actions';

// https://github.com/jfairbank/redux-saga-test-plan - Docs

const api = {
    addComment: () => 'new highlight',
    addReply: () => 'another new highlight',
    deleteComment: noop,
    deleteReply: noop,
    downvoteHighlight: () => 'downvote',
    getHighlights: () => 'highlights',
    getHighlightsToBeApproved: () => 'highlights to be approved',
    getRejectedHighlights: () => 'rejected highlights',
    submitVideo: noop,
    upvoteHighlight: () => 'upvote'
};

describe('Highlights saga', () => {
    const alreadyFetchedInfo = fetched => ({ selector }, next) => {
        if (selector === selectors.fetchedVideos) {
            return fetched;
        }
        if (selector === selectors.fetchedApprovedVideos) {
            return fetched;
        }
        if (selector === selectors.fetchedRejectedVideos) {
            return fetched;
        }
        return next();
    };

    // Deals with yield delay(x)
    const provideDelay = ({ fn }, next) => ((fn.name === 'delayP') ? null : next());

    it('submit highlight', () => {
        const action = actions.submitHighlightRequest('videoId', 'title');
        return expectSaga(sagas.submitHighlight, api, action)
            .call(api.submitVideo, ({
                videoId: 'videoId',
                title: 'title'
            }))
            .provide({ call: provideDelay })
            .put(actions.setSuccessMessage('Highlight successfully submitted for approval'))
            .delay(successDelay)
            .put(actions.closeSuccessMessage())
            .put(actions.cancelSubmittingHighlight())
            .run({ silenceTimeout: true });
    });

    it('submit highlight error', () => {
        const error = new Error('error');
        const action = actions.submitHighlightRequest('videoId', 'title');
        return expectSaga(sagas.submitHighlight, api, action)
            .provide([
                [matchers.call.fn(api.submitVideo), throwError(error)]
            ])
            .put(setErrorMessage('Submit Highlight Error', error))
            .put(actions.cancelSubmittingHighlight())
            .run({ silenceTimeout: true });
    });

    it('get highlights', () => {
        const action = actions.fetchHighlightsRequest();
        return expectSaga(sagas.getHighlights, api, action)
            .provide({ select: alreadyFetchedInfo(false) })
            .call(api.getHighlights)
            .put(actions.fetchHighlightsSuccess('highlights'))
            .put(actions.cancelFetchingVideos())
            .run({ silenceTimeout: true });
    });

    it('already fetched highlights', () => {
        const action = actions.fetchHighlightsRequest();
        return expectSaga(sagas.getHighlights, api, action)
            .provide({ select: alreadyFetchedInfo(true) })
            .put(actions.cancelFetchingVideos())
            .run({ silenceTimeout: true });
    });

    it('fetch highlights error', () => {
        const error = new Error('error');
        const action = actions.fetchHighlightsRequest();
        return expectSaga(sagas.getHighlights, api, action)
            .provide([
                [matchers.call.fn(api.getHighlights), throwError(error)],
                { select: alreadyFetchedInfo(false) }
            ])
            .put(setErrorMessage('Error Fetching Highlights', error))
            .put(actions.cancelFetchingVideos())
            .run({ silenceTimeout: true });
    });

    it('upvote highlight', () => {
        const action = actions.upvoteHighlightRequest('highlightId');
        return expectSaga(sagas.upvoteHighlight, api, action)
            .call(api.upvoteHighlight, ({
                highlightId: 'highlightId'
            }))
            .put(actions.upvoteHighlightSuccess('upvote'))
            .put(actions.cancelVotingOnHighlight())
            .run({ silenceTimeout: true });
    });

    it('upvote highlight error', () => {
        const error = new Error('error');
        const action = actions.upvoteHighlightRequest('highlightId');
        return expectSaga(sagas.upvoteHighlight, api, action)
            .provide([
                [matchers.call.fn(api.upvoteHighlight), throwError(error)]
            ])
            .put(setErrorMessage('Error Upvoting Highlight', error))
            .put(actions.cancelVotingOnHighlight())
            .run({ silenceTimeout: true });
    });

    it('downvote highlight', () => {
        const action = actions.downvoteHighlightRequest('highlightId');
        return expectSaga(sagas.downvoteHighlight, api, action)
            .call(api.downvoteHighlight, ({
                highlightId: 'highlightId'
            }))
            .put(actions.downvoteHighlightSuccess('downvote'))
            .put(actions.cancelVotingOnHighlight())
            .run({ silenceTimeout: true });
    });

    it('downvote highlight error', () => {
        const error = new Error('error');
        const action = actions.downvoteHighlightRequest('highlightId');
        return expectSaga(sagas.downvoteHighlight, api, action)
            .provide([
                [matchers.call.fn(api.downvoteHighlight), throwError(error)]
            ])
            .put(setErrorMessage('Error Downvoting Highlight', error))
            .put(actions.cancelVotingOnHighlight())
            .run({ silenceTimeout: true });
    });

    it('cancel fetching highlights to be approved', () => {
        const action = actions.fetchUserHighlightsToBeApprovedRequest();
        return expectSaga(sagas.highlightsToBeApproved, api, action)
            .provide({ select: alreadyFetchedInfo(true) })
            .put(actions.cancelLoadingVideosToBeApproved())
            .run({ silenceTimeout: true });
    });

    it('get highlights to be aproved', () => {
        const action = actions.fetchUserHighlightsToBeApprovedRequest();
        return expectSaga(sagas.highlightsToBeApproved, api, action)
            .provide({ select: alreadyFetchedInfo(false) })
            .call(api.getHighlightsToBeApproved)
            .put(actions.fetchUserHighlightsToBeApprovedSuccess('highlights to be approved'))
            .put(actions.cancelLoadingVideosToBeApproved())
            .run({ silenceTimeout: true });
    });

    it('get highlights to be aproved error', () => {
        const error = new Error('error');
        const action = actions.fetchUserHighlightsToBeApprovedRequest();
        return expectSaga(sagas.highlightsToBeApproved, api, action)
            .provide([
                [matchers.call.fn(api.getHighlightsToBeApproved), throwError(error)],
                { select: alreadyFetchedInfo(false) }
            ])
            .put(setErrorMessage('Error Fetching Highlights For Approval', error))
            .run({ silenceTimeout: true });
    });

    it('already fetched rejected highlights', () => {
        const action = actions.fetchRejectedHighlightsRequest();
        return expectSaga(sagas.rejectedHighlights, api, action)
            .provide({ select: alreadyFetchedInfo(true) })
            .put(actions.cancelFetchingRejectedVideos())
            .run({ silenceTimeout: true });
    });

    it('get rejected highlights', () => {
        const action = actions.fetchRejectedHighlightsRequest();
        return expectSaga(sagas.rejectedHighlights, api, action)
            .provide({ select: alreadyFetchedInfo(false) })
            .call(api.getRejectedHighlights)
            .put(actions.fetchRejectedHighlightsSuccess('rejected highlights'))
            .run({ silenceTimeout: true });
    });

    it('get rejected highlights error', () => {
        const error = new Error('error');
        const action = actions.fetchRejectedHighlightsRequest();
        return expectSaga(sagas.rejectedHighlights, api, action)
            .provide([
                [matchers.call.fn(api.getRejectedHighlights), throwError(error)],
                { select: alreadyFetchedInfo(false) }
            ])
            .put(setErrorMessage('Error Fetching Rejected Highlights', error))
            .run({ silenceTimeout: true });
    });

    it('add comment to video', () => {
        const action = actions.addCommentToVideoRequest('comment', 'videoId');
        return expectSaga(sagas.addCommentToVideo, api, action)
            .call(api.addComment, ({
                collection: 'highlights',
                collectionId: 'videoId',
                comment: 'comment'
            }))
            .put(actions.addCommentToVideoSuccess('new highlight'))
            .put(actions.cancelAddingCommentToVideo())
            .run({ silenceTimeout: true });
    });

    it('add comment to video error', () => {
        const error = new Error('error');
        const action = actions.addCommentToVideoRequest('comment', 'videoId');
        return expectSaga(sagas.addCommentToVideo, api, action)
            .provide([
                [matchers.call.fn(api.addComment), throwError(error)]
            ])
            .put(setErrorMessage('Error Adding Comment', error))
            .run({ silenceTimeout: true });
    });

    it('add reply to video', () => {
        const action = actions.addReplyToVideoRequest('reply', 'videoId', 'commentId');
        return expectSaga(sagas.addReplyToVideo, api, action)
            .call(api.addReply, ({
                collection: 'highlights',
                collectionId: 'videoId',
                commentId: 'commentId',
                reply: 'reply'
            }))
            .put(actions.addReplyToVideoSuccess('another new highlight'))
            .put(actions.cancelAddingCommentToVideo())
            .run({ silenceTimeout: true });
    });

    it('add reply to video error', () => {
        const error = new Error('error');
        const action = actions.addReplyToVideoRequest('reply', 'videoId', 'commentId');
        return expectSaga(sagas.addReplyToVideo, api, action)
            .provide([
                [matchers.call.fn(api.addReply), throwError(error)]
            ])
            .put(setErrorMessage('Error Replying To Comment', error))
            .run({ silenceTimeout: true });
    });

    it('delete comment', () => {
        const action = actions.deleteCommentRequest('videoId', 'commentId');
        return expectSaga(sagas.deleteComment, api, action)
            .call(api.deleteComment, ({
                collection: 'highlights',
                collectionId: 'videoId',
                commentId: 'commentId'
            }))
            .put(actions.deleteCommentSuccess('videoId', 'commentId'))
            .put(actions.cancelDeletingComment())
            .run({ silenceTimeout: true });
    });

    it('delete comment error', () => {
        const error = new Error('error');
        const action = actions.deleteCommentRequest('videoId', 'commentId');
        return expectSaga(sagas.deleteComment, api, action)
            .provide([
                [matchers.call.fn(api.deleteComment), throwError(error)]
            ])
            .put(setErrorMessage('Error Deleting Comment', error))
            .put(actions.cancelDeletingComment())
            .run({ silenceTimeout: true });
    });

    it('delete reply', () => {
        const action = actions.deleteReplyRequest('videoId', 'commentId', 'replyId');
        return expectSaga(sagas.deleteReply, api, action)
            .call(api.deleteReply, ({
                collection: 'highlights',
                collectionId: 'videoId',
                commentId: 'commentId',
                replyId: 'replyId'
            }))
            .put(actions.deleteReplySuccess('videoId', 'commentId', 'replyId'))
            .put(actions.cancelDeletingReply())
            .run({ silenceTimeout: true });
    });

    it('delete reply error', () => {
        const error = new Error('error');
        const action = actions.deleteReplyRequest('videoId', 'commentId', 'replyId');
        return expectSaga(sagas.deleteReply, api, action)
            .provide([
                [matchers.call.fn(api.deleteReply), throwError(error)]
            ])
            .put(setErrorMessage('Error Deleting Reply', error))
            .put(actions.cancelDeletingReply())
            .run({ silenceTimeout: true });
    });
});
