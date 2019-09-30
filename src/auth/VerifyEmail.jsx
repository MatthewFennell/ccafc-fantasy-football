import React from 'react';
import PropTypes from 'prop-types';
import defaultStyles from './VerifyEmail.module.scss';

const VerifyEmail = props => (
    <div className={props.styles.verifyEmailMessage}>
        You need to verify your email. If you signed up with Facebook,
        you may just need to refresh your page
    </div>
);

VerifyEmail.defaultProps = {
    styles: defaultStyles
};

VerifyEmail.propTypes = {
    styles: PropTypes.objectOf(PropTypes.string)
};

export default VerifyEmail;
