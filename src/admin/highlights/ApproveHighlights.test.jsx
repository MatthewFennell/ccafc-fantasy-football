
import React from 'react';
import { noop } from 'lodash';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { shallow, mount } from '../../enzyme';
import ApproveHighlights, { ApproveHighlightsUnconnected } from './ApproveHighlights';
import { initState } from '../reducer';
import { initialState as highlightsInitState } from '../../highlights/reducer';

describe('Approve Highlights', () => {
    it('The Approve Highlights component renders without crashing', () => {
        const wrapper = shallow(<ApproveHighlightsUnconnected
            closeSuccessMessage={noop}
            closeAdminError={noop}
            rejectHighlightRequest={noop}
            reapproveRejectedHighlightRequest={noop}
            approveHighlightRequest={noop}
            deleteHighlightRequest={noop}
            fetchAllRejectedHighlightsRequest={noop}
            fetchHighlightsRequest={noop}
            fetchHighlightsForApprovalRequest={noop}
        />);
        expect(() => wrapper).not.toThrow();
    });
});

describe('Approve Highlights connected', () => {
    const mockStore = configureMockStore([]);
    const mockStoreInitialized = mockStore({
        admin: initState,
        highlights: highlightsInitState
    });

    const wrapper = mount( // enzyme
        <Provider store={mockStoreInitialized}>
            <ApproveHighlights />
        </Provider>
    );

    expect(() => wrapper).not.toThrow();
});
