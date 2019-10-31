import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import { connectRouter } from 'connected-react-router';
import adminReducer from './admin/reducer';
import authReducer from './auth/reducer';
import leagueReducer from './leagues/reducer';
import overviewReducer from './overview/reducer';
import currentTeamReducer from './currentteam/reducer';
import pointsReducer from './points/reducer';
import * as authActions from './auth/actions';
import profileReducer from './profile/reducer';
import transfersReducer from './transfers/reducer';

const appReducer = history => combineReducers({
    admin: adminReducer,
    auth: authReducer,
    currentTeam: currentTeamReducer,
    leagues: leagueReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    overview: overviewReducer,
    points: pointsReducer,
    profile: profileReducer,
    transfers: transfersReducer,
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
