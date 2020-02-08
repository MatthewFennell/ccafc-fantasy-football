
import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { noop } from 'lodash';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import VerifyEmail, { VerifyEmailUnconnected } from './VerifyEmail';
import { initState } from './reducer';

const mockfirebaseStore = {
    auth: {
        email: 'email',
        uid: 'uid'
    }
};

configure({ adapter: new Adapter() });

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
    const mockStore = configureMockStore([]);
    const mockStoreInitialized = mockStore({
        auth: initState,
        firebase: mockfirebaseStore
    });

    const wrapper = mount( // enzyme
        <Provider store={mockStoreInitialized}>
            <VerifyEmail />
        </Provider>
    );

    expect(() => wrapper).not.toThrow();
});
