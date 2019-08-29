import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AuthenticatedRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props => (auth.uid ? <Component {...props} /> : <Redirect to="/signin" />)}
  />
);

const mapStateToProps = state => ({
  auth: state.firebase.auth
});

AuthenticatedRoute.defaultProps = {
  component: {},
  auth: {}
};

AuthenticatedRoute.propTypes = {
  component: PropTypes.elementType,
  auth: PropTypes.PropTypes.shape({
    uid: PropTypes.string
  })
};

export default connect(mapStateToProps)(AuthenticatedRoute);
