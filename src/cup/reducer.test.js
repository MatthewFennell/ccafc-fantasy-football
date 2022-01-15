import * as actions from './actions';
import reducer, { initialState } from './reducer';

describe('Cup reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('fetch cup request', () => {
        const action = actions.fetchCupRequest();
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isFetchingCup: true
        });
    });

    it('set is fetching cup', () => {
        const action = actions.setIsFetchingCup(true);
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isFetchingCup: true
        });
    });

    it('fetch cup success', () => {
        const action = actions.fetchCupSuccess('cup', 'cupTwo');
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            hasFetchedCup: true,
            cup: 'cup',
            cupTwo: 'cupTwo'
        });
    });
});
