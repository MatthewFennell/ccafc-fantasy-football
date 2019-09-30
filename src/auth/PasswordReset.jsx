import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import defaultStyles from './PasswordReset.module.scss';
import { sendPasswordResetEmail } from './actions';
import StyledInput from '../common/StyledInput/StyledInput';
import StyledButton from '../common/StyledButton/StyledButton';

const PasswordReset = props => {
    const [email, setEmail] = useState('');
    return (
        <div className={props.styles.passwordReset}>
            <div className={props.styles.passwordResetHeader}>Password reset</div>
            <StyledInput icon="envelope" label="Email" onChange={setEmail} />
            <StyledButton
                color="primary"
                onClick={() => props.sendPasswordResetEmail(email)}
                text="Send reset password email"
            />
        </div>
    );
};

PasswordReset.defaultProps = {
    styles: defaultStyles
};

PasswordReset.propTypes = {
    sendPasswordResetEmail: PropTypes.func.isRequired,
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapDispatchToProps = {
    sendPasswordResetEmail
};

export default connect(null, mapDispatchToProps)(PasswordReset);
