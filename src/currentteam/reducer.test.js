import * as actions from './actions';
import reducer, { initialState } from './reducer';

describe('Current team reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('fetch active team success', () => {
        const activeTeam = ['a', 'b', 'c'];
        const action = actions.fetchActiveTeamSuccess('userId', activeTeam, 'captain');
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            activeTeam: {
                userId: {
                    players: activeTeam,
                    fetched: true,
                    captain: 'captain'
                }
            }
        });
    });

    it('fetch active team request', () => {
        const action = actions.fetchActiveTeamRequest('userId');
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            activeTeam: {
                userId: {
                    fetching: true
                }
            }
        });
    });

    it('set player modal open', () => {
        const action = actions.setPlayerModalOpen(true);
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isPlayerModalOpen: true
        });
    });

    it('set captain to update', () => {
        const action = actions.setCaptainToUpdate('captain');
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            captainToUpdate: 'captain'
        });
    });

    it('make captain request', () => {
        const action = actions.makeCaptainRequest();
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isUpdatingCaptain: true
        });
    });

    it('set updating captain', () => {
        const action = actions.setUpdatingCaptain(true);
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isUpdatingCaptain: true
        });
    });

    it('cancel fetching active team', () => {
        const action = actions.cancelFetchingActiveTeam('userId');
        expect(reducer({
            ...initialState,
            activeTeam: {
                userId: {
                    fetching: true
                }
            }
        }, action)).toEqual({
            ...initialState,
            activeTeam: {
                userId: {
                    fetching: false
                }
            }
        });
    });
});
