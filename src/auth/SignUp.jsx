/* eslint-disable jsx-a11y/label-has-associated-control */
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase';
import { noop } from 'lodash';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as constants from '../constants';
import materialStyles from '../materialStyles';
import defaultStyles from './SignUp.module.scss';

const SignUp = props => {
    const classes = makeStyles(materialStyles)();
    const uiConfig = {
        signInFlow: 'popup',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccess: noop
        }
    };

    const redirectToPrivacyPolicy = useCallback(() => {
        props.history.push(constants.URL.PRIVACY_POLICY);
    }, [props.history]);

    return (
        <Paper
            elevation={4}
            className={classes.paper}
        >
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
        </Paper>
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
