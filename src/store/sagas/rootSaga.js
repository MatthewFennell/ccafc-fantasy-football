import { all } from 'redux-saga/effects';
import projectSaga from './projectSaga';
import authSaga from '../../auth/saga';
import profileSaga from '../../profile/saga';

export default function* rootSaga() {
  yield all([projectSaga(), authSaga(), profileSaga()]);
}
