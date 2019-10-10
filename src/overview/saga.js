import {
    all, takeEvery, put, select, call
} from 'redux-saga/effects';
import * as actions from './actions';
import * as selectors from './selectors';
import * as api from './api';

function* getUserInfo() {
    try {
        const alreadyFetched = yield select(selectors.getFetchedUserInfo);
        if (!alreadyFetched) {
            const result = yield call(api.getUserInfo);
            yield put(actions.fetchUserInfoSuccess(result));
        } else {
            yield put(actions.alreadyFetchedUserInfo());
        }
    } catch (error) {
        yield put(actions.fetchUserInfoError(error));
    }
}


export default function* overviewSaga() {
    yield all([
        takeEvery(actions.FETCH_USER_INFO_REQUEST, getUserInfo)
    ]);
}
