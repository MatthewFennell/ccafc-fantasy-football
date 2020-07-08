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
