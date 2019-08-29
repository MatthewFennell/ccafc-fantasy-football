import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthenticatedRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props => (auth.uid ? <Component {...props} /> : <Redirect to="/signin" />)}
  />
);

const mapStateToProps = state => ({
  auth: state.firebase.auth
});

export default connect(mapStateToProps)(AuthenticatedRoute);
