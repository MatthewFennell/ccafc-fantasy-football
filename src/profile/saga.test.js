import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { noop } from 'lodash';
import * as firebase from 'firebase';
import * as sagas from './saga';
import * as actions from './actions';
import { signOut } from '../auth/actions';
import { setErrorMessage } from '../modalHandling/actions';

// https://github.com/jfairbank/redux-saga-test-plan - Docs

const api = {
    deleteUser: noop,
    linkFacebookAccount: noop,
    updateDisplayName: noop,
    updateProfilePicture: noop,
    updateTeamName: noop
};

describe('Profile saga', () => {
    const onAuthStateChanged = jest.fn();

    const getRedirectResult = jest.fn(() => Promise.resolve({
        user: {
            displayName: 'redirectResultTestDisplayName',
            email: 'redirectTest@test.com',
            emailVerified: true
        }
    }));

    const sendEmailVerification = jest.fn(() => Promise.resolve('result of sendEmailVerification'));

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
                signInWithRedirect
            })
        }));

    jest.spyOn(firebase, 'auth').mockImplementation(() => ({
        onAuthStateChanged,
        currentUser: {
            displayName: 'testDisplayName',
            email: 'test@test.com',
            emailVerified: true,
            providerData: ['google', 'facebook'],
            linkWithPopup: noop,
            uid: 'uid'
        },
        getRedirectResult,
        sendPasswordResetEmail
    }));

    firebase.auth.FacebookAuthProvider = jest.fn(() => {});
    firebase.auth.GoogleAuthProvider = jest.fn(() => {});

    it('link profile to google', () => {
        const action = actions.linkProfileToGoogle();
        return expectSaga(sagas.linkProfileToGoogle, api, action)
            .run({ silenceTimeout: true });
    });

    it('link profile to facebook', () => {
        const action = actions.linkProfileToFacebook();
        return expectSaga(sagas.linkProfileToFacebook, api, action)
            .call(api.linkFacebookAccount)
            .run({ silenceTimeout: true });
    });

    // it('link profile to facebook error', () => {
    //     const error = new Error('error');
    //     const action = actions.linkProfileToFacebook();
    //     return expectSaga(sagas.linkProfileToFacebook, api, action)
    //         .provide([
    //             [matchers.call.fn(api.linkFacebookAccount), throwError(error)]
    //         ])
    //         .put(addNotification(error))
    //         .run({ silenceTimeout: true });;
    // });

    it('update display name', () => {
        const action = actions.updateDisplayNameRequest('displayName');
        return expectSaga(sagas.updateDisplayName, api, action)
            .call(api.updateDisplayName, ({
                displayName: 'displayName'
            }))
            .put(actions.updateDisplayNameSuccess())
            .put(actions.cancelUpdatingDisplayName())
            .run({ silenceTimeout: true });
    });

    it('update display name error', () => {
        const error = new Error('error');
        const action = actions.updateDisplayNameRequest('displayName');
        return expectSaga(sagas.updateDisplayName, api, action)
            .provide([
                [matchers.call.fn(api.updateDisplayName), throwError(error)]
            ])
            .put(setErrorMessage('Error Updating Display Name', error))
            .put(actions.cancelUpdatingDisplayName())
            .run({ silenceTimeout: true });
    });

    it('update team name', () => {
        const action = actions.updateTeamNameRequest('teamName');
        return expectSaga(sagas.updateTeamName, api, action)
            .call(api.updateTeamName, ({
                teamName: 'teamName'
            }))
            .put(actions.cancelUpdatingTeamName())
            .run({ silenceTimeout: true });
    });

    it('update team name error', () => {
        const error = new Error('error');
        const action = actions.updateTeamNameRequest('teamName');
        return expectSaga(sagas.updateTeamName, api, action)
            .provide([
                [matchers.call.fn(api.updateTeamName), throwError(error)]
            ])
            .put(actions.cancelUpdatingTeamName())
            .run({ silenceTimeout: true });
    });

    it('delete account error', () => {
        const action = actions.deleteAccountRequest('email');
        return expectSaga(sagas.deleteAccount, api, action)
            .put(setErrorMessage('Error Deleting Account', {
                code: 'not-found',
                message: 'That is not your email'
            }))
            .put(actions.cancelDeletingAccount())
            .run({ silenceTimeout: true });
    });

    it('delete account throw error', () => {
        const error = new Error('error');
        const action = actions.deleteAccountRequest('test@test.com');
        return expectSaga(sagas.deleteAccount, api, action)
            .provide([
                [matchers.call.fn(api.deleteUser), throwError(error)]
            ])
            .put(setErrorMessage('Error Deleting Account', error))
            .put(actions.cancelDeletingAccount())
            .run({ silenceTimeout: true });
    });

    it('delete account', () => {
        const action = actions.deleteAccountRequest('test@test.com');
        return expectSaga(sagas.deleteAccount, api, action)
            .call(api.deleteUser, ({
                email: 'test@test.com'
            }))
            .put(signOut())
            .put(actions.cancelDeletingAccount())
            .run({ silenceTimeout: true });
    });

    it('update profile picture', () => {
        const action = actions.updateProfilePictureRequest('photoUrl');
        return expectSaga(sagas.updateProfilePicture, api, action)
            .call(api.updateProfilePicture, ({
                photoUrl: 'photoUrl'
            }))
            .put(actions.updateProfilePictureSuccess('photoUrl', 'uid'))
            .put(actions.cancelPhotoUrlBeingUpdated())
            .run({ silenceTimeout: true });
    });

    it('update profile picture error', () => {
        const error = new Error('error');
        const action = actions.updateProfilePictureRequest('photoUrl');
        return expectSaga(sagas.updateProfilePicture, api, action)
            .provide([
                [matchers.call.fn(api.updateProfilePicture), throwError(error)]
            ])
            .put(setErrorMessage('Error Updating Profile Picture', error))
            .put(actions.cancelPhotoUrlBeingUpdated())
            .run({ silenceTimeout: true });
    });
});
