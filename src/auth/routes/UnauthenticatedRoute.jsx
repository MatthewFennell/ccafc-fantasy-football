import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import * as constants from '../../constants';

const UnauthenticatedRoute = ({
    component: Component, auth, redirect, ...rest
}) => (
    <Route
        {...rest}
        render={props => (auth.uid && auth.emailVerified
            ? <Redirect to={redirect} /> : <Component {...props} />)}
    />
);

const mapStateToProps = state => ({
    auth: state.firebase.auth
});

UnauthenticatedRoute.defaultProps = {
    auth: {},
    component: {},
    redirect: constants.URL.OVERVIEW
};

UnauthenticatedRoute.propTypes = {
    auth: PropTypes.PropTypes.shape({
        emailVerified: PropTypes.bool,
        uid: PropTypes.string
    }),
    component: PropTypes.elementType,
    redirect: PropTypes.string
};

export default connect(mapStateToProps)(UnauthenticatedRoute);

export { UnauthenticatedRoute as UnauthenticatedRouteUnconnected };
