/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { withRouter } from 'react-router-dom';
import { signUp } from './actions';
import { setErrorMessage } from '../modalHandling/actions';
import defaultStyles from './SignUp.module.scss';
import StyledButton from '../common/StyledButton/StyledButton';
import TextInput from '../common/TextInput/TextInput';
import * as textInputConstants from '../common/TextInput/constants';
import * as constants from '../constants';

const SignUp = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');
    const [displayName, setDisplayName] = useState('');

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

    const handleSubmit = e => {
        e.preventDefault();
        if (password === passwordTwo) {
            props.signUp(email, password, displayName);
        } else {
            props.setErrorMessage('Sign Up Error', {
                code: 'auth/mismatching passwords',
                message: 'The passwords do not match'
            });
        }
    };

    const redirectToPrivacyPolicy = useCallback(() => {
        props.history.push(constants.URL.PRIVACY_POLICY);
    }, [props.history]);

    return (
        <div className={props.styles.signUpWrapper}>
            <div className={props.styles.shadowWrapper}>
                <form
                    className={props.styles.signUpForm}
                    action="#!"
                    onSubmit={handleSubmit}
                >
                    <div className={props.styles.signUpMessage}>
                        Sign up
                    </div>
                    <div className={props.styles.textInputsWrapper}>
                        <TextInput
                            label="Email"
                            icon={textInputConstants.textInputIcons.email}
                            onChange={e => setEmail(e)}
                            value={email}
                            iconColor="secondary"
                        />
                        <TextInput
                            label="Password"
                            icon={textInputConstants.textInputIcons.lock}
                            onChange={setPassword}
                            value={password}
                            iconColor="secondary"
                            type="password"
                        />
                        <TextInput
                            label="Password"
                            icon={textInputConstants.textInputIcons.lock}
                            onChange={setPasswordTwo}
                            value={passwordTwo}
                            iconColor="secondary"
                            type="password"
                        />
                        <TextInput
                            label="Display Name"
                            icon={textInputConstants.textInputIcons.user}
                            onChange={e => setDisplayName(e)}
                            value={displayName}
                            iconColor="secondary"
                        />
                    </div>

                    <div className={props.styles.submitButtons}>
                        <StyledButton
                            color="primary"
                            onClick={handleSubmit}
                            text="Sign up"
                            type="submit"
                        />
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
                </form>
                <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                />
            </div>
        </div>
    );
};

const mapDispatchToProps = {
    signUp,
    setErrorMessage
};

SignUp.defaultProps = {
    styles: defaultStyles
};

SignUp.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    signUp: PropTypes.func.isRequired,
    setErrorMessage: PropTypes.func.isRequired,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default withRouter(connect(null, mapDispatchToProps)(SignUp));
