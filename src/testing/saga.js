import {
  all, takeEvery, put
} from 'redux-saga/effects';
import firebase from 'firebase';
import * as actions from './actions';
import * as api from '../api/api';

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

function* fetchLeagues() {
  try {
    console.log('fetching leagues');
    const leagues = yield api.getLeagues({ data: 'data' });
    console.log('leagues', leagues);
  } catch (error) {
    yield put(actions.fetchLeaguesError(error));
  }
}

export default function* authSaga() {
  yield all([
    takeEvery(actions.CREATE_LEAGUE, createLeague),
    takeEvery(actions.FETCH_LEAGUES, fetchLeagues)
  ]);
}
