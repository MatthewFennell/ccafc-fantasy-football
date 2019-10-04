import {
    all, call, takeEvery, put
} from 'redux-saga/effects';
import * as actions from './actions';
import * as api from './api';

function* fetchLeagues() {
    try {
        const myLeagues = yield call(api.getLeaguesIAmIn);
        yield put(actions.fetchLeaguesSuccess(myLeagues));
        console.log('my leagues', myLeagues);
    } catch (error) {
        yield put(actions.fetchLeaguesError(error));
    }
}

export default function* leaguesSaga() {
    yield all([
        takeEvery(actions.FETCH_LEAGUES_REQUEST, fetchLeagues)
    ]);
}
