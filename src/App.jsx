import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import PropTypes from 'prop-types';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import AuthenticatedRoute from './auth/AuthenticatedRoute';
import UnauthenticatedRoute from './auth/UnauthenticatedRoute';
import Test from './test';
import Navbar from './navbar/Navbar';
import Dashboard from './dashboard/Dashboard';

const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <div className="App">
      <Navbar />
      <Switch>
        <AuthenticatedRoute exact path="/" component={Dashboard} />
        <AuthenticatedRoute exact path="/dashboard" component={Dashboard} />
        <AuthenticatedRoute path="/protected" component={Test} />
        <UnauthenticatedRoute path="/signin" component={SignIn} redirect="/dashboard" />
        <UnauthenticatedRoute path="/signup" component={SignUp} redirect="/dashboard" />
        <Route path="/needToVerifyEmail" component={() => <div>You need to verify your email address</div>} />
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
