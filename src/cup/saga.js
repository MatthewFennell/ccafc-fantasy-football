/* eslint-disable max-len */
import {
    all, call, put, select, takeEvery
} from 'redux-saga/effects';
import { setErrorMessage } from '../modalHandling/actions';
import * as actions from './actions';
import * as cupApi from './api';
import * as selectors from './selectors';

export function* fetchCup(api) {
    try {
        const hasFetchedCup = yield select(selectors.getHasFetchedCup);
        if (!hasFetchedCup) {
            const cup = yield call(api.fetchCup);
            yield put(actions.fetchCupSuccess(cup?.cupOne || {}, cup?.cupTwo || {}, cup?.cupThree || {}));
        }
    } catch (error) {
        yield put(setErrorMessage('Error Fetching Cup Info', error));
    } finally {
        yield put(actions.setIsFetchingCup(false));
    }
}

export function* setRenewCup(api, action) {
    try {
        const cup = yield call(api.updateAutoRenew, {
            cupId: action.cupId,
            isAutoRenew: action.isAutoRenew
        });
        yield put(actions.fetchCupSuccess(cup?.cupOne || {}, cup?.cupTwo || {}, cup?.cupThree || {}));
    } catch (error) {
        yield put(setErrorMessage('Error Updating auto renew cup', error));
    } finally {
        yield put(actions.hasUpdatedCup());
    }
}

export default function* cupSaga() {
    yield all([
        takeEvery(actions.FETCH_CUP_REQUEST, fetchCup, cupApi),
        takeEvery(actions.SET_AUTO_RENEW_CUP, setRenewCup, cupApi)
    ]);
}
