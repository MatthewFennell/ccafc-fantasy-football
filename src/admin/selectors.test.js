import * as selectors from './selectors';

describe('Admin selectors', () => {
    const allTeams = ['all', 'teams'];
    const usersWithExtraRoles = ['users', 'with', 'extra', 'roles'];
    const teamName = 'teamName';
    const playersInTeam = ['players', 'in', 'team'];
    const state = {
        admin: {
            allTeams,
            loadedHighlightsForApproval: true,
            loadedRejectedHighlights: true,
            usersWithExtraRoles,
            teamsWithPlayers: {
                [teamName]: playersInTeam
            }
        }
    };

    it('Get all teams', () => {
        expect(selectors.getAllTeams(state)).toEqual(allTeams);
    });

    it('Fetched highlights for approval', () => {
        expect(selectors.fetchedHighlightsForApproval(state)).toEqual(true);
    });

    it('Fetched rejected highlights', () => {
        expect(selectors.fetchedRejectedHighlights(state)).toEqual(true);
    });

    it('Get users with extra roles', () => {
        expect(selectors.getUsersWithExtraRoles(state)).toEqual(usersWithExtraRoles);
    });

    it('Get players in team', () => {
        expect(selectors.getPlayersInTeam(state, teamName)).toEqual(playersInTeam);
    });
});
