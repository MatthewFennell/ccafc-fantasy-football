import * as selectors from './selectors';

describe('Profile selectors', () => {
    const stateNotSignedIn = {
        firebase: {
            auth: {
                providerData: null
            }
        }
    };

    const signedInWithGoogle = {
        firebase: {
            auth: {
                providerData: [{
                    providerId: 'google.com'
                }]
            }
        }
    };

    const notEmptyProfile = {
        isEmpty: false,
        name: 'name',
        photoUrl: 'photoUrl'
    };

    const auth = {
        email: 'email',
        displayName: 'displayName',
        photoURL: 'photoUrl'
    };

    const stateEmptyProfile = {
        firebase: {
            auth,
            profile: {
                isEmpty: true
            }
        }
    };

    const stateNotEmptyProfile = {
        firebase: {
            auth,
            profile: notEmptyProfile
        }
    };

    it('Is signed is false', () => {
        expect(selectors.isSignedIn(stateNotSignedIn, 'google.com')).toEqual(false);
    });

    it('Is signed in with google', () => {
        expect(selectors.isSignedIn(signedInWithGoogle, 'google.com')).toEqual(true);
    });

    it('get profile empty', () => {
        expect(selectors.getProfile(stateEmptyProfile)).toEqual({
            email: 'email',
            displayName: 'displayName',
            photoUrl: 'photoUrl',
            teamName: 'N/A'
        });
    });

    it('get profile not empty', () => {
        expect(selectors.getProfile(stateNotEmptyProfile)).toEqual(notEmptyProfile);
    });
});
