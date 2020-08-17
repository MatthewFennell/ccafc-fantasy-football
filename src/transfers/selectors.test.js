import * as selectors from './selectors';

describe('Transfers selectors', () => {
    const allTeams = ['all', 'teams'];
    const allPlayers = ['all', 'players'];
    const currentTeam = ['current', 'team'];

    const state = {
        transfers: {
            allTeams,
            allPlayers,
            currentTeam
        }
    };

    it('Get current min week', () => {
        expect(selectors.getAllTeams(state)).toEqual(allTeams);
    });

    it('Get all players', () => {
        expect(selectors.getAllPlayers(state)).toEqual(allPlayers);
    });

    it('Get current team', () => {
        expect(selectors.getCurrentTeam(state)).toEqual(currentTeam);
    });
});
