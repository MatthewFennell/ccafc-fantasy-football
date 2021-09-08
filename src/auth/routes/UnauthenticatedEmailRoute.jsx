import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const UnauthenticatedEmailRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props => (auth.uid && !auth.emailVerified ? <Component {...props} /> : <Redirect to="/signin" />)}
    />
);

const mapStateToProps = state => ({
    auth: state.firebase.auth
});

UnauthenticatedEmailRoute.defaultProps = {
    component: {},
    auth: {}
};

UnauthenticatedEmailRoute.propTypes = {
    component: PropTypes.elementType,
    auth: PropTypes.PropTypes.shape({
        emailVerified: PropTypes.bool,
        uid: PropTypes.string
    })
};

export default connect(mapStateToProps)(UnauthenticatedEmailRoute);

export { UnauthenticatedEmailRoute as UnauthenticatedEmailRouteUnconnected };
