import {
    all, call, takeEvery, put, select
} from 'redux-saga/effects';
import * as actions from './actions';
import * as api from './api';
import * as selectors from './selectors';

function* fetchLeagues() {
    try {
        const alreadyFetched = yield select(selectors.getLeagues);
        if (alreadyFetched && alreadyFetched.length === 0) {
            const myLeagues = yield call(api.getLeaguesIAmIn);
            yield put(actions.fetchLeaguesSuccess(myLeagues));
        }
    } catch (error) {
        yield put(actions.fetchLeaguesError(error));
    }
}

function* fetchUsersInLeague(action) {
    try {
        const usersForThatLeague = yield select(selectors.getUsersInLeagueWithId, action.leagueId);
        if (!usersForThatLeague) {
            const usersInLeague = yield api.getUsersInLeague({ leagueId: action.leagueId });
            yield put(actions.fetchUsersInLeagueSuccess(action.leagueId, usersInLeague));
        }
    } catch (error) {
        yield put(actions.fetchUsersInLeagueError(error));
    }
}

function* createLeague(action) {
    try {
        yield api.createLeague({
            leagueName: action.leagueName,
            startWeek: action.startWeek
        });
    } catch (error) {
        yield put(actions.createLeagueError(error));
    }
}

export default function* leaguesSaga() {
    yield all([
        takeEvery(actions.FETCH_LEAGUES_REQUEST, fetchLeagues),
        takeEvery(actions.FETCH_USERS_IN_LEAGUE_REQUEST, fetchUsersInLeague),
        takeEvery(actions.CREATE_LEAGUE_REQUEST, createLeague)
    ]);
}
