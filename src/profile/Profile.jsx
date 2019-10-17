/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    linkProfileToFacebook, linkProfileToGoogle,
    closeAccountLinkError, updateDisplayNameRequest, closeDisplayNameError
} from './actions';
import defaultStyles from './Profile.module.scss';
import LinkAccounts from './linkaccounts/LinkAccounts';
import StyledModal from '../common/modal/StyledModal';
import UpdateDisplayName from './updatedisplayname/UpdateDisplayName';

const Profile = props => (
    <div className={props.styles.profileWrapper}>
        <div className={props.styles.profileHeader}>
            <div className={props.styles.profileDisplayName}>
                {`Display Name: ${(props.profile.displayName || 'N/A')}`}
            </div>
            <div className={props.styles.profileEmail}>
                {props.profile.email}
            </div>
        </div>
        <LinkAccounts
            linkProfileToFacebook={props.linkProfileToFacebook}
            linkProfileToGoogle={props.linkProfileToGoogle}
        />
        <UpdateDisplayName
            loading={props.updatingDisplayName}
            closeDisplayNameError={props.closeDisplayNameError}
            updateDisplayName={props.updateDisplayNameRequest}
            updateDisplayNameError={props.updateDisplayNameError}
            updateDisplayNameErrorCode={props.updateDisplayNameErrorCode}
        />
        <StyledModal
            backdrop
            closeModal={props.closeAccountLinkError}
            error
            isOpen={props.linkAccountErrorMessage.length > 0}
            headerMessage="Account Linking Error"
            toggleModal={props.closeAccountLinkError}
        >
            <div className={props.styles.modalWrapper}>
                <div>
                    {`Code: ${props.linkAccountErrorCode}`}
                </div>
                <div>
                    {`Message: ${props.linkAccountErrorMessage}`}
                </div>
                {props.attemptedEmailToLink && (
                    <div>
                        {`Attempted Email: ${props.attemptedEmailToLink}`}
                    </div>
                )}
            </div>
        </StyledModal>
    </div>
);

const mapDispatchToProps = {
    closeAccountLinkError,
    closeDisplayNameError,
    linkProfileToFacebook,
    linkProfileToGoogle,
    updateDisplayNameRequest
};

const mapStateToProps = state => ({
    attemptedEmailToLink: state.profile.attemptedEmailToLink,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    linkAccountErrorCode: state.profile.linkAccountErrorCode,
    linkAccountErrorMessage: state.profile.linkAccountError,
    updatingDisplayName: state.profile.updatingDisplayName,
    updateDisplayNameError: state.profile.updateDisplayNameError,
    updateDisplayNameErrorCode: state.profile.updateDisplayNameErrorCode
});

Profile.defaultProps = {
    attemptedEmailToLink: '',
    linkAccountErrorCode: '',
    linkAccountErrorMessage: '',
    profile: {
        displayName: '',
        email: ''
    },
    styles: defaultStyles,
    updatingDisplayName: false,
    updateDisplayNameError: '',
    updateDisplayNameErrorCode: ''
};

Profile.propTypes = {
    attemptedEmailToLink: PropTypes.string,
    closeAccountLinkError: PropTypes.func.isRequired,
    closeDisplayNameError: PropTypes.func.isRequired,
    linkAccountErrorCode: PropTypes.string,
    linkAccountErrorMessage: PropTypes.string,
    linkProfileToFacebook: PropTypes.func.isRequired,
    linkProfileToGoogle: PropTypes.func.isRequired,
    profile: PropTypes.shape({
        displayName: PropTypes.string,
        email: PropTypes.string
    }),
    styles: PropTypes.objectOf(PropTypes.string),
    updateDisplayNameRequest: PropTypes.func.isRequired,
    updatingDisplayName: PropTypes.bool,
    updateDisplayNameError: PropTypes.string,
    updateDisplayNameErrorCode: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
