import React from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import defaultStyles from './SignIn.module.scss';
import { signInSuccess } from './actions';

const SignIn = props => {
  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => {
        props.signInSuccess();
      }
    }
  };

  return (
    <div className={props.styles.signIn}>
      Sign In!
      <StyledFirebaseAuth
        uiConfig={uiConfig}
        firebaseAuth={firebase.auth()}
      />
    </div>
  );
};

SignIn.defaultProps = {
  styles: defaultStyles
};

SignIn.propTypes = {
  signInSuccess: PropTypes.func.isRequired,
  styles: PropTypes.objectOf(PropTypes.string)
};

const mapDispatchToProps = {
  signInSuccess
};

export default connect(null, mapDispatchToProps)(SignIn);
