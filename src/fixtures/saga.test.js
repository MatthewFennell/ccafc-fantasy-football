import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { noop } from 'lodash';
import * as sagas from './saga';
import * as actions from './actions';
import { successDelay } from '../constants';

// https://github.com/jfairbank/redux-saga-test-plan - Docs

const api = {
    fetchMyTeam: () => 'myTeam',
    getFixtures: () => 'fixtures',
    setMyTeam: noop
};

describe('Fixtures saga', () => {
    // Deals with yield delay(x)
    const provideDelay = ({ fn }, next) => ((fn.name === 'delayP') ? null : next());

    it('fetch fixtures', () => {
        const action = actions.fetchFixturesRequest();
        return expectSaga(sagas.fetchFixtures, api, action)
            .put(actions.fetchFixturesSuccess('fixtures'))
            .run();
    });

    it('fetch fixtures error', () => {
        const error = new Error('error');
        const action = actions.fetchFixturesRequest();
        return expectSaga(sagas.fetchFixtures, api, action)
            .provide([
                [matchers.call.fn(api.getFixtures), throwError(error)]
            ])
            .put(actions.setFixturesError(error, 'Error Fetching Fixtures'))
            .run();
    });

    it('set my team', () => {
        const action = actions.setMyTeamRequest('team');
        return expectSaga(sagas.setMyTeam, api, action)
            .provide({ call: provideDelay })
            .put(actions.setMyTeam('team'))
            .put(actions.setSuccessMessage('Team successfully set'))
            .delay(successDelay)
            .put(actions.closeSuccessMessage())
            .run();
    });

    it('set my team error', () => {
        const error = new Error('error');
        const action = actions.setMyTeamRequest('team');
        return expectSaga(sagas.setMyTeam, api, action)
            .provide([
                [matchers.call.fn(api.setMyTeam), throwError(error)]
            ])
            .put(actions.setFixturesError(error, 'Error Setting Team'))
            .run();
    });

    it('fetch my team', () => {
        const action = actions.fetchMyTeamRequest();
        return expectSaga(sagas.fetchMyTeam, api, action)
            .put(actions.setMyTeam('myTeam'))
            .run();
    });

    it('fetch my team error', () => {
        const error = new Error('error');
        const action = actions.fetchMyTeamRequest();
        return expectSaga(sagas.fetchMyTeam, api, action)
            .provide([
                [matchers.call.fn(api.fetchMyTeam), throwError(error)]
            ])
            .put(actions.setFixturesError(error, 'Error Fetching Team'))
            .run();
    });
});
