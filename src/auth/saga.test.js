import { push } from 'connected-react-router';
import firebase from 'firebase';
import { noop } from 'lodash';
import { constants } from 'react-redux-firebase';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import * as consts from '../constants';
import { successDelay } from '../constants';
import { setErrorMessage } from '../modalHandling/actions';
import { addNotification } from '../notifications/actions';
import { fetchMaxGameWeekRequest } from '../overview/actions';
import * as actions from './actions';
import * as sagas from './saga';

// https://github.com/jfairbank/redux-saga-test-plan - Docs

const adminPermissions = ['PERMISSION_ONE', 'PERMISSION_TWO'];
const editorPermissions = ['PERMISSION_FOUR', 'PERMISSION_FIVE'];

const rolePermissions = {
    mappings: {
        ADMIN: adminPermissions,
        MAINTAINER: ['PERMISSION_THREE', 'PERMISSION_FOUR'],
        EDITOR: editorPermissions
    },
    allRoles: ['ADMIN', 'MAINTAINER', 'EDITOR']
};

const api = {
    editDisabledPages: noop,
    getRolePermissions: () => rolePermissions,
    updateDisplayName: noop
};

describe('Auth saga', () => {
    const onAuthStateChanged = jest.fn();

    const getRedirectResult = jest.fn(() => Promise.resolve({
        user: {
            displayName: 'redirectResultTestDisplayName',
            email: 'redirectTest@test.com',
            emailVerified: true
        }
    }));

    const sendEmailVerification = jest.fn(() => Promise.resolve('result of sendEmailVerification'));
    const signOut = jest.fn(() => Promise.resolve('result of sendEmailVerification'));

    const sendPasswordResetEmail = jest.fn(() => Promise.resolve());

    const createUserWithEmailAndPassword = jest.fn(() => Promise.resolve('result of createUserWithEmailAndPassword'));

    const signInWithEmailAndPassword = jest.fn(() => Promise.resolve('result of signInWithEmailAndPassword'));

    const signInWithRedirect = jest.fn(() => Promise.resolve('result of signInWithRedirect'));

    jest.spyOn(firebase, 'initializeApp')
        .mockImplementation(() => ({
            auth: () => ({
                createUserWithEmailAndPassword,
                signInWithEmailAndPassword,
                currentUser: {
                    sendEmailVerification
                },
                signInWithRedirect,
                signOut
            })
        }));

    jest.spyOn(firebase, 'auth').mockImplementation(() => ({
        onAuthStateChanged,
        currentUser: {
            displayName: 'testDisplayName',
            email: 'test@test.com',
            emailVerified: true,
            providerData: ['google', 'facebook'],
            sendEmailVerification: noop,
            getIdTokenResult: () => ({
                claims: {
                    ADMIN: true,
                    EDITOR: true
                }
            })
        },
        getRedirectResult,
        sendPasswordResetEmail,
        signOut,
        createUserWithEmailAndPassword: noop,
        signInWithEmailAndPassword: noop
    }));

    firebase.auth.FacebookAuthProvider = jest.fn(() => {});
    firebase.auth.GoogleAuthProvider = jest.fn(() => {});

    firebase.auth().signOut = jest.fn(noop);

    const provideDelay = ({ fn }, next) => ((fn.name === 'delayP') ? null : next());

    it('sign out success', () => {
        const action = actions.signOut();
        return expectSaga(sagas.signOut, api, action)
            .put(actions.signOutSuccess())
            .run({ silenceTimeout: true });
    });

    it('logging in', () => {
        const action = {
            type: constants.actionTypes.LOGIN,
            auth: {
                emailVerified: false
            }
        };
        return expectSaga(sagas.loggingIn, api, action)
            .put(fetchMaxGameWeekRequest())
            .put(push(consts.URL.VERIFY_EMAIL))
            .call(api.getRolePermissions)
            .put(actions.setPermissionsMappingsAndRoles(rolePermissions))
            .put(actions.addPermissions(adminPermissions))
            .put(actions.addPermissions(editorPermissions))
            .put(actions.setLoadedPermissions(true))
            .run({ silenceTimeout: true });
    });

    it('logging in email verified', () => {
        const action = {
            type: constants.actionTypes.LOGIN,
            auth: {
                emailVerified: true
            }
        };
        return expectSaga(sagas.loggingIn, api, action)
            .not.put(push(consts.URL.VERIFY_EMAIL))
            .run({ silenceTimeout: true });
    });

    it('set app loading', () => expectSaga(sagas.setAppLoading)
        .provide({ call: provideDelay })
        .put(actions.setLoadingApp(true))
        .delay(successDelay)
        .put(actions.setLoadingApp(false))
        .run({ silenceTimeout: true }));

    it('logging in error', () => {
        const error = new Error('error');
        const action = {
            type: constants.actionTypes.LOGIN,
            auth: {
                emailVerified: false
            }
        };
        return expectSaga(sagas.loggingIn, api, action)
            .provide([
                [matchers.call.fn(api.getRolePermissions), throwError(error)]
            ])
            .put(setErrorMessage('Error Signing In', error))
            .run({ silenceTimeout: true });
    });

    it('sign up', () => {
        const action = actions.signUp('email', 'password', 'display');
        return expectSaga(sagas.signUp, api, action)
            .call(api.updateDisplayName, ({
                displayName: 'display'
            }))
            .run({ silenceTimeout: true });
    });

    it('sign up error', () => {
        const error = new Error('error');
        const action = actions.signUp('email', 'password');
        return expectSaga(sagas.signUp, api, action)
            .provide([
                [matchers.call.fn(api.updateDisplayName), throwError(error)]
            ])
            .put(setErrorMessage('Error Signing Up', error))
            .run({ silenceTimeout: true });
    });

    it('sign in', () => {
        const action = actions.signIn('email', 'password');
        return expectSaga(sagas.signIn, api, action)
            .put(actions.signInSuccess())
            .run({ silenceTimeout: true });
    });

    it('resend email verification', () => {
        const action = actions.resendEmailVerificationRequest();
        return expectSaga(sagas.resendVerificationEmall, api, action)
            .put(actions.cancelSendingEmailVerification())
            .run({ silenceTimeout: true });
    });

    it('send reset email password', () => {
        const action = actions.sendPasswordResetEmail();
        return expectSaga(sagas.sendResetPasswordEmail, api, action)
            .put(addNotification('Player Price successfully changed'))
            .put(actions.cancelSendingPasswordResetEmail())
            .run({ silenceTimeout: true });
    });

    it('edit disabled page', () => {
        const action = actions.editDisabledPageRequest('page', true);
        return expectSaga(sagas.editDisabledPage, api, action)
            .call(api.editDisabledPages, ({
                page: 'page',
                isDisabled: true
            }))
            .put(actions.cancelEditingPage())
            .run({ silenceTimeout: true });
    });

    it('edit disabled error', () => {
        const error = new Error('error');
        const action = actions.editDisabledPageRequest('page', true);
        return expectSaga(sagas.editDisabledPage, api, action)
            .provide([
                [matchers.call.fn(api.editDisabledPages), throwError(error)]
            ])
            .put(setErrorMessage('Error Editing Disabled Pages', error))
            .run({ silenceTimeout: true });
    });
});
