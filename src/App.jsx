import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import PropTypes from 'prop-types';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import AuthenticatedRoute from './auth/AuthenticatedRoute';
import Test from './test';
import NavbarTwo from './navbar/Navbar';
import Dashboard from './dashboard/Dashboard';

const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <div className="App">
      <NavbarTwo />
      <Switch>
        <AuthenticatedRoute exact path="/" component={Dashboard} />
        <AuthenticatedRoute exact path="/dashboard" component={Dashboard} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <AuthenticatedRoute path="/protected" component={Test} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </div>
  </ConnectedRouter>
);

App.defaultProps = {
  history: {}
};

App.propTypes = {
  history: PropTypes.shape({})
};

export default App;
