import reducer, { initialState } from './reducer';
import * as actions from './actions';

describe('Points reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('fetch user points for week', () => {
        const action = actions.fetchUserPointsForWeekSuccess('myUserId', 2, 'team');
        expect(reducer({
            ...initialState,
            userTeams: {
                myUserId: {
                    'week-2': {
                        fetching: true
                    }
                }
            }
        }, action)).toEqual({
            ...initialState,
            userTeams: {
                myUserId: {
                    'week-2': {
                        fetched: true,
                        fetching: true,
                        team: 'team'
                    }
                }
            }
        });
    });

    it('fetch user points for week request', () => {
        const action = actions.fetchUserPointsForWeekRequest('myUserId', 2);
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            userTeams: {
                myUserId: {
                    'week-2': {
                        fetching: true
                    }
                }
            }
        });
    });

    it('set user details fetching', () => {
        const action = actions.setUserDetailsFetching('userId');
        expect(reducer({
            ...initialState,
            userTeams: {
                userId: {
                    details: {
                        displayName: 'displayName'
                    }
                }
            }
        }, action)).toEqual({
            ...initialState,
            userTeams: {
                userId: {
                    details: {
                        displayName: 'displayName',
                        fetching: true
                    }
                }
            }
        });
    });

    it('cancel fetching user details', () => {
        const action = actions.cancelFetchingUserDetails('userId');
        expect(reducer({
            ...initialState,
            userTeams: {
                userId: {
                    details: {
                        displayName: 'displayName',
                        fetching: true
                    }
                }
            }
        }, action)).toEqual({
            ...initialState,
            userTeams: {
                userId: {
                    details: {
                        displayName: 'displayName',
                        fetching: false
                    }
                }
            }
        });
    });

    it('set user details', () => {
        const action = actions.setUserDetails('userId', {
            stat: 'stat'
        });
        expect(reducer({
            ...initialState,
            userTeams: {
                userId: {
                    details: {
                        fetching: true
                    }
                }
            }
        }, action)).toEqual({
            ...initialState,
            userTeams: {
                userId: {
                    details: {
                        stat: 'stat',
                        fetched: true
                    }
                }
            }
        });
    });

    it('cancel fetching user points for week', () => {
        const action = actions.cancelFetchingUserPointsForWeek('myUserId', 2);
        expect(reducer({
            ...initialState,
            userTeams: {
                myUserId: {
                    'week-2': {
                        fetching: true
                    }
                }
            }
        }, action)).toEqual({
            ...initialState,
            userTeams: {
                myUserId: {
                    'week-2': {
                        fetching: false
                    }
                }
            }
        });
    });
});
