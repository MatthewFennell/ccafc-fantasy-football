import {
    all, takeEvery, call
} from 'redux-saga/effects';
import { store } from 'react-notifications-component';
import * as actions from './actions';
import * as api from './api';
import * as constants from './constants';

let notificationId = 0;

export function* closeNotification(action) {
    yield call(api.removeNotification, ({
        notification: action.notification
    }));
}

export function addNotification(action) {
    store.addNotification({
        ...constants.commonNotificationProps,
        title: 'Success',
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
        takeEvery(actions.CLOSE_NOTIFICATION, closeNotification),
        takeEvery(actions.ADD_NOTIFICATION, addNotification)
    ]);
}
