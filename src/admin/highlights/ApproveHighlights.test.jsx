import { noop } from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { mount, shallow } from '../../enzyme';
import { initialState as highlightsinitialState } from '../../highlights/reducer';
import { initialState } from '../reducer';
import ApproveHighlights, { ApproveHighlightsUnconnected } from './ApproveHighlights';

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
    it('Connected approve highlights', () => {
        const mockStore = configureMockStore([]);
        const mockStoreInitialized = mockStore({
            admin: initialState,
            highlights: highlightsinitialState
        });

        const wrapper = mount(
            <Provider store={mockStoreInitialized}>
                <ApproveHighlights />
            </Provider>
        );

        expect(() => wrapper).not.toThrow();
    });
});
