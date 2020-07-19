import { expectSaga } from 'redux-saga-test-plan';
import * as sagas from './saga';
import * as actions from './actions';
import { successDelay } from '../constants';

describe('Modal Handling saga', () => {
    // Deals with yield delay(x)
    const provideDelay = ({ fn }, next) => ((fn.name === 'delayP') ? null : next());

    it('set success message with no delay set', () => {
        const action = actions.setSuccessMessage('message');
        return expectSaga(sagas.setSuccessMessage, action)
            .provide({ call: provideDelay })
            .delay(successDelay)
            .put(actions.closeSuccessMessage())
            .run({ silenceTimeout: true });
    });

    it('set success message with custom delay', () => {
        const action = actions.setSuccessMessage('message, 4000');
        return expectSaga(sagas.setSuccessMessage, action)
            .provide({ call: provideDelay })
            .delay(4000)
            .put(actions.closeSuccessMessage())
            .run({ silenceTimeout: true });
    });
});
