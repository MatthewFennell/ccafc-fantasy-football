import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import defaultStyles from './PasswordReset.module.scss';
import { sendPasswordResetEmail } from './actions';
import StyledButton from '../common/StyledButton/StyledButton';
import TextInput from '../common/TextInput/TextInput';
import * as textInputConstants from '../common/TextInput/constants';

const PasswordReset = props => {
    const [email, setEmail] = useState('');
    return (
        <div className={props.styles.passwordReset}>
            <div className={props.styles.passwordResetHeader}>Password reset</div>
            <TextInput
                icon={textInputConstants.textInputIcons.email}
                label="Email"
                onChange={setEmail}
                value={email}
                iconColor="secondary"
            />
            <div className={props.styles.resetPasswordButton}>
                <StyledButton
                    color="primary"
                    onClick={() => props.sendPasswordResetEmail(email)}
                    text="Send reset password email"
                />
            </div>
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

export { PasswordReset as PasswordResetUnconnected };
