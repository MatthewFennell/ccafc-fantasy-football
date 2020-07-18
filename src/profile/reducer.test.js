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

    it('delete account request', () => {
        const action = actions.deleteAccountRequest();
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            deletingAccount: true
        });
    });

    it('update profile picture request', () => {
        const action = actions.updateProfilePictureRequest('photo');
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            photoUrlBeingUpdated: 'photo'
        });
    });

    it('cancel photo url being updated', () => {
        const action = actions.cancelPhotoUrlBeingUpdated();
        expect(reducer({
            ...initialState,
            photoUrlBeingUpdated: 'someUrl'
        }, action)).toEqual({
            ...initialState,
            photoUrlBeingUpdated: ''
        });
    });

    it('cancel updating display name', () => {
        const action = actions.cancelUpdatingDisplayName();
        expect(reducer({
            ...initialState,
            updatingDisplayName: true
        }, action)).toEqual({
            ...initialState,
            updatingDisplayName: false
        });
    });

    it('cancel updating team name', () => {
        const action = actions.cancelUpdatingTeamName();
        expect(reducer({
            ...initialState,
            updatingTeamName: true
        }, action)).toEqual({
            ...initialState,
            updatingTeamName: false
        });
    });

    it('delete account success', () => {
        const action = actions.cancelDeletingAccount(false);
        expect(reducer({
            ...initialState,
            deletingAccount: true
        }, action)).toEqual({
            ...initialState,
            deletingAccount: false
        });
    });
});
