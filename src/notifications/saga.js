import {
    all, takeEvery, call, put
} from 'redux-saga/effects';
import { store } from 'react-notifications-component';
import * as actions from './actions';
import * as notificationsApi from './api';
import * as constants from './constants';
import { setErrorMessage } from '../modalHandling/actions';

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
        takeEvery(actions.CLOSE_NOTIFICATION, closeNotification, notificationsApi),
        takeEvery(actions.ADD_NOTIFICATION, addNotification)
    ]);
}
