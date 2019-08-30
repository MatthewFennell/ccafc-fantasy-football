/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import defaultStyles from './SignIn.module.scss';
import { signIn } from './actions';

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

  return (
    <div className={props.styles.signIn}>
      <StyledFirebaseAuth
        uiConfig={uiConfig}
        firebaseAuth={firebase.auth()}
      />
      <div className={props.styles.signInForm}>
        <form className="white" onSubmit={handleSubmit}>
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={e => setPassword(e.target.value)} />
          </div>
          <div className="input-field">
            <button onClick={handleSubmit} type="button" className="btn pink lighten-1 z-depth-0">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

SignIn.defaultProps = {
  styles: defaultStyles
};

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
  styles: PropTypes.objectOf(PropTypes.string)
};

const mapDispatchToProps = {
  signIn
};

export default connect(null, mapDispatchToProps)(SignIn);
