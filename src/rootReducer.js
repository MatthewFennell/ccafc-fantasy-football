import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import { connectRouter } from 'connected-react-router';
import admin from './admin/reducer';
import auth from './auth/reducer';
import league from './leagues/reducer';
import overview from './overview/reducer';
import currentTeam from './currentteam/reducer';
import points from './points/reducer';
import * as authActions from './auth/actions';
import profile from './profile/reducer';
import transfers from './transfers/reducer';
import stats from './stats/reducer';
import charts from './charts/reducer';
import highlights from './highlights/reducer';
import fixtures from './fixtures/reducer';
import features from './featurerequest/reducer';
import cup from './cup/reducer';

const appReducer = history => combineReducers({
    admin,
    auth,
    charts,
    currentTeam,
    cup,
    leagues: league,
    features,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    fixtures,
    highlights,
    overview,
    points,
    profile,
    transfers,
    stats,
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
