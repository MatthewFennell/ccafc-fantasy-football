import {
    all, takeEvery, put, call
} from 'redux-saga/effects';
import * as actions from './actions';
import * as api from './api';


function* fetchFixtures() {
    try {
        const fixtures = yield call(api.scrapeData);
        yield put(actions.fetchFixturesSuccess(fixtures));
    } catch (error) {
        yield put(actions.fetchFixturesError(error));
    }
}

export default function* fixturesSaga() {
    yield all([
        takeEvery(actions.FETCH_FIXTURES_REQUEST, fetchFixtures)
    ]);
}
