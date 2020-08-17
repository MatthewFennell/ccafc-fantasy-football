import reducer, { initialState } from './reducer';
import * as actions from './actions';

describe('Charts reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('fetch all teams request', () => {
        const action = actions.fetchAllTeamsRequest();
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            fetchingAllTeams: true
        });
    });

    it('fetch all teams success', () => {
        const allTeams = ['a', 'b', 'c'];
        const action = actions.fetchAllTeamsSuccess(allTeams);
        expect(reducer({
            ...initialState,
            fetchingAllTeams: true
        }, action)).toEqual({
            ...initialState,
            fetchingAllTeams: true,
            allTeams
        });
    });

    it('cancel fetching all teams', () => {
        const action = actions.cancelFetchingTeams();
        expect(reducer({
            ...initialState,
            fetchingAllTeams: true
        }, action)).toEqual({
            ...initialState,
            fetchingAllTeams: false
        });
    });
});
