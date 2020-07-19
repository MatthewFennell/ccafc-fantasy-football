import {
    all, takeEvery, put, delay
} from 'redux-saga/effects';
import * as actions from './actions';

export function* setSuccessMessage(action) {
    yield delay(action.delay);
    yield put(actions.closeSuccessMessage());
}

export default function* modalHandlingSaga() {
    yield all([
        takeEvery(actions.SET_SUCCESS_MESSAGE, setSuccessMessage)
    ]);
}
