import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import Button from '../common/Button';
import NavbarButtonStyles from './NavbarButtonStyles.module.scss';

const SignedInLinks = props => (
  <div>
    Signed In
    <Button
      onClick={props.signOut}
      styles={NavbarButtonStyles}
      text="Logout"
    />
  </div>
);

SignedInLinks.defaultProps = {
  signOut: noop
};

SignedInLinks.propTypes = {
  signOut: PropTypes.func
};

export default SignedInLinks;
