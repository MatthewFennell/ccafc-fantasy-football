import { noop } from 'lodash';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { setErrorMessage } from '../modalHandling/actions';
import * as actions from './actions';
import * as sagas from './saga';

// https://github.com/jfairbank/redux-saga-test-plan - Docs

const api = {
    removeNotification: noop
};

describe('Close Notification', () => {
    it('close notification success', () => {
        const action = actions.closeNotification('notification');
        return expectSaga(sagas.closeNotification, api, action)
            .call(api.removeNotification, ({
                notification: 'notification'
            }))
            .run({ silenceTimeout: true });
    });

    it('close notification error', () => {
        const error = new Error('error');
        const action = actions.closeNotification('notification');
        return expectSaga(sagas.closeNotification, api, action)
            .provide([
                [matchers.call.fn(api.removeNotification), throwError(error)]
            ])
            .put(setErrorMessage('Error Closing Notification', error))
            .run({ silenceTimeout: true });
    });
});
