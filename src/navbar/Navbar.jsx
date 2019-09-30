import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import defaultStyles from './Navbar.module.scss';
import SignedInLinks from './SignedInLinks';
import { signOut } from '../auth/actions';
import SignedOutLinks from './SignedOutLinks';

const Navbar = props => {
    const { auth } = props;

    const redirectToSignIn = useCallback(() => {
        props.history.push('/signin');
    }, [props.history]);

    const redirectToSignUp = useCallback(() => {
        props.history.push('/signup');
    }, [props.history]);

    const redirectToDashboard = useCallback(() => {
        props.history.push('/signup');
    }, [props.history]);

    return (
        <div className={props.styles.navBar}>
            {auth.uid
                ? (
                    <SignedInLinks
                        activeRoute={props.history.location.pathname}
                        goToDashboard={redirectToDashboard}
                        signOut={props.signOut}
                    />
                )
                : (
                    <SignedOutLinks
                        activeRoute={props.history.location.pathname}
                        redirectToSignIn={redirectToSignIn}
                        redirectToSignUp={redirectToSignUp}
                    />
                )}
        </div>
    );
};

Navbar.defaultProps = {
    auth: {},
    profile: {},
    styles: defaultStyles
};

Navbar.propTypes = {
    auth: PropTypes.shape({
        uid: PropTypes.string
    }),
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        location: PropTypes.shape({
            pathname: PropTypes.string
        })
    }).isRequired,
    profile: PropTypes.shape({
        displayName: PropTypes.string
    }),
    signOut: PropTypes.func.isRequired,
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapStateToProps = state => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    pathname: state.router.location.pathname
});

const mapDispatchToProps = {
    signOut
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
