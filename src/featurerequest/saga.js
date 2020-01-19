import {
    all, takeEvery, put, call
} from 'redux-saga/effects';
import * as actions from './actions';
import * as api from './api';

function* submitFeature(action) {
    try {
        yield call(api.submitFeature, { description: action.description });
    } catch (error) {
        yield put(actions.submitFeatureError(error));
    }
}

export default function* featureRequestSaga() {
    yield all([
        takeEvery(actions.SUBMIT_FEATURE_REQUEST, submitFeature)
    ]);
}
