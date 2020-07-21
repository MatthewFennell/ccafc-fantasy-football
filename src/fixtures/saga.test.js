import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { noop } from 'lodash';
import * as sagas from './saga';
import * as actions from './actions';
import * as selectors from './selectors';
import { setErrorMessage } from '../modalHandling/actions';
import { addNotification } from '../notifications/actions';

// https://github.com/jfairbank/redux-saga-test-plan - Docs

const api = {
    fetchMyTeam: () => 'myTeam',
    getFixtures: () => 'fixtures',
    setMyTeam: noop
};

describe('Fixtures saga', () => {
    // Deals with yield delay(x)
    const provideDelay = ({ fn }, next) => ((fn.name === 'delayP') ? null : next());

    const alreadyFetchedInfo = fetched => ({ selector }, next) => {
        if (selector === selectors.getFixtures) {
            return fetched ? ['1', '2', '3'] : [];
        }
        return next();
    };

    it('fetch fixtures', () => {
        const action = actions.fetchFixturesRequest();
        return expectSaga(sagas.fetchFixtures, api, action)
            .provide([
                { select: alreadyFetchedInfo(false) }
            ])
            .call(api.getFixtures)
            .put(actions.fetchFixturesSuccess('fixtures'))
            .put(actions.cancelFetchingFixturesAndTeam())
            .run({ silenceTimeout: true });
    });

    it('fetch fixtures error', () => {
        const error = new Error('error');
        const action = actions.fetchFixturesRequest();
        return expectSaga(sagas.fetchFixtures, api, action)
            .provide([
                [matchers.call.fn(api.getFixtures), throwError(error)],
                { select: alreadyFetchedInfo(false) }
            ])
            .put(setErrorMessage('Error Fetching Fixtures', error))
            .put(actions.cancelFetchingFixturesAndTeam())
            .run({ silenceTimeout: true });
    });

    it('set my team', () => {
        const action = actions.setMyTeamRequest('team');
        return expectSaga(sagas.setMyTeam, api, action)
            .provide({ call: provideDelay })
            .call(api.setMyTeam, ({
                team: 'team'
            }))
            .put(actions.setMyTeam('team'))
            .put(addNotification('Team successfully set'))
            .put(actions.cancelLoadingMyTeam())
            .run({ silenceTimeout: true });
    });

    it('set my team error', () => {
        const error = new Error('error');
        const action = actions.setMyTeamRequest('team');
        return expectSaga(sagas.setMyTeam, api, action)
            .provide([
                [matchers.call.fn(api.setMyTeam), throwError(error)]
            ])
            .put(setErrorMessage('Error Setting Team', error))
            .put(actions.cancelLoadingMyTeam())
            .run({ silenceTimeout: true });
    });

    it('fetch my team', () => {
        const action = actions.fetchMyTeamRequest();
        return expectSaga(sagas.fetchMyTeam, api, action)
            .call(api.fetchMyTeam)
            .put(actions.setMyTeam('myTeam'))
            .put(actions.cancelLoadingMyTeam())
            .run({ silenceTimeout: true });
    });

    it('fetch my team error', () => {
        const error = new Error('error');
        const action = actions.fetchMyTeamRequest();
        return expectSaga(sagas.fetchMyTeam, api, action)
            .provide([
                [matchers.call.fn(api.fetchMyTeam), throwError(error)]
            ])
            .put(setErrorMessage('Error Fetching Team', error))
            .put(actions.cancelLoadingMyTeam())
            .run({ silenceTimeout: true });
    });
});
