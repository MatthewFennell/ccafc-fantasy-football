import reducer, { initialState } from './reducer';
import * as actions from './actions';

describe('Profile reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('update display name request', () => {
        const action = actions.updateDisplayNameRequest(null);
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            updatingDisplayName: true
        });
    });

    it('update display name success', () => {
        const action = actions.updateDisplayNameSuccess();
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            updatingDisplayName: false
        });
    });

    it('update team name request', () => {
        const action = actions.updateTeamNameRequest(null);
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            updatingTeamName: true
        });
    });

    it('update team name success', () => {
        const action = actions.updateTeamNameSuccess();
        expect(reducer({
            ...initialState,
            updatingTeamName: true
        }, action)).toEqual({
            ...initialState,
            updatingTeamName: false
        });
    });

    it('delete account request', () => {
        const action = actions.deleteAccountRequest();
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            deletingAccount: true
        });
    });

    it('delete account success', () => {
        const action = actions.setDeletingAccount(false);
        expect(reducer({
            ...initialState,
            deletingAccount: true
        }, action)).toEqual({
            ...initialState,
            deletingAccount: false
        });
    });
});
