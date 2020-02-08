
import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { noop } from 'lodash';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import PasswordReset, { PasswordResetUnconnected } from './PasswordReset';
import { initState } from './reducer';

configure({ adapter: new Adapter() });

describe('Reset Password', () => {
    it('The Reset Password component renders without crashing', () => {
        const wrapper = shallow(<PasswordResetUnconnected
            closeSuccessMessage={noop}
            closeAdminError={noop}
            sendPasswordResetEmail={noop}
            closeAuthError={noop}
        />);
        expect(() => wrapper).not.toThrow();
    });
});


describe('Password Reset connected', () => {
    const mockStore = configureMockStore([]);
    const mockStoreInitialized = mockStore({
        auth: initState
    });

    const wrapper = mount( // enzyme
        <Provider store={mockStoreInitialized}>
            <PasswordReset />
        </Provider>
    );

    expect(() => wrapper).not.toThrow();
});
