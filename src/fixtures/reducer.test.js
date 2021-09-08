import * as actions from './actions';
import reducer, { initialState } from './reducer';

describe('Fixtures reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('fetch fixtures success', () => {
        const fixtures = ['a', 'b', 'c'];
        const action = actions.fetchFixturesSuccess(fixtures);
        expect(reducer({
            ...initialState,
            loadingFixtures: true
        }, action)).toEqual({
            ...initialState,
            fixtures,
            loadingFixtures: true
        });
    });

    it('cancel loading team', () => {
        const action = actions.cancelLoadingMyTeam();
        expect(reducer({
            ...initialState,
            loadingMyTeam: true
        }, action)).toEqual({
            ...initialState,
            loadingMyTeam: false
        });
    });

    it('already fetched fixtures', () => {
        const action = actions.cancelFetchingFixturesAndTeam();
        expect(reducer({
            ...initialState,
            loadingFixtures: true,
            loadingMyTeam: true
        }, action)).toEqual({
            ...initialState,
            loadingFixtures: false,
            loadingMyTeam: false,
            fetchedFixtures: true
        });
    });

    it('fetch fixtures request', () => {
        const action = actions.fetchFixturesRequest();
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            loadingFixtures: true
        });
    });

    it('set my team', () => {
        const action = actions.setMyTeam('Demancia');
        expect(reducer({
            ...initialState,
            loadingMyTeam: true
        }, action)).toEqual({
            ...initialState,
            loadingMyTeam: true,
            myTeam: 'Demancia'
        });
    });

    it('fetch my team request', () => {
        const action = actions.fetchMyTeamRequest();
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            loadingMyTeam: true
        });
    });

    it('set my team request', () => {
        const action = actions.setMyTeamRequest();
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            loadingMyTeam: true
        });
    });
});
