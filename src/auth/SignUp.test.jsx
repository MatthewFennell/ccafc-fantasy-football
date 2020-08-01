import firebase from 'firebase';
import React from 'react';
import { noop } from 'lodash';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import TextInput from '../common/TextInput/TextInput';
import { shallow } from '../enzyme';
import SignUp, { SignUpUnconnected } from './SignUp';
import * as constants from '../constants';

beforeAll(() => {
    firebase.auth = jest.fn().mockReturnValue({
        currentUser: true
    });
    firebase.auth.GoogleAuthProvider = 'GoogleProvider';
    firebase.auth.FacebookAuthProvider = 'FacebookProvider';
    firebase.auth.TwitterAuthProvider = 'TwitterProvider';
});

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

    it('Sign up mock sign up', () => {
        const mockFn = jest.fn(noop);
        const formEventMocked = { preventDefault: jest.fn() };
        const wrapper = shallow(<SignUpUnconnected
            signUp={mockFn}
            history={{ push: noop }}
            addNotification={noop}
        />);
        expect(wrapper.find(TextInput)).toHaveLength(4);

        wrapper.find('.signUpForm').simulate('submit', formEventMocked);
        expect(mockFn.mock.calls.length).toBe(1);
        expect(mockFn.mock.calls[0][0]).toBe('');
        expect(mockFn.mock.calls[0][1]).toBe('');
        expect(mockFn.mock.calls[0][2]).toBe('');
    });

    it('Sign up redirect to privacy policy', () => {
        const mockFn = jest.fn(noop);
        const wrapper = shallow(<SignUpUnconnected
            signUp={noop}
            history={{ push: mockFn }}
            addNotification={noop}
        />);
        expect(wrapper.find(TextInput)).toHaveLength(4);

        wrapper.find('.privacyPolicy').simulate('click');
        expect(mockFn.mock.calls.length).toBe(1);
        expect(mockFn.mock.calls[0][0]).toBe(constants.URL.PRIVACY_POLICY);
    });
});
