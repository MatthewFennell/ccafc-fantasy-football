import * as selectors from './selectors';

describe('Charts selectors', () => {
    const allTeams = ['all', 'teams'];
    const state = {
        charts: {
            allTeams
        }
    };

    it('Get all teams', () => {
        expect(selectors.getAllTeams(state)).toEqual(allTeams);
    });
});
