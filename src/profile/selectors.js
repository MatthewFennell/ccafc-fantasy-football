import fp from 'lodash/fp';

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
        email: fp.get('email')(auth),
        displayName: fp.get('displayName')(auth),
        photoUrl: fp.get('photoURL')(auth),
        teamName: 'N/A'
    };
};
