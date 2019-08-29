import { all } from 'redux-saga/effects';
import projectSaga from './projectSaga';
import authSaga from '../../auth/saga';

export default function* rootSaga() {
  yield all([projectSaga(), authSaga()]);
}
