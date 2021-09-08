import * as actions from './actions';
import reducer, { initialState } from './reducer';

describe('Error Handling reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('set error message', () => {
        const action = actions.setErrorMessage('header', ({
            code: 'code',
            message: 'message'
        }));
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            errorMessage: 'message',
            errorCode: 'code',
            errorHeader: 'header'
        });
    });

    it('close error message', () => {
        const action = actions.closeErrorMessage();
        expect(reducer({
            ...initialState,
            errorMessage: 'message',
            errorCode: 'code',
            errorHeader: 'header'
        }, action)).toEqual({
            ...initialState,
            errorMessage: '',
            errorCode: '',
            errorHeader: ''
        });
    });
});
