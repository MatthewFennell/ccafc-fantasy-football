import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const UnauthenticatedEmailRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props => (true ? <Component {...props} /> : <Redirect to="/signin" />)}
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
