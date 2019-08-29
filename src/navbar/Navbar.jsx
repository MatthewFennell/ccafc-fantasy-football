import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import defaultStyles from './Navbar.module.scss';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { signIn, signOut } from '../auth/actions';

const Navbar = props => {
  const { auth } = props;
  return (
    <div className={props.styles.navBar}>
    Navbar
      {auth.uid ? <SignedInLinks signOut={props.signOut} />
        : <SignedOutLinks signIn={props.signIn} />}
    </div>
  );
};

Navbar.defaultProps = {
  auth: '',
  styles: defaultStyles
};

Navbar.propTypes = {
  auth: PropTypes.string,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  styles: PropTypes.objectOf(PropTypes.string)
};

const mapStateToProps = state => ({
  auth: state.firebase.auth
});

const mapDispatchToProps = {
  signIn,
  signOut
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
