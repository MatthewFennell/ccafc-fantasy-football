import React from 'react';
import { noop } from 'lodash';
import PropTypes from 'prop-types';
import Button from '../common/Button';
import NavbarButtonStyles from './NavbarButtonStyles.module.scss';

const SignedOutLinks = props => (
  <div>
    <Button
      onClick={props.redirectToSignIn}
      styles={NavbarButtonStyles}
      text="Sign in"
    />
    <Button
      onClick={props.redirectToSignUp}
      styles={NavbarButtonStyles}
      text="Sign up"
    />
  </div>
);

SignedOutLinks.defaultProps = {
  redirectToSignIn: noop,
  redirectToSignUp: noop
};

SignedOutLinks.propTypes = {
  redirectToSignIn: PropTypes.func,
  redirectToSignUp: PropTypes.func
};

export default SignedOutLinks;
