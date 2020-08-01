import * as selectors from './selectors';

describe('Features selectors', () => {
    const fixtures = ['some', 'test', 'fixtures'];

    const state = {
        fixtures: {
            fetchedFixtures: true,
            fixtures
        }
    };

    it('Get all teams', () => {
        expect(selectors.getFixtures(state)).toEqual(fixtures);
    });

    it('Get fetched fixtures', () => {
        expect(selectors.getFetchedFixtures(state)).toEqual(true);
    });
});
