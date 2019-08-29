import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import { connectRouter } from 'connected-react-router';
import projectReducer from './projectReducer';
import authReducer from './authReducer';

const rootReducer = history => combineReducers({
  auth: authReducer,
  project: projectReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  router: connectRouter(history)
});

export default rootReducer;


// the key name will be the data property on the state object
