
import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { noop } from 'lodash';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Charts, { ChartsUnconnected } from './Charts';
import { initState } from './reducer';
import { initialState as overviewInitState } from '../overview/reducer';

configure({ adapter: new Adapter() });

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
