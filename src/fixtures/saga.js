import {
    all, takeEvery, put, call, takeLatest, select
} from 'redux-saga/effects';
import * as actions from './actions';
import * as fixturesApi from './api';
import * as selectors from './selectors';
import { setErrorMessage } from '../modalHandling/actions';
import { addNotification } from '../notifications/actions';

export function* fetchFixtures(api) {
    try {
        const currentFixtures = yield select(selectors.getFixtures);
        if (currentFixtures && currentFixtures.length === 0) {
            const fixtures = yield call(api.getFixtures);
            yield put(actions.fetchFixturesSuccess(fixtures));
        }
    } catch (error) {
        yield put(setErrorMessage('Error Fetching Fixtures', error));
    } finally {
        yield put(actions.cancelFetchingFixturesAndTeam());
    }
}

export function* setMyTeam(api, action) {
    try {
        yield call(api.setMyTeam, { team: action.team });
        yield put(actions.setMyTeam(action.team));
    } catch (error) {
        yield put(setErrorMessage('Error Setting Team', error));
    } finally {
        yield put(actions.cancelLoadingMyTeam());
        yield put(addNotification('Team successfully set'));
    }
}

export function* fetchMyTeam(api) {
    try {
        const myTeam = yield call(api.fetchMyTeam);
        yield put(actions.setMyTeam(myTeam));
    } catch (error) {
        yield put(setErrorMessage('Error Fetching Team', error));
    } finally {
        yield put(actions.cancelLoadingMyTeam());
    }
}

export default function* fixturesSaga() {
    yield all([
        takeEvery(actions.FETCH_FIXTURES_REQUEST, fetchFixtures, fixturesApi),
        takeLatest(actions.SET_MY_TEAM_REQUEST, setMyTeam, fixturesApi),
        takeEvery(actions.FETCH_MY_TEAM_REQUEST, fetchMyTeam, fixturesApi)
    ]);
}
