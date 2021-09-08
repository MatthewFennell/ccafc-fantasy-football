import { noop } from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { mount, shallow } from '../enzyme';
import Highlights, { HighlightsUnconnected } from './Highlights';
import { initialState } from './reducer';

const mockfirebaseStore = {
    auth: {
        email: 'email',
        uid: 'uid'
    }
};

describe('Highlights', () => {
    it('The Highlights component renders without crashing', () => {
        const wrapper = shallow(<HighlightsUnconnected
            fetchHighlightsRequest={noop}
            closeSuccessMessage={noop}
            closeHighlightError={noop}
            deleteCommentRequest={noop}
            addReplyToVideoRequest={noop}
            deleteReplyRequest={noop}
            setErrorMessage={noop}
            submitHighlightRequest={noop}
            downvoteHighlightRequest={noop}
            fetchRejectedHighlightsRequest={noop}
            fetchUserHighlightsToBeApproved={noop}
            addCommentToVideoRequest={noop}
            setHighlightError={noop}
            upvoteHighlightRequest={noop}
        />);
        expect(() => wrapper).not.toThrow();
    });
});

describe('Highlights connected', () => {
    it('Connected Highlights', () => {
        const mockStore = configureMockStore([]);
        const mockStoreInitialized = mockStore({
            firebase: mockfirebaseStore,
            highlights: initialState
        });

        const wrapper = mount(
            <Provider store={mockStoreInitialized}>
                <Router>
                    <Highlights setErrorMessage={noop} />
                </Router>
            </Provider>
        );

        expect(() => wrapper).not.toThrow();
    });
});
