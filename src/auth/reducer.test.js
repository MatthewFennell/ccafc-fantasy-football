import reducer, { initialState } from './reducer';
import * as actions from './actions';

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

    it('resend verification email success', () => {
        const action = actions.resendEmailVerificationSuccess();
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
