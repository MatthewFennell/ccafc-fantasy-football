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
            .provide({ call: provideDelay })
            .put(actions.setSuccessMessage('Highlight successfully submitted for approval'))
            .delay(successDelay)
            .put(actions.closeSuccessMessage())
            .run();
    });

    it('submit highlight error', () => {
        const error = new Error('error');
        const action = actions.submitHighlightRequest('videoId', 'title');
        return expectSaga(sagas.submitHighlight, api, action)
            .provide([
                [matchers.call.fn(api.submitVideo), throwError(error)]
            ])
            .put(setErrorMessage('Submit Highlight Error', error))
            .run();
    });

    it('get highlights', () => {
        const action = actions.fetchHighlightsRequest();
        return expectSaga(sagas.getHighlights, api, action)
            .provide({ select: alreadyFetchedInfo(false) })
            .put(actions.fetchHighlightsSuccess('highlights'))
            .run();
    });

    it('already fetched highlights', () => {
        const action = actions.fetchHighlightsRequest();
        return expectSaga(sagas.getHighlights, api, action)
            .provide({ select: alreadyFetchedInfo(true) })
            .put(actions.alreadyFetchedVideos())
            .run();
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
            .run();
    });

    it('upvote highlight', () => {
        const action = actions.upvoteHighlightRequest('highlightId');
        return expectSaga(sagas.upvoteHighlight, api, action)
            .put(actions.upvoteHighlightSuccess('upvote'))
            .run();
    });

    it('upvote highlight error', () => {
        const error = new Error('error');
        const action = actions.upvoteHighlightRequest('highlightId');
        return expectSaga(sagas.upvoteHighlight, api, action)
            .provide([
                [matchers.call.fn(api.upvoteHighlight), throwError(error)]
            ])
            .put(setErrorMessage('Error Upvoting Highlight', error))
            .run();
    });

    it('downvote highlight', () => {
        const action = actions.downvoteHighlightRequest('highlightId');
        return expectSaga(sagas.downvoteHighlight, api, action)
            .put(actions.downvoteHighlightSuccess('downvote'))
            .run();
    });

    it('downvote highlight error', () => {
        const error = new Error('error');
        const action = actions.downvoteHighlightRequest('highlightId');
        return expectSaga(sagas.downvoteHighlight, api, action)
            .provide([
                [matchers.call.fn(api.downvoteHighlight), throwError(error)]
            ])
            .put(setErrorMessage('Error Downvoting Highlight', error))
            .run();
    });

    it('already fetched highlights to be approved', () => {
        const action = actions.fetchUserHighlightsToBeApprovedRequest();
        return expectSaga(sagas.highlightsToBeApproved, api, action)
            .provide({ select: alreadyFetchedInfo(true) })
            .put(actions.alreadyFetchedApprovedHighlights())
            .run();
    });

    it('get highlights to be aproved', () => {
        const action = actions.fetchUserHighlightsToBeApprovedRequest();
        return expectSaga(sagas.highlightsToBeApproved, api, action)
            .provide({ select: alreadyFetchedInfo(false) })
            .put(actions.fetchUserHighlightsToBeApprovedSuccess('highlights to be approved'))
            .run();
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
            .run();
    });

    it('already fetched rejected highlights', () => {
        const action = actions.fetchRejectedHighlightsRequest();
        return expectSaga(sagas.rejectedHighlights, api, action)
            .provide({ select: alreadyFetchedInfo(true) })
            .put(actions.alreadyFetchedRejectedVideos())
            .run();
    });

    it('get rejected highlights', () => {
        const action = actions.fetchRejectedHighlightsRequest();
        return expectSaga(sagas.rejectedHighlights, api, action)
            .provide({ select: alreadyFetchedInfo(false) })
            .put(actions.fetchRejectedHighlightsSuccess('rejected highlights'))
            .run();
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
            .run();
    });

    it('add comment to video', () => {
        const action = actions.addCommentToVideoRequest('comment', 'videoId');
        return expectSaga(sagas.addCommentToVideo, api, action)
            .put(actions.addCommentToVideoSuccess('new highlight'))
            .run();
    });

    it('add comment to video error', () => {
        const error = new Error('error');
        const action = actions.addCommentToVideoRequest('comment', 'videoId');
        return expectSaga(sagas.addCommentToVideo, api, action)
            .provide([
                [matchers.call.fn(api.addComment), throwError(error)]
            ])
            .put(setErrorMessage('Error Adding Comment', error))
            .run();
    });

    it('add reply to video', () => {
        const action = actions.addReplyToVideoRequest('reply', 'videoId', 'commentId');
        return expectSaga(sagas.addReplyToVideo, api, action)
            .put(actions.addReplyToVideoSuccess('another new highlight'))
            .run();
    });

    it('add reply to video error', () => {
        const error = new Error('error');
        const action = actions.addReplyToVideoRequest('reply', 'videoId', 'commentId');
        return expectSaga(sagas.addReplyToVideo, api, action)
            .provide([
                [matchers.call.fn(api.addReply), throwError(error)]
            ])
            .put(setErrorMessage('Error Replying To Comment', error))
            .run();
    });

    it('delete comment', () => {
        const action = actions.deleteCommentRequest('videoId', 'commentId');
        return expectSaga(sagas.deleteComment, api, action)
            .put(actions.deleteCommentSuccess('videoId', 'commentId'))
            .run();
    });

    it('delete comment error', () => {
        const error = new Error('error');
        const action = actions.deleteCommentRequest('videoId', 'commentId');
        return expectSaga(sagas.deleteComment, api, action)
            .provide([
                [matchers.call.fn(api.deleteComment), throwError(error)]
            ])
            .put(setErrorMessage('Error Deleting Comment', error))
            .run();
    });

    it('delete reply', () => {
        const action = actions.deleteReplyRequest('videoId', 'commentId', 'replyId');
        return expectSaga(sagas.deleteReply, api, action)
            .put(actions.deleteReplySuccess('videoId', 'commentId', 'replyId'))
            .run();
    });

    it('delete reply error', () => {
        const error = new Error('error');
        const action = actions.deleteReplyRequest('videoId', 'commentId', 'replyId');
        return expectSaga(sagas.deleteReply, api, action)
            .provide([
                [matchers.call.fn(api.deleteReply), throwError(error)]
            ])
            .put(setErrorMessage('Error Deleting Reply', error))
            .run();
    });
});
