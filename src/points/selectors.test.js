import * as selectors from './selectors';

describe('Points selectors', () => {
    const userId = 'userId';
    const team = 'someteam';

    const props = {
        match: {
            params: {
                userId,
                week: '10'
            }
        }
    };

    const state = {
        points: {
            userTeams: {
                [userId]: {
                    details: {
                        fetched: true
                    },
                    'week-10': {
                        fetched: true,
                        team
                    }
                }
            }
        }
    };

    it('Get current game week', () => {
        expect(selectors.getCurrentGameWeek(props)).toEqual(10);
    });

    it('Get user id', () => {
        expect(selectors.getUserId(props)).toEqual(userId);
    });

    it('Get already fetched', () => {
        expect(selectors.alreadyFetchedUserDetails(state, userId)).toEqual(true);
    });

    it('Get already fetched user points', () => {
        expect(selectors.alreadyFetchedUserDetails(state, userId, 10)).toEqual(true);
    });

    it('Get current info', () => {
        expect(selectors.getCurrentInfo(state, props, 'team')).toEqual(team);
    });
});
