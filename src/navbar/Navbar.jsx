import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import defaultStyles from './Navbar.module.scss';
import SignedInLinks from './SignedInLinks';
import { signOut } from '../auth/actions';
import SignedOutLinks from './SignedOutLinks';
import EmailVerifyLinks from './EmailVerifyLinks';

const Navbar = props => {
    const { auth } = props;

    const redirectToSignIn = useCallback(() => {
        props.history.push('/signin');
    }, [props.history]);

    const redirectToSignUp = useCallback(() => {
        props.history.push('/signup');
    }, [props.history]);

    const redirectToDashboard = useCallback(() => {
        props.history.push('/dashboard');
    }, [props.history]);

    const redirectToProfile = useCallback(() => {
        props.history.push('/profile');
    }, [props.history]);

    const renderLinks = signOutMethod => {
        if (auth.uid && auth.emailVerified) {
            return (
                <SignedInLinks
                    activeRoute={props.history.location.pathname}
                    goToDashboard={redirectToDashboard}
                    goToProfile={redirectToProfile}
                    photoURL={props.auth.photoURL}
                    signOut={signOutMethod}
                />
            );
        }
        if (auth.uid && !auth.emailVerified) {
            return (
                <EmailVerifyLinks
                    signOut={signOutMethod}
                />
            );
        }

        return (
            <SignedOutLinks
                activeRoute={props.history.location.pathname}
                redirectToSignIn={redirectToSignIn}
                redirectToSignUp={redirectToSignUp}
            />
        );
    };

    return (
        <div className={props.styles.navBar}>
            {renderLinks(props.signOut)}
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
        uid: PropTypes.string,
        emailVerified: PropTypes.bool,
        photoURL: PropTypes.string
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
