import firebase from 'firebase';
import React from 'react';
import { noop } from 'lodash';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow } from '../enzyme';
import TextInput from '../common/TextInput/TextInput';
import * as constants from '../constants';
import SignIn, { SignInUnconnected } from './SignIn';

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
        signInError: '',
        signInErrorCode: ''
    }
};

const store = mockStore(() => state);

describe('Sign In', () => {
    it('The Sign In component renders without crashing', () => {
        expect(() => shallow(
            <Provider store={store}>
                <Router>
                    <SignIn />
                </Router>
            </Provider>
        )).not.toThrow();
    });

    it('Sign in mock sign in', () => {
        const mockFn = jest.fn(noop);
        const formEventMocked = { preventDefault: jest.fn() };
        const wrapper = shallow(<SignInUnconnected signIn={mockFn} history={{ push: noop }} />);
        expect(wrapper.find(TextInput)).toHaveLength(2);

        wrapper.find('.signInForm').simulate('submit', formEventMocked);
        expect(mockFn.mock.calls.length).toBe(1);
        expect(mockFn.mock.calls[0][0]).toBe('');
        expect(mockFn.mock.calls[0][1]).toBe('');
    });

    it('Sign in redirect to password reset', () => {
        const mockFn = jest.fn(noop);
        const wrapper = shallow(<SignInUnconnected history={{ push: mockFn }} signIn={noop} />);

        wrapper.find('.forgotPasswordLink').simulate('click');
        expect(mockFn.mock.calls.length).toBe(1);
        expect(mockFn.mock.calls[0][0]).toBe(constants.URL.RESET_PASSWORD);
    });
});
