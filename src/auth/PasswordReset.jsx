import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import defaultStyles from './PasswordReset.module.scss';
import { sendPasswordResetEmail, closeAuthError } from './actions';
import StyledInput from '../common/StyledInput/StyledInput';
import StyledButton from '../common/StyledButton/StyledButton';
import * as selectors from './selectors';
import ErrorModal from '../common/modal/ErrorModal';

const PasswordReset = props => {
    const [email, setEmail] = useState('');
    return (
        <div className={props.styles.passwordReset}>
            <div className={props.styles.passwordResetHeader}>Password reset</div>
            <StyledInput icon="envelope" label="Email" onChange={setEmail} />
            <div className={props.styles.resetPasswordButton}>
                <StyledButton
                    color="primary"
                    onClick={() => props.sendPasswordResetEmail(email)}
                    text="Send reset password email"
                />
            </div>
            <ErrorModal
                closeModal={props.closeAuthError}
                headerMessage="Password Reset Error"
                isOpen={props.passwordResetErrorMessage.length > 0}
                errorCode={props.passwordResetErrorCode}
                errorMessage={props.passwordResetErrorMessage}
            />
        </div>
    );
};

PasswordReset.defaultProps = {
    passwordResetErrorCode: '',
    passwordResetErrorMessage: '',
    styles: defaultStyles
};

PasswordReset.propTypes = {
    closeAuthError: PropTypes.func.isRequired,
    passwordResetErrorCode: PropTypes.string,
    passwordResetErrorMessage: PropTypes.string,
    sendPasswordResetEmail: PropTypes.func.isRequired,
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapDispatchToProps = {
    closeAuthError,
    sendPasswordResetEmail
};

const mapStateToProps = state => ({
    passwordResetErrorCode: selectors.getPasswordResetErrorCode(state),
    passwordResetErrorMessage: selectors.getPasswordResetError(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);
