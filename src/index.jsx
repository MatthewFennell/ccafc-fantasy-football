/* eslint-disable no-underscore-dangle */
import * as Sentry from '@sentry/react';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import 'react-notifications-component/dist/theme.css';
import { Provider } from 'react-redux';
import { getFirebase, ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { applyMiddleware, compose, createStore } from 'redux';
import { createFirestoreInstance } from 'redux-firestore';
import createSagaMiddleware from 'redux-saga';
import App from './App';
import { getCorrectYear } from './common';
import { firebaseApp } from './config/fbConfig';
import MyProvider from './Context';
import './index.css';
import Maintenance from './maintenance/Maintenance';
import * as notificationActions from './notifications/actions';
import * as notificationTypes from './notifications/constants';
import createRootReducer from './rootReducer';
import rootSaga from './rootSaga';
import * as serviceWorker from './serviceWorker';

Sentry.init({
    environment: process.env.REACT_APP_PROJECT_ID,
    dsn: process.env.REACT_APP_SENTRY_DSN,
    release: process.env.REACT_APP_VERSION
});

const history = createBrowserHistory();

// react-redux-firebase config
const rrfConfig = {
    userProfile: `fantasy-years/${getCorrectYear()}/users`,
    useFirestoreForProfile: true,
    logErrors: false
};

const sagaMiddleware = createSagaMiddleware();

const isDevelopment = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');

const enhancers = isDevelopment ? compose(
    applyMiddleware(routerMiddleware(history), sagaMiddleware),
    (window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f)
) : compose(
    applyMiddleware(routerMiddleware(history), sagaMiddleware)
);

const store = createStore(createRootReducer(history), enhancers);

const rrfProps = {
    firebase: firebaseApp,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
};

sagaMiddleware.run(rootSaga, getFirebase);

const currentDate = new Date();

const month = currentDate.getMonth();
const dayOfMonth = currentDate.getDate();

// Disable for first 5 days of August
// Roll over will happen on 1st August
// Cloud functions start serving next year on 1st August
const isDownForMaintenance = () => month === 7 && dayOfMonth < 5;

ReactDOM.render(
    <Provider store={store}>
        {isDownForMaintenance() ? (
            <Maintenance />
        ) : (
            <ReactReduxFirebaseProvider {...rrfProps}>
                <MyProvider>
                    <App history={history} />
                </MyProvider>
            </ReactReduxFirebaseProvider>
        )}
    </Provider>,
    document.getElementById('root')
);

serviceWorker.register({
    onUpdate: () => {
        store.dispatch({
            type: notificationActions.ADD_NOTIFICATION,
            notificationType: notificationTypes.NOTIFICATION_TYPE_INFO,
            notification: `There are new updates available. Close all tabs of ${process.env.REACT_APP_COLLEGE_ACRONYM} Fantasy to receive the updates.`,
            duration: 0,
            title: 'Updates Available'
        });
    }
});
