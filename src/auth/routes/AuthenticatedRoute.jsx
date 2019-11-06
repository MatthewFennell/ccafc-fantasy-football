import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as constants from '../../constants';

const AuthenticatedRoute = ({
    component: Component, auth, loadedPermissions, ...rest
}) => {
    if (!loadedPermissions) {
        return null;
    }
    return (
        <Route
            {...rest}
            render={props => (auth.uid && auth.emailVerified
                ? <Component {...props} /> : <Redirect to={constants.URL.VERIFY_EMAIL} />)}
        />
    );
};

const mapStateToProps = state => ({
    auth: state.firebase.auth,
    loadedPermissions: state.auth.loadedPermissions
});

AuthenticatedRoute.defaultProps = {
    auth: {},
    component: {},
    loadedPermissions: false
};

AuthenticatedRoute.propTypes = {
    auth: PropTypes.PropTypes.shape({
        emailVerified: PropTypes.bool,
        uid: PropTypes.string
    }),
    component: PropTypes.elementType,
    loadedPermissions: PropTypes.bool
};

export default connect(mapStateToProps)(AuthenticatedRoute);
