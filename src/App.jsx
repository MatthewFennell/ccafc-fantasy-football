import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import AuthenticatedRoute from './auth/routes/AuthenticatedRoute';
import UnauthenticatedRoute from './auth/routes/UnauthenticatedRoute';
import Navbar from './navbar/Navbar';
import Dashboard from './dashboard/Dashboard';
import Profile from './profile/Profile';
import Testing from './testing/Testing';

const App = props => (

  props.auth && props.auth.isLoaded ? (
    <ConnectedRouter history={props.history}>
      <div className="App">
        <Navbar />
        <Switch>
          <AuthenticatedRoute exact path="/" component={Dashboard} />
          <AuthenticatedRoute exact path="/dashboard" component={Dashboard} />
          <AuthenticatedRoute exact path="/profile" component={Profile} />
          <AuthenticatedRoute exact path="/testing" component={Testing} />
          <UnauthenticatedRoute path="/signin" component={SignIn} redirect="/dashboard" />
          <UnauthenticatedRoute path="/signup" component={SignUp} redirect="/dashboard" />
          <Route path="/needToVerifyEmail" component={() => <div>You need to verify your email address</div>} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </div>
    </ConnectedRouter>
  ) : null

);

App.defaultProps = {
  auth: {
    isLoaded: false
  },
  history: {}
};

App.propTypes = {
  auth: PropTypes.shape({
    isLoaded: PropTypes.bool
  }),
  history: PropTypes.shape({})
};

const mapStateToProps = state => (
  {
    auth: state.firebase.auth
  }
);

export default connect(mapStateToProps)(App);
