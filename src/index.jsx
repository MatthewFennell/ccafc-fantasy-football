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

const getCorrectYearTest = () => {
    const dateToSet = new Date();

    dateToSet.setMonth(8); // August
    dateToSet.setDate(1); // 1st August
    dateToSet.setHours(20);

    const newDate = new Date();

    if (newDate > dateToSet) {
        return true;
    }
    return false;
};

// MUST BE SYNCED WITH CLOUD FUNCTION
const getCorrectYear = () => {
    const currentDate = new Date();
    if (currentDate.getDate() === 4) {
        console.log('getting 2021');
        return '2021';
    }

    if (currentDate.getDate() === 5) {
        console.log('getting 2022');
        return '2022';
    }

    const dateToSet = new Date();

    dateToSet.setMonth(8); // August
    dateToSet.setDate(4); // 1st August
    dateToSet.setHours(20);

    const newDate = new Date();

    if (newDate > dateToSet) {
        return String(newDate.getFullYear());
    }
    return String(newDate.getFullYear() - 1);

    // const currentDate = new Date();

    // const month = currentDate.getMonth();
    // const year = currentDate.getFullYear();
    // // 07 = August -> Once we reach August, start serving the next year
    // // This means that at the beginning of August, we must convert over the previous year

    // // If we are January 2022, then the season started in 2021, so we return 2021

    // if (month >= 7) {
    //     return String(year);
    // }
    // return String(year - 1);
};

console.log('a', getCorrectYear());

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

const isDownForMaintenance = () => month === 9 && dayOfMonth < 5;

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
