import {
  all, takeEvery, put
} from 'redux-saga/effects';
import firebase from 'firebase';
import * as actions from './actions';


function* createLeague(action) {
  try {
    console.log('action', action);
  } catch (error) {
    yield put(actions.createLeagueError(error));
  }
}

export default function* authSaga() {
  yield all([
    takeEvery(actions.CREATE_LEAGUE, createLeague)
  ]);
}
