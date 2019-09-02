import {
  all, takeEvery, put
} from 'redux-saga/effects';
import firebase from 'firebase';
import * as actions from './actions';


function* createLeague(action) {
  try {
    console.log('action', action);
    console.log('user id', firebase.auth().currentUser.uid);
    const result = yield firebase
      .app()
      .functions('europe-west2')
      .httpsCallable('league-createLeague')({
        leagueName: action.leagueName
      });
    console.log('result', result);
  } catch (error) {
    yield put(actions.createLeagueError(error));
  }
}

export default function* authSaga() {
  yield all([
    takeEvery(actions.CREATE_LEAGUE, createLeague)
  ]);
}
