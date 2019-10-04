import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as constants from '../../constants';

const AuthenticatedRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props => (auth.uid && auth.emailVerified
            ? <Component {...props} /> : <Redirect to={constants.URL.VERIFY_EMAIL} />)}
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
        emailVerified: PropTypes.bool,
        uid: PropTypes.string
    })
};

export default connect(mapStateToProps)(AuthenticatedRoute);
