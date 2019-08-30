/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { signUp } from './actions';
import defaultStyles from './SignUp.module.scss';

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

  return (
    <div>
      Sign Up!
      <StyledFirebaseAuth
        uiConfig={uiConfig}
        firebaseAuth={firebase.auth()}
      />
      <div className={props.styles.emailSignIn}>
      Sign up with email!
        <form className="white" onSubmit={handleSubmit}>
          <h5 className="grey-text text-darken-3">Sign Up</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={e => setPassword(e.target.value)} />
          </div>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" onChange={e => setFirstName(e.target.value)} />
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" onChange={e => setSurname(e.target.value)} />
          </div>
          <div className="input-field">
            <button onClick={handleSubmit} type="button" className="btn pink lighten-1 z-depth-0">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  signUp
};

SignUp.defaultProps = {
  styles: defaultStyles
};

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired,
  styles: PropTypes.objectOf(PropTypes.string)
};

export default connect(null, mapDispatchToProps)(SignUp);
