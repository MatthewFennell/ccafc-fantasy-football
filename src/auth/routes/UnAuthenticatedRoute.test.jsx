import React from 'react';
import { mount, configure } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import UnauthenticatedRoute from './UnauthenticatedRoute';

configure({ adapter: new Adapter() });
const mockStore = configureMockStore();

const state = {
  firebase: {
    auth: {
      uid: 'test-uid',
      emailVerified: true
    }
  }
};

const store = mockStore(() => state);

const dummyComponent = () => (
  <div>Dummy Component</div>
);

describe('UnauthenticatedRoute', () => {
  it('The UnauthenticatedRoute component renders with crashing', () => {
    expect(() => mount(
      <Provider store={store}>
        <Router>
          <UnauthenticatedRoute component={dummyComponent} />
        </Router>
      </Provider>
    )).not.toThrow();
  });
});
