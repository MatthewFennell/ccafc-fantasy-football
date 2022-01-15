import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { setErrorMessage } from '../modalHandling/actions';
import * as actions from './actions';
import * as sagas from './saga';
import * as selectors from './selectors';

// https://github.com/jfairbank/redux-saga-test-plan - Docs

const api = {
    fetchCup: () => ({
        cupOne: 'cup',
        cupTwo: 'cupTwo'
    })
};

describe('Cup saga', () => {
    const alreadyFetchedInfo = fetched => ({ selector }, next) => {
        if (selector === selectors.getHasFetchedCup) {
            return fetched;
        }
        return next();
    };

    it('fetch cup success', () => {
        const action = actions.fetchCupRequest();
        return expectSaga(sagas.fetchCup, api, action)
            .provide([
                {
                    select: alreadyFetchedInfo(false)
                }
            ])
            .call(api.fetchCup)
            .put(actions.fetchCupSuccess('cup', 'cupTwo'))
            .put(actions.setIsFetchingCup(false))
            .run({ silenceTimeout: true });
    });

    it('fetch cup error', () => {
        const error = new Error('error');
        const action = actions.fetchCupRequest();
        return expectSaga(sagas.fetchCup, api, action)
            .provide([
                [matchers.call.fn(api.fetchCup), throwError(error)],
                { select: alreadyFetchedInfo(false) }
            ])
            .put(setErrorMessage('Error Fetching Cup Info', error))
            .put(actions.setIsFetchingCup(false))
            .run({ silenceTimeout: true });
    });
});
