/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { withRouter } from 'react-router-dom';
import defaultStyles from './SignIn.module.scss';
import * as constants from '../constants';

const SignIn = props => {
    const uiConfig = {
        signInFlow: 'popup',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccess: noop
        }
    };

    const redirectToPasswordReset = useCallback(() => {
        props.history.push(constants.URL.RESET_PASSWORD);
    }, [props.history]);

    return (
        <div className={props.styles.signInWrapper}>
            <div className={props.styles.shadowWrapper}>
                <div className={props.styles.signInMessage}>
                    Sign In
                </div>
                <div className={props.styles.passwordWrapper}>
                    <div
                        className={props.styles.forgotPasswordLink}
                        role="button"
                        tabIndex={0}
                        onClick={redirectToPasswordReset}
                    >
                        Forgot your password?
                    </div>
                </div>
                <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                />
            </div>
        </div>
    );
};

SignIn.defaultProps = {
    styles: defaultStyles
};

SignIn.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default withRouter(connect(null, null)(SignIn));

export { SignIn as SignInUnconnected };
