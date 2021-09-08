import { noop } from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { mount, shallow } from '../enzyme';
import { initialState } from './reducer';
import VerifyEmail, { VerifyEmailUnconnected } from './VerifyEmail';

const mockfirebaseStore = {
    auth: {
        email: 'email',
        uid: 'uid'
    }
};

describe('Reset Password', () => {
    it('The Reset Password component renders without crashing', () => {
        const wrapper = shallow(<VerifyEmailUnconnected
            closeSuccessMessage={noop}
            closeAdminError={noop}
            closeEmailVerificationError={noop}
            resendEmailVerificationRequest={noop}
        />);
        expect(() => wrapper).not.toThrow();
    });
});

describe('Verify Email connected', () => {
    it('Connected verify email', () => {
        const mockStore = configureMockStore([]);
        const mockStoreInitialized = mockStore({
            auth: initialState,
            firebase: mockfirebaseStore
        });

        const wrapper = mount(
            <Provider store={mockStoreInitialized}>
                <VerifyEmail />
            </Provider>
        );

        expect(() => wrapper).not.toThrow();
    });
});
