import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore } from 'redux-firestore';
import { createBrowserHistory } from 'history';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import { firebaseApp } from './config/fbConfig';
import createRootReducer from './store/reducers/rootReducer';
import rootSaga from './store/sagas/rootSaga';
import App from './App';

const history = createBrowserHistory();

const reduxFirebase = {
  userProfile: 'users',
  enableLogging: 'false',
  logErrors: false
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  attachAuthIsReady: true,
  logErrors: false
};

const sagaMiddleware = createSagaMiddleware();

const enhancers = compose(
  reactReduxFirebase(firebaseApp, rrfConfig, reduxFirebase),
  reduxFirestore(firebaseApp),
  applyMiddleware(routerMiddleware(history), sagaMiddleware),
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f
);

const store = createStore(createRootReducer(history), enhancers);

sagaMiddleware.run(rootSaga, getFirebase);

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App history={history} />
    </Provider>,
    document.getElementById('root')
  );
});
