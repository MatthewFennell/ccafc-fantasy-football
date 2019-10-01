import React from 'react';
import PropTypes from 'prop-types';
import defaultStyles from './VerifyEmail.module.scss';

const VerifyEmail = props => (
    <div className={props.styles.verifyEmailMessage}>
        A verification link has been sent to your email account.
        Please click on the link to verify your account.
    </div>
);

VerifyEmail.defaultProps = {
    styles: defaultStyles
};

VerifyEmail.propTypes = {
    styles: PropTypes.objectOf(PropTypes.string)
};

export default VerifyEmail;
