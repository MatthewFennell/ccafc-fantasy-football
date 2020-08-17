/* eslint-disable max-len */
import {
    all, call, takeEvery, put, select
} from 'redux-saga/effects';
import { push } from 'connected-react-router';
import fp from 'lodash/fp';
import * as actions from './actions';
import * as leaguesApi from './api';
import * as selectors from './selectors';
import * as constants from '../constants';
import { setErrorMessage } from '../modalHandling/actions';

export function* fetchLeagues(api) {
    try {
        const alreadyFetched = yield select(selectors.getLeagues);
        if (alreadyFetched && alreadyFetched.length === 0) {
            const myLeagues = yield call(api.getLeaguesIAmIn);
            yield put(actions.fetchLeaguesSuccess(myLeagues));
        }
    } catch (error) {
        yield put(setErrorMessage('Error Fetching Leagues', error));
    } finally {
        yield put(actions.cancelFetchingLeagues());
    }
}

export function* fetchUsersInLeague(api, action) {
    try {
        const usersForThatLeague = yield select(selectors.getUsersInLeagueWithId, action.leagueId);
        const fetchedAllUsersInLeague = yield select(selectors.getFetchedAllUsersInLeague, action.leagueId);
        if (usersForThatLeague.length === 0) {
            yield put(actions.fetchingUsersInLeague(action.leagueId));
            const initialBatchOfUsers = yield call(api.getUsersInLeague,
                {
                    leagueId: action.leagueId,
                    week: action.maxGameWeek,
                    requestedSize: action.requestedSize,
                    previousId: null
                });
            yield put(actions.fetchUsersInLeagueSuccess(action.leagueId,
                initialBatchOfUsers.users, initialBatchOfUsers.numberOfUsers, initialBatchOfUsers.leagueName));
        } else
        if ((action.pageNumber + constants.LEAGUE_PAGE_BUFFER) * action.rowsPerPage > usersForThatLeague.length && !fetchedAllUsersInLeague) {
            yield put(actions.alreadyFetchedUsersInLeague(action.leagueId));
            const finalId = fp.last(usersForThatLeague).id;
            yield put(actions.fetchingUsersInLeague(action.leagueId));
            const nextBatch = yield call(api.getUsersInLeague,
                {
                    leagueId: action.leagueId,
                    week: action.maxGameWeek,
                    requestedSize: action.requestedSize,
                    previousId: finalId
                });
            if (nextBatch.users.length === 0) {
                yield put(actions.fetchedAllUsersInLeague(action.leagueId));
            } else {
                yield put(actions.fetchMoreUsersInLeagueSuccess(
                    action.leagueId, nextBatch.users, finalId
                ));
            }
        }
    } catch (error) {
        yield put(setErrorMessage('Error Fetching Users In League', error));
    } finally {
        yield put(actions.cancelFetchingUsersInLeague(action.leagueId));
    }
}

export function* createLeague(api, action) {
    try {
        yield call(api.createLeague, {
            leagueName: action.leagueName,
            startWeek: action.startWeek
        });
        const myLeagues = yield call(api.getLeaguesIAmIn);
        yield put(actions.createLeagueSuccess(myLeagues));
    } catch (error) {
        yield put(setErrorMessage('Error Creating League', error));
    } finally {
        yield put(actions.cancelCreatingLeague());
    }
}

export function* joinLeague(api, action) {
    try {
        yield call(api.joinLeague, { leagueName: action.leagueName });
        const myLeagues = yield call(api.getLeaguesIAmIn);
        yield put(actions.joinLeagueSuccess(myLeagues));
    } catch (error) {
        yield put(setErrorMessage('Error Joining League', error));
    } finally {
        yield put(actions.cancelJoiningLeague());
    }
}

export function* leaveLeague(api, action) {
    try {
        yield call(api.leaveLeague, { leagueId: action.leagueId });
        const myLeagues = yield call(api.getLeaguesIAmIn);
        yield put(actions.leaveLeagueSuccess(myLeagues));
        yield put(push(constants.URL.LEAGUES));
    } catch (error) {
        yield put(setErrorMessage('Error Leaving League', error));
    } finally {
        yield put(actions.cancelLeavingLeague());
    }
}

export default function* leaguesSaga() {
    yield all([
        takeEvery(actions.FETCH_LEAGUES_REQUEST, fetchLeagues, leaguesApi),
        takeEvery(actions.FETCH_USERS_IN_LEAGUE_REQUEST, fetchUsersInLeague, leaguesApi),
        takeEvery(actions.CREATE_LEAGUE_REQUEST, createLeague, leaguesApi),
        takeEvery(actions.JOIN_LEAGUE_REQUEST, joinLeague, leaguesApi),
        takeEvery(actions.LEAVE_LEAGUE_REQUEST, leaveLeague, leaguesApi)
    ]);
}
