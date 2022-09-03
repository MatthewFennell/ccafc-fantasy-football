import {
    all, call, put, select, takeEvery
} from 'redux-saga/effects';
import { setErrorMessage } from '../modalHandling/actions';
import * as actions from './actions';
import * as selectors from './selectors';
import * as previousYearsApi from './api';

export function* fetchAvailableYears(api) {
    try {
        // const previousYears = yield call(api.fetchPreviousYearsAvailable);

        yield put(actions.setFetchingHistory(true));
        const currentYear = new Date().getFullYear();
        const history = yield call(api.fetchHistoryForYear,
            {
                year: String(currentYear)
            });
        yield put(actions.setHistoryForYear(currentYear, history));
    } catch (error) {
        yield put(setErrorMessage('Error Fetching Previous History', error));
    } finally {
        yield put(actions.setFetchingHistory(false));
    }
}

export function* fetchHistoryForYear(api, action) {
    try {
        const fetchedHistory = yield select(selectors.getHistoryForYear, action.year);
        if (!fetchedHistory) {
            yield put(actions.setFetchingHistory(true));
            const history = yield call(api.fetchHistoryForYear,
                {
                    year: action.year
                });
            yield put(actions.setHistoryForYear(action.year, history));
        }
    } catch (error) {
        yield put(setErrorMessage('Error Fetching History for season', error));
    } finally {
        yield put(actions.setFetchingHistory(false));
    }
}

export default function* previousYearsSaga() {
    yield all([
        takeEvery(actions.FETCH_PREVIOUS_YEARS_AVAILABLE, fetchAvailableYears, previousYearsApi),
        takeEvery(actions.FETCH_HISTORY_FOR_YEAR, fetchHistoryForYear, previousYearsApi)
    ]);
}
