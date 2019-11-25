import {
    all, takeEvery, put, select, call
} from 'redux-saga/effects';
import * as actions from './actions';
import * as selectors from './selectors';
import * as api from './api';

function* submitHighlight(action) {
    try {
        console.log('action', action);
        yield call(api.submitVideo, { videoId: action.videoId });
    } catch (error) {
        yield put(actions.submitHighlightError(error));
    }
}

export default function* overviewSaga() {
    yield all([
        takeEvery(actions.SUBMIT_HIGHLIGHT_REQUEST, submitHighlight)
    ]);
}
