import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import defaultStyles from './PasswordReset.module.scss';
import { sendPasswordResetEmail } from './actions';
import TextInput from '../common/TextInput/TextInput';
import Button from '../common/Button/Button';

const PasswordReset = props => {
    const [email, setEmail] = useState('');
    return (
        <div className={props.styles.passwordReset}>
      Password reset
            <TextInput
                onChange={setEmail}
            />
            <Button
                text="Send reset password email"
                onClick={() => props.sendPasswordResetEmail(email)}
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
