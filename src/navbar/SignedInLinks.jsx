import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import Button from '../common/Button';
import NavbarButtonStyles from './NavbarButtonStyles.module.scss';
import ProfileIcon from '../icons/profile.png';
// import MaleIcon from '../icons/male-icon.svg';
import defaultStyles from './SignedInLinksStyles.module.scss';

const SignedInLinks = props => (
  <div>
    <Button
      onClick={props.signOut}
      styles={NavbarButtonStyles}
      text="Logout"
    />
    {/* <img className={props.styles.profileIcon} src={MaleIcon} alt="Profile" /> */}
  </div>
);

SignedInLinks.defaultProps = {
  signOut: noop,
  styles: defaultStyles
};

SignedInLinks.propTypes = {
  signOut: PropTypes.func,
  styles: PropTypes.objectOf(PropTypes.string)
};

export default SignedInLinks;
