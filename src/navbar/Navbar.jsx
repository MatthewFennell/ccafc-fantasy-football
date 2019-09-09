import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import defaultStyles from './Navbar.module.scss';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { signOut } from '../auth/actions';

const Navbar = props => {
    const { auth, profile } = props;

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
                    <>
                        <div className={props.styles.signedInLinks}>
                            <SignedInLinks
                                goToDashboard={redirectToDashboard}
                                signOut={props.signOut}
                            />
                            <div className={props.styles.displayName}>
                                {profile.displayName}
                            </div>
                        </div>

                    </>
                )
                : (
                    <>
                        <div className={props.styles.signedOutLinks}>
                            <SignedOutLinks
                                redirectToSignIn={redirectToSignIn}
                                redirectToSignUp={redirectToSignUp}
                            />
                        </div>
                    </>
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
        push: PropTypes.func.isRequired
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
