import React from 'react';
import { noop } from 'lodash';
import PropTypes from 'prop-types';
import Button from '../common/Button';
import NavbarButtonStyles from './NavbarButtonStyles.module.scss';

const SignedOutLinks = props => (
  <div>
    Signed Out
    <Button
      onClick={props.signIn}
      styles={NavbarButtonStyles}
      text="Sign in"
    />
  </div>
);

SignedOutLinks.defaultProps = {
  signIn: noop
};

SignedOutLinks.propTypes = {
  signIn: PropTypes.func
};

export default SignedOutLinks;
