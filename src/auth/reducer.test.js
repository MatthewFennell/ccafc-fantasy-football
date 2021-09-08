import * as actions from './actions';
import reducer, { initialState } from './reducer';

describe('Auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('resend verification email request', () => {
        const action = actions.resendEmailVerificationRequest();
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            sendingEmailVerification: true
        });
    });

    it('set loading app', () => {
        const action = actions.setLoadingApp(true);
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            loadingApp: true
        });
    });

    it('send reset password email', () => {
        const action = actions.sendPasswordResetEmail('email');
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isSendingPasswordReset: true
        });
    });

    it('cancel send reset password email', () => {
        const action = actions.cancelSendingPasswordResetEmail();
        expect(reducer({
            ...initialState,
            isSendingPasswordReset: true
        }, action)).toEqual({
            ...initialState,
            isSendingPasswordReset: false
        });
    });

    it('edit disabled page request', () => {
        const action = actions.editDisabledPageRequest('page');
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isEditingPage: 'page'
        });
    });

    it('cancel is editing page', () => {
        const action = actions.cancelEditingPage();
        expect(reducer({
            ...initialState,
            isEditingPage: 'page'
        }, action)).toEqual({
            ...initialState,
            isEditingPage: ''
        });
    });

    it('cancel sending email verification', () => {
        const action = actions.cancelSendingEmailVerification();
        expect(reducer({
            ...initialState,
            sendingEmailVerification: true
        }, action)).toEqual({
            ...initialState,
            sendingEmailVerification: false
        });
    });

    it('add permissions', () => {
        const currentPermissions = ['a', 'b', 'c'];
        const givingPermissions = ['b', 'c', 'd', 'e'];
        const newPermissions = ['a', 'b', 'c', 'd', 'e'];
        const action = actions.addPermissions(givingPermissions);
        expect(reducer({
            ...initialState,
            userPermissions: currentPermissions
        }, action)).toEqual({
            ...initialState,
            userPermissions: newPermissions
        });
    });

    it('set loaded permissions true', () => {
        const action = actions.setLoadedPermissions(true);
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            loadedPermissions: true
        });
    });

    it('set permission mappings and rules', () => {
        const action = actions.setPermissionsMappingsAndRoles({
            mappings: ['a', 'b', 'c'],
            allRoles: ['All', 'Rol', 'Es']
        });
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            permissionMappings: ['a', 'b', 'c'],
            allRoles: ['All', 'Rol', 'Es']
        });
    });
});
