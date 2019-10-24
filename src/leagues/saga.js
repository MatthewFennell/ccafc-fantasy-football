/* eslint-disable max-len */
import {
    all, call, takeEvery, put, select
} from 'redux-saga/effects';
import { push } from 'connected-react-router';
import fp from 'lodash/fp';
import * as actions from './actions';
import * as api from './api';
import * as selectors from './selectors';
import * as constants from '../constants';

const PAGE_BUFFER = 3;

function* fetchLeagues() {
    try {
        const alreadyFetched = yield select(selectors.getLeagues);
        if (alreadyFetched && alreadyFetched.length === 0) {
            const myLeagues = yield call(api.getLeaguesIAmIn);
            yield put(actions.fetchLeaguesSuccess(myLeagues));
        } else {
            yield put(actions.alreadyFetchedLeagues());
        }
    } catch (error) {
        yield put(actions.fetchLeaguesError(error));
    }
}

// function* fetchUsersInLeague(action) {
//     try {
//         const usersForThatLeague = yield select(selectors.getUsersInLeagueWithId, action.leagueId);
//         if (usersForThatLeague.length === 0) {
//             const usersInLeague = yield call(api.getUsersInLeague,
//                 {
//                     leagueId: action.leagueId,
//                     week: action.maxGameWeek
//                 });
//             yield put(actions.fetchUsersInLeagueSuccess(action.leagueId, usersInLeague));
//         } else {
//             yield put(actions.alreadyFetchedUsersInLeague());
//         }
//     } catch (error) {
//         yield put(actions.fetchUsersInLeagueError(error));
//     }
// }

function* fetchUsersInLeague(action) {
    try {
        const usersForThatLeague = yield select(selectors.getUsersInLeagueWithId, action.leagueId);
        const fetchedAllUsersInLeague = yield select(selectors.getFetchedAllUsersInLeague, action.leagueId);
        if (usersForThatLeague.length === 0) {
            const initialBatchOfUsers = yield call(api.getUsersInLeague,
                {
                    leagueId: action.leagueId,
                    week: action.maxGameWeek,
                    requestedSize: action.requestedSize,
                    previousId: null
                });
            yield put(actions.fetchUsersInLeagueSuccess(action.leagueId, initialBatchOfUsers));
        } else
        if ((action.pageNumber + PAGE_BUFFER) * action.rowsPerPage > usersForThatLeague.length && !fetchedAllUsersInLeague) {
            yield put(actions.alreadyFetchedUsersInLeague());
            const finalId = fp.last(usersForThatLeague).id;
            const nextBatch = yield call(api.getUsersInLeague,
                {
                    leagueId: action.leagueId,
                    week: action.maxGameWeek,
                    requestedSize: action.requestedSize,
                    previousId: finalId
                });
            if (nextBatch.length === 0) {
                yield put(actions.fetchedAllUsersInLeague(action.leagueId));
            } else {
                yield put(actions.fetchMoreUsersInLeagueSuccess(
                    action.leagueId, nextBatch, finalId
                ));
            }
        } else {
            yield put(actions.alreadyFetchedUsersInLeague());
        }
    } catch (error) {
        yield put(actions.fetchUsersInLeagueError(error));
    }
}

function* createLeague(action) {
    try {
        yield call(api.createLeague, {
            leagueName: action.leagueName,
            startWeek: action.startWeek
        });
        const myLeagues = yield call(api.getLeaguesIAmIn);
        yield put(actions.createLeagueSuccess(myLeagues));
    } catch (error) {
        yield put(actions.createLeagueError(error));
    }
}

function* joinLeague(action) {
    try {
        yield call(api.joinLeague, { leagueName: action.leagueName });
        const myLeagues = yield call(api.getLeaguesIAmIn);
        yield put(actions.joinLeagueSuccess(myLeagues));
    } catch (error) {
        yield put(actions.joinLeagueError(error));
    }
}

function* leaveLeague(action) {
    try {
        yield call(api.leaveLeague, { leagueId: action.leagueId });
        const myLeagues = yield call(api.getLeaguesIAmIn);
        yield put(actions.leaveLeagueSuccess(myLeagues));
        yield put(push(constants.URL.LEAGUES));
    } catch (error) {
        yield put(actions.leaveLeagueError(error));
    }
}

export default function* leaguesSaga() {
    yield all([
        takeEvery(actions.FETCH_LEAGUES_REQUEST, fetchLeagues),
        takeEvery(actions.FETCH_USERS_IN_LEAGUE_REQUEST, fetchUsersInLeague),
        takeEvery(actions.CREATE_LEAGUE_REQUEST, createLeague),
        takeEvery(actions.JOIN_LEAGUE_REQUEST, joinLeague),
        takeEvery(actions.LEAVE_LEAGUE_REQUEST, leaveLeague)
    ]);
}
