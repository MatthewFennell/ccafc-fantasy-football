import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import defaultStyles from './VerifyEmail.module.scss';
import { resendEmailVerificationRequest } from './actions';
import StyledButton from '../common/StyledButton/StyledButton';
import Spinner from '../common/spinner/Spinner';

const VerifyEmail = props => (
    <div className={props.styles.verifyEmailMessage}>
        {`A verification link has been sent to ${props.email}. Please click on the link to verify your account.` }
        <div className={props.styles.resendEmailButtonWrapper}>
            <StyledButton
                color="primary"
                onClick={props.resendEmailVerificationRequest}
                text="Resend email"
            />
            <div className={props.styles.spinnerWrapper}>
                {props.sendingEmail && <Spinner color="secondary" /> }
            </div>
        </div>
    </div>
);

VerifyEmail.defaultProps = {
    email: '',
    sendingEmail: false,
    styles: defaultStyles
};

VerifyEmail.propTypes = {
    email: PropTypes.string,
    resendEmailVerificationRequest: PropTypes.func.isRequired,
    sendingEmail: PropTypes.bool,
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapStateToProps = state => ({
    email: state.firebase.profile.email,
    sendingEmail: state.auth.sendingEmailVerification
});

const mapDispatchToProps = {
    resendEmailVerificationRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
