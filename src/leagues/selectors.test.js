import * as selectors from './selectors';

describe('Leagues selectors', () => {
    const leagues = ['some', 'test', 'leagues'];
    const leagueId = 'leagueId';
    const users = ['users', 'more', 'users'];

    const state = {
        leagues: {
            fetchingLeagues: true,
            leagues,
            usersInLeague: {
                [leagueId]: {
                    users,
                    fetchedAll: true,
                    fetching: true
                }
            }
        }
    };

    const props = {
        match: {
            params: {
                leagueId
            }
        }
    };

    it('Get all teams', () => {
        expect(selectors.getLeagues(state)).toEqual(leagues);
    });

    it('Get fetched fixtures', () => {
        expect(selectors.getLeagueId(props)).toEqual(leagueId);
    });

    it('Get fetching leagues', () => {
        expect(selectors.getFetchingLeagues(state)).toEqual(true);
    });

    it('Get users in league with id', () => {
        expect(selectors.getUsersInLeagueWithId(state, leagueId)).toEqual(users);
    });

    it('Get fetched all users in league', () => {
        expect(selectors.getFetchedAllUsersInLeague(state, leagueId)).toEqual(true);
    });

    it('Get fetching in league', () => {
        expect(selectors.getCurrentLeagueProperty(state, props, 'fetching')).toEqual(true);
    });
});
