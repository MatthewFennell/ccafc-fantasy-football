
import React from 'react';
import { noop } from 'lodash';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { shallow, mount } from '../enzyme';
import Charts, { ChartsUnconnected } from './Charts';
import { initState } from './reducer';
import { initialState as overviewInitState } from '../overview/reducer';

describe('Charts', () => {
    it('The Charts component renders without crashing', () => {
        const wrapper = shallow(<ChartsUnconnected
            fetchAllTeamsRequest={noop}
        />);
        expect(() => wrapper).not.toThrow();
    });
});


describe('Charts connected', () => {
    const mockStore = configureMockStore([]);
    const mockStoreInitialized = mockStore({
        charts: initState,
        overview: overviewInitState
    });

    const wrapper = mount( // enzyme
        <Provider store={mockStoreInitialized}>
            <Charts />
        </Provider>
    );

    expect(() => wrapper).not.toThrow();
});
