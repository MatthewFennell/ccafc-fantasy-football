import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { verifyEmailAddress } from './actions';

const SignUpVerification = props => {
  useEffect(() => {
    props.verifyEmailAddress();
  }, [props.verifyEmailAddress]);
  return (
    <div>
    VERIFYING ACCOUNT
    </div>
  );
};

SignUpVerification.defaultProps = {
};

SignUpVerification.propTypes = {
  verifyEmailAddress: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  verifyEmailAddress
};

export default connect(null, mapDispatchToProps)(SignUpVerification);
