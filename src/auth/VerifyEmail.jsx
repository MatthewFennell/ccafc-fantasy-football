import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import defaultStyles from './VerifyEmail.module.scss';
import { resendEmailVerificationRequest } from './actions';
import StyledButton from '../common/StyledButton/StyledButton';
import Spinner from '../common/spinner/Spinner';
import materialStyles from '../materialStyles';

const VerifyEmail = props => {
    const classes = makeStyles(materialStyles)();
    return (
        <Paper
            elevation={4}
            className={classes.paper}
        >
            <div className={props.styles.verifyEmailMessage}>
                {`A verification link has been sent to ${props.email}. Please click on the link to verify your account. 
            If you signed in with Facebook, try refreshing the page` }
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
        </Paper>
    );
};

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
    email: state.firebase.auth.email,
    sendingEmail: state.auth.sendingEmailVerification
});

const mapDispatchToProps = {
    resendEmailVerificationRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);

export { VerifyEmail as VerifyEmailUnconnected };
