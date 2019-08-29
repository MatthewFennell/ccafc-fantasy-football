import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import defaultStyles from './Navbar.module.scss';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { redirectToSignIn, redirectToSignUp, signOut } from '../auth/actions';

const Navbar = props => {
  const { auth, profile } = props;
  console.log('auth', auth);
  return (
    <div className={props.styles.navBar}>
    Navbar
      {auth.uid
        ? (
          <>
            <SignedInLinks signOut={props.signOut} />
            <div className={props.styles.displayName}>
              {profile.displayName}
            </div>

          </>
        )
        : (
          <SignedOutLinks
            redirectToSignIn={props.redirectToSignIn}
            redirectToSignUp={props.redirectToSignUp}
          />
        )}

    </div>
  );
};

Navbar.defaultProps = {
  auth: {},
  profile: {},
  styles: defaultStyles
};

Navbar.propTypes = {
  auth: PropTypes.shape({}),
  profile: PropTypes.shape({
    displayName: PropTypes.string
  }),
  redirectToSignIn: PropTypes.func.isRequired,
  redirectToSignUp: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  styles: PropTypes.objectOf(PropTypes.string)
};

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

const mapDispatchToProps = {
  redirectToSignIn,
  redirectToSignUp,
  signOut
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
