
import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { noop } from 'lodash';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import TriggerWeek, { TriggerWeekUnconnected } from './TriggerWeek';
import { initState } from '../reducer';
import { initialState as overviewInitState } from '../../overview/reducer';

configure({ adapter: new Adapter() });

describe('Trigger Week', () => {
    it('The Trigger Week component renders without crashing', () => {
        const wrapper = shallow(<TriggerWeekUnconnected
            closeSuccessMessage={noop}
            closeAdminError={noop}
            triggerWeekRequest={noop}
        />);
        expect(() => wrapper).not.toThrow();
    });
});

describe('Trigger Week connected', () => {
    const mockStore = configureMockStore([]);
    const mockStoreInitialized = mockStore({
        admin: initState,
        overview: overviewInitState
    });

    const wrapper = mount( // enzyme
        <Provider store={mockStoreInitialized}>
            <TriggerWeek />
        </Provider>
    );

    expect(() => wrapper).not.toThrow();
});
