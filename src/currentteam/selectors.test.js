import * as selectors from './selectors';

describe('Current Team selectors', () => {
    const userId = 'userId';

    const players = ['players', 'for', 'userId'];

    const captain = 'captain';

    const state = {
        currentTeam: {
            activeTeam: {
                [userId]: {
                    captain,
                    fetched: true,
                    players
                }
            }
        }
    };

    const props = {
        match: {
            params: {
                userId
            }
        }
    };

    it('Get user id', () => {
        expect(selectors.getUserId(props)).toEqual(userId);
    });

    it('Get already fetched for user', () => {
        expect(selectors.getAlreadyFetchedForUser(state, userId)).toEqual(true);
    });

    it('Get active team', () => {
        expect(selectors.getFieldForUser(state, props, 'players')).toEqual(players);
    });

    it('Get current captain', () => {
        expect(selectors.getFieldForUser(state, props, 'captain')).toEqual(captain);
    });
});
