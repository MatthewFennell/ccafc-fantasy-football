import React from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signInSuccess } from './actions';

const SignUp = props => {
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
    <div>
      Sign Up!
      <StyledFirebaseAuth
        uiConfig={uiConfig}
        firebaseAuth={firebase.auth()}
      />
    </div>
  );
};

const mapDispatchToProps = {
  signInSuccess
};

SignUp.defaultProps = {

};

SignUp.propTypes = {
  signInSuccess: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(SignUp);
