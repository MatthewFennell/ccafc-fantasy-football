import * as selectors from './selectors';

describe('Overview selectors', () => {
    const userId = 'userId';
    const averagePoints = 513;
    const totalPoints = 230;
    const maxGameWeek = 5;

    const props = {
        match: {
            params: {
                userId,
                week: '10'
            }
        }
    };

    const state = {
        overview: {
            userInfo: {
                [userId]: {
                    'week-10': {
                        averagePoints,
                        fetched: true
                    }
                }
            },
            userStats: {
                [userId]: {
                    fetched: true,
                    totalPoints
                }
            },
            maxGameWeek
        }
    };

    it('Get current game week', () => {
        expect(selectors.getCurrentGameWeek(props)).toEqual(10);
    });

    it('Get user id', () => {
        expect(selectors.getUserId(props)).toEqual(userId);
    });

    it('Get user info', () => {
        expect(selectors.getUserInfo(state, props, 'averagePoints')).toEqual(averagePoints);
    });

    it('Get already fetched user info', () => {
        expect(selectors.alreadyFetchedUserInfo(state, userId, 10)).toEqual(true);
    });

    it('Get already fetched user stats', () => {
        expect(selectors.alreadyFetchedUserStats(state, userId)).toEqual(true);
    });

    it('Get user stats', () => {
        expect(selectors.getUserStat(state, props, 'totalPoints')).toEqual(totalPoints);
    });

    it('Get max gameweek', () => {
        expect(selectors.getMaxGameWeek(state)).toEqual(maxGameWeek);
    });
});
