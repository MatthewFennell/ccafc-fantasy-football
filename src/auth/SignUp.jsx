/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { signUp, closeSignUpError } from './actions';
import defaultStyles from './SignUp.module.scss';
import StyledInput from '../common/StyledInput/StyledInput';
import StyledButton from '../common/StyledButton/StyledButton';
import StyledModal from '../common/modal/StyledModal';
import * as selectors from './selectors';


const SignUp = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');

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
        props.signUp(email, password, firstName, surname);
    };

    const [modalOpen, setModalOpen] = useState(false);

    console.log('sign up error', props.signUpError);

    return (
        <div className={props.styles.signUpWrapper}>
            <form
                className={classNames({
                    [props.styles.signUpForm]: true
                })}
                action="#!"
                onSubmit={handleSubmit}
            >

                <div className={props.styles.signUpMessage}>
                    Sign up
                </div>

                <StyledInput label="Email" icon="envelope" onChange={e => setEmail(e)} />
                <StyledInput label="Password" type="password" icon="lock" onChange={e => setPassword(e)} />
                <StyledInput label="First Name" onChange={e => setFirstName(e)} />
                <StyledInput label="Surname" onChange={e => setSurname(e)} />

                <div className={props.styles.submitButtons}>
                    <StyledButton
                        color="primary"
                        onClick={handleSubmit}
                        text="Sign up"
                    />
                </div>
            </form>
            <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
            />
            <StyledModal closeModal={props.closeSignUpError} isOpen={props.signUpError.length > 0}>
                {props.signUpError}
            </StyledModal>
        </div>
    );
};

const mapDispatchToProps = {
    closeSignUpError,
    signUp
};

const mapStateToProps = state => ({
    signUpError: selectors.getSignUpError(state)
});

SignUp.defaultProps = {
    signUpError: '',
    styles: defaultStyles
};

SignUp.propTypes = {
    closeSignUpError: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    signUp: PropTypes.func.isRequired,
    signUpError: PropTypes.string,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));
