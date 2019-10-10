/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useCallback } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import defaultStyles from './SignIn.module.scss';
import { signIn, closeAuthError } from './actions';
import StyledInput from '../common/StyledInput/StyledInput';
import StyledButton from '../common/StyledButton/StyledButton';
import * as selectors from './selectors';
import * as constants from '../constants';
import ErrorModal from '../common/modal/ErrorModal';

const SignIn = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const uiConfig = {
        signInFlow: 'popup',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccess: noop
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        props.signIn(email, password);
    };

    const redirectToPasswordReset = useCallback(() => {
        props.history.push(constants.URL.RESET_PASSWORD);
    }, [props.history]);

    return (
        <div className={props.styles.signInWrapper}>
            <div className={props.styles.shadowWrapper}>
                <form
                    className={classNames({
                        [props.styles.signUpForm]: true
                    })}
                    action="#!"
                    onSubmit={handleSubmit}
                >

                    <div className={props.styles.signInMessage}>
                    Sign In
                    </div>

                    <StyledInput label="Email" icon="envelope" onChange={e => setEmail(e)} type="email" value={email} />
                    <StyledInput label="Password" icon="lock" type="password" onChange={e => setPassword(e)} value={password} />

                    <div className={props.styles.submitButtons}>
                        <StyledButton
                            color="primary"
                            onClick={handleSubmit}
                            text="Sign in"
                            type="submit"
                        />
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
                </form>
                <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                />
            </div>
            <ErrorModal
                closeModal={props.closeAuthError}
                headerMessage="Sign In Error"
                isOpen={props.signInErrorMessage.length > 0}
                errorCode={props.signInErrorCode}
                errorMessage={props.signInErrorMessage}
            />
        </div>
    );
};

SignIn.defaultProps = {
    signInErrorCode: '',
    signInErrorMessage: '',
    styles: defaultStyles
};

SignIn.propTypes = {
    closeAuthError: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    signIn: PropTypes.func.isRequired,
    signInErrorCode: PropTypes.string,
    signInErrorMessage: PropTypes.string,
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapDispatchToProps = {
    closeAuthError,
    signIn
};

const mapStateToProps = state => ({
    signInErrorCode: selectors.getSignInErrorCode(state),
    signInErrorMessage: selectors.getSignInError(state)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
