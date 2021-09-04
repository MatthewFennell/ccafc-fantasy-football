import { store } from 'react-notifications-component';
import {
    all, call, put, takeEvery
} from 'redux-saga/effects';
import { setErrorMessage } from '../modalHandling/actions';
import * as actions from './actions';
import * as notificationsApi from './api';
import * as constants from './constants';

let notificationId = 0;

export function* closeNotification(api, action) {
    try {
        yield call(api.removeNotification, ({
            notification: action.notification
        }));
    } catch (error) {
        yield put(setErrorMessage('Error Closing Notification', error));
    }
}

export function addNotification(action) {
    store.addNotification({
        ...constants.commonNotificationProps,
        title: action.title,
        message: action.notification,
        type: action.notificationType,
        id: `${action.notification}-${notificationId}`,
        dismiss: {
            showIcon: true,
            duration: action.duration,
            onScreen: true
        }
    });
    notificationId += 1;
}

export default function* notificationsSaga() {
    yield all([
        takeEvery(actions.CLOSE_NOTIFICATION, closeNotification, notificationsApi),
        takeEvery(actions.ADD_NOTIFICATION, addNotification)
    ]);
}
