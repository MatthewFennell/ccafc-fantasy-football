import reducer, { initialState } from './reducer';
import * as actions from './actions';

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

    it('set success message', () => {
        const action = actions.setSuccessMessage('message');
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            successMessage: 'message'
        });
    });

    it('close success message', () => {
        const action = actions.closeSuccessMessage();
        expect(reducer({
            ...initialState,
            successMessage: 'success'
        }, action)).toEqual({
            ...initialState,
            successMessage: ''
        });
    });
});
