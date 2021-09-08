import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import LoadingDiv from '../common/loadingDiv/LoadingDiv';
import StyledButton from '../common/StyledButton/StyledButton';
import * as textInputConstants from '../common/TextInput/constants';
import TextInput from '../common/TextInput/TextInput';
import materialStyles from '../materialStyles';
import { sendPasswordResetEmail } from './actions';
import defaultStyles from './PasswordReset.module.scss';

const PasswordReset = props => {
    const [email, setEmail] = useState('');
    const classes = makeStyles(materialStyles)();
    return (
        <Paper
            elevation={4}
            className={classes.paper}
        >
            <div className={props.styles.passwordResetHeader}>Password reset</div>
            <TextInput
                icon={textInputConstants.textInputIcons.email}
                label="Email"
                onChange={setEmail}
                value={email}
                iconColor="secondary"
                onSubmit={() => props.sendPasswordResetEmail(email)}
            />
            <div className={props.styles.resetPasswordButton}>
                <LoadingDiv
                    isLoading={props.isSendingPasswordReset}
                    isBorderRadius
                >
                    <StyledButton
                        color="primary"
                        onClick={() => props.sendPasswordResetEmail(email)}
                        text="Send reset password email"
                    />
                </LoadingDiv>
            </div>
        </Paper>
    );
};

PasswordReset.defaultProps = {
    isSendingPasswordReset: false,
    styles: defaultStyles
};

PasswordReset.propTypes = {
    isSendingPasswordReset: PropTypes.bool,
    sendPasswordResetEmail: PropTypes.func.isRequired,
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapDispatchToProps = {
    sendPasswordResetEmail
};

const mapStateToProps = state => ({
    isSendingPasswordReset: state.auth.isSendingPasswordReset
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);

export { PasswordReset as PasswordResetUnconnected };
