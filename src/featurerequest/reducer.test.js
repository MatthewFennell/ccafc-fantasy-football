import reducer, { initialState } from './reducer';
import * as actions from './actions';

describe('Fixtures reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('delete comment request', () => {
        const action = actions.deleteCommentRequest('featureId', 'commentId');
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            commentBeingDeletedInfo: {
                commentId: 'commentId',
                featureId: 'featureId'
            }
        });
    });

    it('delete reply request', () => {
        const action = actions.deleteReplyRequest('featureId', 'commentId', 'replyId');
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            replyBeingDeletedInfo: {
                commentId: 'commentId',
                featureId: 'featureId',
                replyId: 'replyId'
            }
        });
    });

    it('cancel deleting comment', () => {
        const action = actions.cancelDeletingComment();
        expect(reducer(({
            ...initialState,
            commentBeingDeletedInfo: {
                commentId: 'commentId',
                featureId: 'featureId'
            }
        }), action)).toEqual({
            ...initialState,
            commentBeingDeletedInfo: { }
        });
    });

    it('cancel deleting reply', () => {
        const action = actions.cancelDeletingReply();
        expect(reducer(({
            ...initialState,
            replyBeingDeletedInfo: {
                commentId: 'commentId',
                featureId: 'featureId',
                replyId: 'replyId'
            }
        }), action)).toEqual({
            ...initialState,
            replyBeingDeletedInfo: { }
        });
    });

    it('submit feature request', () => {
        const action = actions.submitFeatureRequest('description', true);
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isSubmittingFeature: true
        });
    });

    it('add comment to feature request', () => {
        const action = actions.addCommentToFeatureRequest('comment', 'featureId');
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isAddingCommentToFeature: true
        });
    });

    it('add reply to comment request', () => {
        const action = actions.addReplyToCommentRequest('comment', 'featureId', 'commentId');
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isAddingCommentToFeature: true
        });
    });

    it('cancel adding feature request', () => {
        const action = actions.cancelAddingFeatureRequest();
        expect(reducer({
            ...initialState,
            isSubmittingFeature: true
        }, action)).toEqual({
            ...initialState,
            isSubmittingFeature: false
        });
    });

    it('cancel adding comment to feature request', () => {
        const action = actions.cancelAddingCommentToFeature();
        expect(reducer({
            ...initialState,
            isAddingCommentToFeature: true
        }, action)).toEqual({
            ...initialState,
            isAddingCommentToFeature: false
        });
    });
});
