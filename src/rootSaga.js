import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import leagueSaga from './leagues/saga';
import adminSaga from './admin/saga';
import overviewSaga from './overview/saga';
import currentTeamSaga from './currentteam/saga';
import pointsSaga from './points/saga';
import profileSaga from './profile/saga';
import transfersSaga from './transfers/saga';
import statsSaga from './stats/saga';
import chartsSaga from './charts/saga';

export default function* rootSaga() {
    yield all([
        adminSaga(),
        authSaga(),
        currentTeamSaga(),
        leagueSaga(),
        overviewSaga(),
        pointsSaga(),
        profileSaga(),
        transfersSaga(),
        statsSaga(),
        chartsSaga()
    ]);
}
