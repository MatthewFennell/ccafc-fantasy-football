import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { noop } from 'lodash';
import * as sagas from './saga';
import * as actions from './actions';
import * as selectors from './selectors';
import { setErrorMessage } from '../errorHandling/actions';

// https://github.com/jfairbank/redux-saga-test-plan - Docs

const api = {
    createLeague: noop,
    joinLeague: noop,
    leaveLeague: noop,
    getLeaguesIAmIn: () => ['leagues'],
    getUsersInLeague: () => ({
        users: ['a', 'b', 'c'],
        numberOfUsers: 3,
        leagueName: 'leagueName'
    })
};

const emptyUsersApi = {
    getLeaguesIAmIn: () => ['leagues'],
    getUsersInLeague: () => ({
        users: [],
        numberOfUsers: 0,
        leagueName: 'leagueName'
    })
};

describe('League saga', () => {
    const alreadyFetchedInfo = fetched => ({ selector }, next) => {
        if (selector === selectors.getLeagues) {
            return fetched ? ['alreadyFetched'] : [];
        }
        if (selector === selectors.getUsersInLeagueWithId) {
            return [];
        }
        if (selector === selectors.getFetchedAllUsersInLeague) {
            return false;
        }
        return next();
    };

    const alreadyHaveUsers = ({ selector }, next) => {
        if (selector === selectors.getUsersInLeagueWithId) {
            return [{
                name: 'Bob',
                id: 'id'
            },
            {
                name: 'Zed',
                id: 'lastId'
            }];
        }
        if (selector === selectors.getFetchedAllUsersInLeague) {
            return false;
        }
        return next();
    };

    it('already fetched leagues', () => {
        const action = actions.fetchLeaguesRequest();
        return expectSaga(sagas.fetchLeagues, api, action)
            .provide([
                {
                    select: alreadyFetchedInfo(true)
                }
            ])
            .put(actions.alreadyFetchedLeagues())
            .run({ silenceTimeout: true });
    });

    it('getting user stats', () => {
        const action = actions.fetchLeaguesRequest();
        return expectSaga(sagas.fetchLeagues, api, action)
            .provide([
                {
                    select: alreadyFetchedInfo(false)
                }
            ])
            .put(actions.fetchLeaguesSuccess(['leagues']))
            .run({ silenceTimeout: true });
    });

    it('getting user stats error', () => {
        const error = new Error('error');
        const action = actions.fetchLeaguesRequest();
        return expectSaga(sagas.fetchLeagues, api, action)
            .provide([
                [matchers.call.fn(api.getLeaguesIAmIn), throwError(error)],
                { select: alreadyFetchedInfo(false) }
            ])
            .put(setErrorMessage('Error Fetching Leagues', error))
            .run({ silenceTimeout: true });
    });

    it('fetching users in league', () => {
        const action = actions.fetchUsersInLeagueRequest('leagueId', 5, 10, 1, 5);
        return expectSaga(sagas.fetchUsersInLeague, api, action)
            .provide([
                {
                    select: alreadyFetchedInfo(false)
                }
            ])
            .put(actions.fetchingUsersInLeague('leagueId'))
            .put(actions.fetchUsersInLeagueSuccess('leagueId', ['a', 'b', 'c'], 3, 'leagueName'))
            .run({ silenceTimeout: true });
    });

    it('fetching users in league for possible next page', () => {
        const action = actions.fetchUsersInLeagueRequest('leagueId', 5, 10, 1, 3);
        return expectSaga(sagas.fetchUsersInLeague, api, action)
            .provide([
                {
                    select: alreadyHaveUsers
                }
            ])
            .put(actions.alreadyFetchedUsersInLeague('leagueId'))
            .put(actions.fetchMoreUsersInLeagueSuccess('leagueId', ['a', 'b', 'c'], 'lastId'))
            .run({ silenceTimeout: true });
    });

    it('fetching users in league for possible next page not reaches buffer', () => {
        const action = actions.fetchUsersInLeagueRequest('leagueId', 5, 10, 1, 0);
        return expectSaga(sagas.fetchUsersInLeague, api, action)
            .provide([
                {
                    select: alreadyHaveUsers
                }
            ])
            .not.put(actions.alreadyFetchedUsersInLeague('leagueId'))
            .not.put(actions.fetchMoreUsersInLeagueSuccess('leagueId', ['a', 'b', 'c'], 'lastId'))
            .run({ silenceTimeout: true });
    });

    it('have fetched all users', () => {
        const action = actions.fetchUsersInLeagueRequest('leagueId', 5, 10, 1, 3);
        return expectSaga(sagas.fetchUsersInLeague, emptyUsersApi, action)
            .provide([
                {
                    select: alreadyHaveUsers
                }
            ])
            .put(actions.alreadyFetchedUsersInLeague('leagueId'))
            .put(actions.fetchedAllUsersInLeague('leagueId'))
            .run({ silenceTimeout: true });
    });

    it('fetching users error', () => {
        const error = new Error('error');
        const action = actions.fetchUsersInLeagueRequest('leagueId', 5, 10, 1, 3);
        return expectSaga(sagas.fetchUsersInLeague, api, action)
            .provide([
                [matchers.call.fn(api.getUsersInLeague), throwError(error)],
                { select: alreadyHaveUsers }
            ])
            .put(setErrorMessage('Error Fetching Users In League', error))
            .put(actions.cancelFetchingUsersInLeague('leagueId'))
            .run({ silenceTimeout: true });
    });

    it('create league', () => {
        const action = actions.createLeagueRequest('leagueName', 5);
        return expectSaga(sagas.createLeague, api, action)
            .put(actions.createLeagueSuccess(['leagues']))
            .run({ silenceTimeout: true });
    });

    it('create league error', () => {
        const error = new Error('error');
        const action = actions.createLeagueRequest('leagueName', 5);
        return expectSaga(sagas.createLeague, api, action)
            .provide([
                [matchers.call.fn(api.createLeague), throwError(error)]
            ])
            .put(setErrorMessage('Error Creating League', error))
            .run({ silenceTimeout: true });
    });

    it('join league', () => {
        const action = actions.joinLeagueRequest('leagueName');
        return expectSaga(sagas.joinLeague, api, action)
            .put(actions.joinLeagueSuccess(['leagues']))
            .run({ silenceTimeout: true });
    });

    it('join league error', () => {
        const error = new Error('error');
        const action = actions.joinLeagueRequest('leagueName');
        return expectSaga(sagas.joinLeague, api, action)
            .provide([
                [matchers.call.fn(api.joinLeague), throwError(error)]
            ])
            .put(setErrorMessage('Error Joining League', error))
            .run({ silenceTimeout: true });
    });

    it('leave league', () => {
        const action = actions.leaveLeagueRequest('leagueName');
        return expectSaga(sagas.leaveLeague, api, action)
            .put(actions.leaveLeagueSuccess(['leagues']))
            .run({ silenceTimeout: true });
    });

    it('leave league error', () => {
        const error = new Error('error');
        const action = actions.leaveLeagueRequest('leagueName');
        return expectSaga(sagas.leaveLeague, api, action)
            .provide([
                [matchers.call.fn(api.leaveLeague), throwError(error)]
            ])
            .put(setErrorMessage('Error Leaving League', error))
            .run({ silenceTimeout: true });
    });
});
