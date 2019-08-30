import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import PropTypes from 'prop-types';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import AuthenticatedRoute from './auth/routes/AuthenticatedRoute';
import UnauthenticatedRoute from './auth/routes/UnauthenticatedRoute';
import Navbar from './navbar/Navbar';
import Dashboard from './dashboard/Dashboard';
import Profile from './profile/Profile';

const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <div className="App">
      <Navbar />
      <Switch>
        <AuthenticatedRoute exact path="/" component={Dashboard} />
        <AuthenticatedRoute exact path="/dashboard" component={Dashboard} />
        <AuthenticatedRoute exact path="/profile" component={Profile} />
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
