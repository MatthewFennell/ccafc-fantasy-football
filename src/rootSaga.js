import { all } from 'redux-saga/effects';
import adminSaga from './admin/saga';
import authSaga from './auth/saga';
import chartsSaga from './charts/saga';
import cupSaga from './cup/saga';
import currentTeamSaga from './currentteam/saga';
import featuresRequestSaga from './featurerequest/saga';
import fixturesSaga from './fixtures/saga';
import highlightSaga from './highlights/saga';
import leagueSaga from './leagues/saga';
import notificationSaga from './notifications/saga';
import overviewSaga from './overview/saga';
import pointsSaga from './points/saga';
import previousyears from './previousyears/saga';
import profileSaga from './profile/saga';
import statsSaga from './stats/saga';
import transfersSaga from './transfers/saga';

export default function* rootSaga() {
    yield all([
        adminSaga(),
        authSaga(),
        chartsSaga(),
        currentTeamSaga(),
        cupSaga(),
        featuresRequestSaga(),
        fixturesSaga(),
        highlightSaga(),
        leagueSaga(),
        notificationSaga(),
        overviewSaga(),
        pointsSaga(),
        previousyears(),
        profileSaga(),
        transfersSaga(),
        statsSaga()
    ]);
}
