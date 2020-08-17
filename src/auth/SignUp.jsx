/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { withRouter } from 'react-router-dom';
import defaultStyles from './SignUp.module.scss';
import * as constants from '../constants';

const SignUp = props => {
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

    const redirectToPrivacyPolicy = useCallback(() => {
        props.history.push(constants.URL.PRIVACY_POLICY);
    }, [props.history]);

    return (
        <div className={props.styles.signUpWrapper}>
            <div className={props.styles.shadowWrapper}>
                <div className={props.styles.signUpMessage}>
                    Sign up
                </div>
                <div className={props.styles.privacyPolicyWrapper}>
                    <div
                        className={props.styles.privacyPolicy}
                        role="button"
                        tabIndex={0}
                        onClick={redirectToPrivacyPolicy}
                    >
                        See our Privacy Policy
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

SignUp.defaultProps = {
    styles: defaultStyles
};

SignUp.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default withRouter(connect(null, null)(SignUp));

export { SignUp as SignUpUnconnected };
