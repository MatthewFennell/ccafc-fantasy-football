import { noop } from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import ErrorModal from '../common/modal/ErrorModal';
import { mount, shallow } from '../enzyme';
import ModalHandling, { ModalHandlingUnconnected } from './ModalHandling';

describe('Modal Handling', () => {
    it('The Leagues component renders without crashing', () => {
        const wrapper = shallow(<ModalHandlingUnconnected closeErrorMessage={noop} />);
        expect(() => wrapper).not.toThrow();
    });
});

describe('Modal Handling connected', () => {
    it('Connected Modal Handling', () => {
        const mockStore = configureMockStore([]);
        const mockStoreInitialized = mockStore({
            modalHandling: {
                errorCode: 'code',
                errorHeader: 'header',
                errorMessage: 'message'
            }
        });

        const wrapper = mount(
            <Provider store={mockStoreInitialized}>
                <Router>
                    <ModalHandling closeErrorMessage={noop} />
                </Router>
            </Provider>
        );

        expect(() => wrapper).not.toThrow();
        expect(wrapper.find(ErrorModal)).toHaveLength(1);
        expect(wrapper.find('.headerWrapper').text()).toBe('header');
        expect(wrapper.find('.modalWrapper').childAt(0).text()).toBe('Code: code');
        expect(wrapper.find('.modalWrapper').childAt(1).text()).toBe('Message: message');
    });
});
