import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import testingSaga from './testing/saga';

export default function* rootSaga() {
    yield all([
        authSaga(),
        testingSaga()
    ]);
}
