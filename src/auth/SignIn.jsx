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
import { signIn } from './actions';
import StyledInput from '../common/StyledInput/StyledInput';
import StyledButton from '../common/StyledButton/StyledButton';

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

    const handleSubmit = () => {
        props.signIn(email, password);
    };

    const redirectToPasswordReset = useCallback(() => {
        props.history.push('/password-reset');
    }, [props.history]);

    return (
        <div className={props.styles.signInWrapper}>
            <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
            />
            <form
                className={classNames({
                    [props.styles.signUpForm]: true
                })}
                action="#!"
                onSubmit={handleSubmit}
            >

                <div className={props.styles.signInMessage}>
                    Sign in
                </div>

                <StyledInput label="Email" icon="envelope" onChange={e => setEmail(e)} />
                <StyledInput label="Password" icon="lock" onChange={e => setPassword(e)} />

                <div className={props.styles.submitButtons}>
                    <StyledButton
                        color="primary"
                        text="Sign up"
                    />
                    <StyledButton
                        color="amber"
                        onClick={redirectToPasswordReset}
                        text="Forgot your password?"
                    />
                </div>
            </form>
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
    signIn: PropTypes.func.isRequired,
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapDispatchToProps = {
    signIn
};

export default withRouter(connect(null, mapDispatchToProps)(SignIn));
