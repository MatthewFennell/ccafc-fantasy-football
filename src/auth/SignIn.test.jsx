import React from 'react';
import { mount, configure } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import firebase from 'firebase';
import Adapter from 'enzyme-adapter-react-16';
import SignIn from './SignIn';

configure({ adapter: new Adapter() });
const mockStore = configureMockStore();
const store = mockStore({});

beforeAll(() => {
    firebase.auth = jest.fn().mockReturnValue({
        currentUser: true
    });
    firebase.auth.GoogleAuthProvider = 'GoogleProvider';
    firebase.auth.FacebookAuthProvider = 'FacebookProvider';
    firebase.auth.TwitterAuthProvider = 'TwitterProvider';
});

describe('SignIn', () => {
    it('The SignIn component renders with crashing', () => {
        expect(() => mount(
            <Provider store={store}>
                <SignIn />
            </Provider>
        )).not.toThrow();
    });
});
