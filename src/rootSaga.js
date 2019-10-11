import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import testingSaga from './testing/saga';
import leagueSaga from './leagues/saga';
import adminSaga from './admin/saga';
import overviewSaga from './overview/saga';
import currentTeamSaga from './currentteam/saga';

export default function* rootSaga() {
    yield all([
        adminSaga(),
        authSaga(),
        currentTeamSaga(),
        leagueSaga(),
        overviewSaga(),
        testingSaga()
    ]);
}
