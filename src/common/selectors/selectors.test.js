import * as selectors from './selectors';

describe('Common selectors', () => {
    const displayName = 'a display name';
    const email = 'an email';

    const state = {
        firebase: {
            auth: {
                displayName,
                email
            }
        }
    };

    it('Get display name', () => {
        expect(selectors.getDisplayName(state)).toEqual(displayName);
    });

    it('Get all teams', () => {
        expect(selectors.getEmail(state)).toEqual(email);
    });
});
