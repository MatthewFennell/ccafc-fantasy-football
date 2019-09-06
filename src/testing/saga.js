import {
  all, takeEvery, put, select
} from 'redux-saga/effects';
import firebase from 'firebase';
import * as actions from './actions';
import * as api from '../api/api';
import * as selectors from './selectors';

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
    const fetchedLeagues = yield select(selectors.getFetchedLeagues);
    if (!fetchedLeagues) {
      const allLeagues = yield api.getAllLeagues({ data: 'data' });
      const myLeagues = yield api.getLeaguesIAmIn();
      yield put(actions.fetchLeaguesSuccess(allLeagues, myLeagues));
    }
  } catch (error) {
    console.log('error', error);
    yield put(actions.fetchLeaguesError(error));
  }
}

function* joinLeague(action) {
  try {
    console.log('Trying to join league ', action.leagueId);
    yield api.joinLeague({ leagueId: action.leagueId });
    const myNewLeagues = yield api.getLeaguesIAmIn();
    yield put(actions.joinLeagueSuccess(myNewLeagues));
  } catch (error) {
    console.log('error', error);
    yield put(actions.joinLeagueError(error));
  }
}

function* increaseScore(action) {
  try {
    console.log('trying to add points', action);
    yield api.addPointsInLeagueToUser({ leagueId: action.leagueId, score: action.score });
  } catch (error) {
    console.log('error', error);
    yield put(actions.increaseScoreError(error));
  }
}

export default function* authSaga() {
  yield all([
    takeEvery(actions.CREATE_LEAGUE, createLeague),
    takeEvery(actions.FETCH_LEAGUES, fetchLeagues),
    takeEvery(actions.JOIN_LEAGUE, joinLeague),
    takeEvery(actions.INCREASE_SCORE, increaseScore)
  ]);
}
