import { connectRouter } from 'connected-react-router';
import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import admin from './admin/reducer';
import * as authActions from './auth/actions';
import auth from './auth/reducer';
import charts from './charts/reducer';
import cup from './cup/reducer';
import currentTeam from './currentteam/reducer';
import features from './featurerequest/reducer';
import fixtures from './fixtures/reducer';
import highlights from './highlights/reducer';
import leagues from './leagues/reducer';
import modalHandling from './modalHandling/reducer';
import overview from './overview/reducer';
import points from './points/reducer';
import profile from './profile/reducer';
import stats from './stats/reducer';
import transfers from './transfers/reducer';
import previousYear from './previousyears/reducer';

const appReducer = history => combineReducers({
    admin,
    auth,
    charts,
    currentTeam,
    cup,
    leagues,
    features,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    fixtures,
    highlights,
    modalHandling,
    overview,
    points,
    profile,
    transfers,
    stats,
    previousYear,
    router: connectRouter(history)
});

const rootReducer = history => (state, action) => {
    if (action.type === authActions.SIGN_OUT_SUCCESS) {
        // eslint-disable-next-line no-param-reassign
        state = undefined;
    }
    return appReducer(history)(state, action);
};

export default rootReducer;
