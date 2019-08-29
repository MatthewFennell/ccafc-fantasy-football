import { all } from 'redux-saga/effects';
import projectSaga from './projectSaga';

export default function* rootSaga() {
  yield all([projectSaga()]);
}
