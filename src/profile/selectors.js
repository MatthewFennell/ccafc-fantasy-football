import fp from 'lodash/fp';

// eslint-disable-next-line import/prefer-default-export
export const isSignedIn = (state, provider) => {
    const providerData = fp.get(
        'providerData'
    )(state.firebase.auth);

    if (!providerData) {
        return false;
    }
    return providerData.some(x => x.providerId === provider);
};

export const getProfile = state => {
    const { profile } = state.firebase;
    if (!profile.isEmpty) {
        return profile;
    }
    const { auth } = state.firebase;
    return {
        email: auth.email,
        displayName: auth.displayName,
        photoUrl: auth.photoURL,
        teamName: 'N/A'
    };
};
