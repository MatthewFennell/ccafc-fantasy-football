import React from 'react';
import { shallow, configure } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthenticatedRoute from './AuthenticatedRoute';

configure({ adapter: new Adapter() });
const mockStore = configureMockStore();

const state = {
    firebase: {
        auth: {
            uid: 'test-uid',
            emailVerified: true
        }
    },
    auth: {
        loadedPermissions: true
    }
};

const store = mockStore(() => state);

const dummyComponent = () => (
    <div>Dummy Component</div>
);

describe('AuthenticatedRoute', () => {
    it('The AuthenticatedRoute component renders without crashing', () => {
        expect(() => shallow(
            <Provider store={store}>
                <Router>
                    <AuthenticatedRoute component={dummyComponent} />
                </Router>
            </Provider>
        )).not.toThrow();
    });
});
