
import firebase from 'firebase';
import React from 'react';
import { shallow, configure } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import SignUp from './SignUp';

beforeAll(() => {
    firebase.auth = jest.fn().mockReturnValue({
        currentUser: true
    });
    firebase.auth.GoogleAuthProvider = 'GoogleProvider';
    firebase.auth.FacebookAuthProvider = 'FacebookProvider';
    firebase.auth.TwitterAuthProvider = 'TwitterProvider';
});

configure({ adapter: new Adapter() });
const mockStore = configureMockStore();

const state = {
    auth: {
        signUpError: '',
        signUpErrorCode: ''
    }
};

const store = mockStore(() => state);

describe('Sign In', () => {
    it('The Sign In component renders without crashing', () => {
        expect(() => shallow(
            <Provider store={store}>
                <Router>
                    <SignUp />
                </Router>
            </Provider>
        )).not.toThrow();
    });
});
