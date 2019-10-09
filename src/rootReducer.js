import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import { connectRouter } from 'connected-react-router';
import adminReducer from './admin/reducer';
import authReducer from './auth/reducer';
import leagueReducer from './leagues/reducer';
import testingReducer from './testing/reducer';
import * as authActions from './auth/actions';

const appReducer = history => combineReducers({
    admin: adminReducer,
    auth: authReducer,
    leagues: leagueReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    testing: testingReducer,
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
