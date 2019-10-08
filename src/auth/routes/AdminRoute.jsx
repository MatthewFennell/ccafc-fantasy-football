import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as constants from '../../constants';

const AdminRoute = ({
    component: Component, auth, isAdmin, ...rest
}) => (
    <Route
        {...rest}
        // render={props => (auth.uid && auth.emailVerified && isAdmin
        render={props => (auth.uid && auth.emailVerified
            ? <Component {...props} /> : <Redirect to={constants.URL.OVERVIEW} />)}
    />
);

const mapStateToProps = state => ({
    auth: state.firebase.auth,
    isAdmin: state.auth.isAdmin
});

AdminRoute.defaultProps = {
    component: {},
    auth: {},
    isAdmin: false
};

AdminRoute.propTypes = {
    component: PropTypes.elementType,
    auth: PropTypes.PropTypes.shape({
        emailVerified: PropTypes.bool,
        uid: PropTypes.string
    }),
    isAdmin: PropTypes.bool
};

export default connect(mapStateToProps)(AdminRoute);
