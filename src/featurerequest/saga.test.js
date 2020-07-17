import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { noop } from 'lodash';
import * as sagas from './saga';
import * as actions from './actions';
import { successDelay } from '../constants';
import { setErrorMessage } from '../errorHandling/actions';

// https://github.com/jfairbank/redux-saga-test-plan - Docs

const api = {
    addComment: noop,
    addReply: noop,
    deleteComment: noop,
    deleteReply: noop,
    submitFeature: noop
};

describe('Feature requests saga', () => {
    // Deals with yield delay(x)
    const provideDelay = ({ fn }, next) => ((fn.name === 'delayP') ? null : next());

    it('add reply to comment', () => {
        const action = actions.addReplyToCommentRequest('reply', 'featureId', 'commentId');
        return expectSaga(sagas.addReplyToComment, api, action)
            .run({ silenceTimeout: true });
    });

    it('add reply to comment error', () => {
        const error = new Error('error');
        const action = actions.addReplyToCommentRequest('reply', 'featureId', 'commentId');
        return expectSaga(sagas.addReplyToComment, api, action)
            .provide([
                [matchers.call.fn(api.addReply), throwError(error)]
            ])
            .put(setErrorMessage('Error Replying To Feature Request', error))
            .run({ silenceTimeout: true });
    });

    it('add comment to feature', () => {
        const action = actions.addCommentToFeatureRequest('comment', 'featureId');
        return expectSaga(sagas.addCommentToFeature, api, action)
            .run({ silenceTimeout: true });
    });

    it('add comment to feature error', () => {
        const error = new Error('error');
        const action = actions.addCommentToFeatureRequest('comment', 'feature');
        return expectSaga(sagas.addCommentToFeature, api, action)
            .provide([
                [matchers.call.fn(api.addComment), throwError(error)]
            ])
            .put(setErrorMessage('Error Adding Comment To Feature Request', error))
            .run({ silenceTimeout: true });
    });

    it('submit feature', () => {
        const action = actions.submitFeatureRequest('description');
        return expectSaga(sagas.submitFeature, api, action)
            .provide({ call: provideDelay })
            .put(actions.setSuccessMessage('Feature submitted successfully'))
            .delay(successDelay)
            .put(actions.closeSuccessMessage())
            .run({ silenceTimeout: true });
    });

    it('submit feature error', () => {
        const error = new Error('error');
        const action = actions.submitFeatureRequest('description');
        return expectSaga(sagas.submitFeature, api, action)
            .provide([
                [matchers.call.fn(api.submitFeature), throwError(error)]
            ])
            .put(setErrorMessage('Error Submitting Feature Request', error))
            .run({ silenceTimeout: true });
    });

    it('delete comment', () => {
        const action = actions.deleteCommentRequest('featureId', 'commentId');
        return expectSaga(sagas.deleteComment, api, action)
            .run({ silenceTimeout: true });
    });

    it('delete comment error', () => {
        const error = new Error('error');
        const action = actions.deleteCommentRequest('featureId', 'commentId');
        return expectSaga(sagas.deleteComment, api, action)
            .provide([
                [matchers.call.fn(api.deleteComment), throwError(error)]
            ])
            .put(setErrorMessage('Error Deleting Comment', error))
            .run({ silenceTimeout: true });
    });

    it('delete reply ', () => {
        const action = actions.deleteReplyRequest('featureId', 'commentId', 'replyId');
        return expectSaga(sagas.deleteReply, api, action)
            .run({ silenceTimeout: true });
    });

    it('delete reply error', () => {
        const error = new Error('error');
        const action = actions.deleteReplyRequest('featureId', 'commentId', 'replyId');
        return expectSaga(sagas.deleteReply, api, action)
            .provide([
                [matchers.call.fn(api.deleteReply), throwError(error)]
            ])
            .put(setErrorMessage('Error Deleting Reply', error))
            .run({ silenceTimeout: true });
    });
});
