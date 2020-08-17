import React from 'react';
import { noop } from 'lodash';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { shallow, mount } from '../../enzyme';
import TriggerWeek, { TriggerWeekUnconnected } from './TriggerWeek';
import { initialState } from '../reducer';
import { initialState as overviewinitialState } from '../../overview/reducer';
import StyledButton from '../../common/StyledButton/StyledButton';

describe('Trigger Week', () => {
    it('The Trigger Week component renders without crashing', () => {
        const wrapper = shallow(<TriggerWeekUnconnected
            closeSuccessMessage={noop}
            closeAdminError={noop}
            triggerWeekRequest={noop}
            recalculateLeaguePositionsRequest={noop}
            maxGameWeek={5}
        />);
        expect(() => wrapper).not.toThrow();
    });
});

describe('Trigger Week connected', () => {
    it('Connected trigger week', () => {
        const mockStore = configureMockStore([]);
        const mockStoreInitialized = mockStore({
            admin: initialState,
            overview: overviewinitialState
        });

        const wrapper = mount(
            <Provider store={mockStoreInitialized}>
                <TriggerWeek />
            </Provider>
        );

        expect(() => wrapper).not.toThrow();
    });

    it('Clicks recalculate week', () => {
        const mockFn = jest.fn(noop);
        const wrapper = mount(<TriggerWeekUnconnected
            recalculateLeaguePositionsRequest={mockFn}
            triggerWeekRequest={noop}
        />);

        wrapper.find('.recalculateLeaguePositions').find(StyledButton).simulate('click');
        expect(mockFn.mock.calls.length).toBe(1);
    });
});
