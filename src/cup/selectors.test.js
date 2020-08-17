import * as selectors from './selectors';

describe('Cup selectors', () => {
    const state = {
        cup: {
            hasFetchedCup: true
        }
    };

    it('Get all teams', () => {
        expect(selectors.getHasFetchedCup(state)).toEqual(true);
    });
});
