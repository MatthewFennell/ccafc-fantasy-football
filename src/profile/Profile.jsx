/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    linkProfileToFacebook, linkProfileToGoogle, updateTeamNameRequest,
    closeAccountLinkError, updateDisplayNameRequest, closeDisplayNameError,
    closeTeamNameError
} from './actions';
import defaultStyles from './Profile.module.scss';
import LinkAccounts from './linkaccounts/LinkAccounts';
import StyledModal from '../common/modal/StyledModal';
import Update from './update/Update';

const Profile = props => (
    <div className={props.styles.profileWrapper}>
        <div className={props.styles.profileHeader}>
            <div className={props.styles.fields}>
                <div>{props.profile.displayName || 'N/A'}</div>
                <div>{props.profile.teamName || 'N/A'}</div>
                <div>{props.profile.email || 'N/A'}</div>
            </div>
        </div>
        <div className={props.styles.bodyWrapper}>
            <LinkAccounts
                linkProfileToFacebook={props.linkProfileToFacebook}
                linkProfileToGoogle={props.linkProfileToGoogle}
            />
            <Update
                loading={props.updatingDisplayName}
                closeError={props.closeDisplayNameError}
                property="Display Name"
                updateRequest={props.updateDisplayNameRequest}
                updateError={props.updateDisplayNameError}
                updateErrorCode={props.updateDisplayNameErrorCode}
            />
            <Update
                loading={props.updatingTeamName}
                closeError={props.closeTeamNameError}
                property="Team Name"
                updateRequest={props.updateTeamNameRequest}
                updateError={props.updateTeamNameError}
                updateErrorCode={props.updateTeamNameErrorCode}
            />
        </div>
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
    closeTeamNameError,
    linkProfileToFacebook,
    linkProfileToGoogle,
    updateDisplayNameRequest,
    updateTeamNameRequest
};

const mapStateToProps = state => ({
    attemptedEmailToLink: state.profile.attemptedEmailToLink,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    linkAccountErrorCode: state.profile.linkAccountErrorCode,
    linkAccountErrorMessage: state.profile.linkAccountError,
    updatingDisplayName: state.profile.updatingDisplayName,
    updateDisplayNameError: state.profile.updateDisplayNameError,
    updateDisplayNameErrorCode: state.profile.updateDisplayNameErrorCode,

    updatingTeamName: state.profile.updatingTeamName,
    updateTeamNameError: state.profile.updateTeamNameError,
    updateTeamNameErrorCode: state.profile.updateTeamNameErrorCode
});

Profile.defaultProps = {
    attemptedEmailToLink: '',
    linkAccountErrorCode: '',
    linkAccountErrorMessage: '',
    profile: {
        displayName: '',
        email: '',
        teamName: ''
    },
    styles: defaultStyles,
    updatingDisplayName: false,
    updateDisplayNameError: '',
    updateDisplayNameErrorCode: '',
    updatingTeamName: false,
    updateTeamNameError: '',
    updateTeamNameErrorCode: ''
};

Profile.propTypes = {
    attemptedEmailToLink: PropTypes.string,
    closeAccountLinkError: PropTypes.func.isRequired,
    closeDisplayNameError: PropTypes.func.isRequired,
    closeTeamNameError: PropTypes.func.isRequired,
    linkAccountErrorCode: PropTypes.string,
    linkAccountErrorMessage: PropTypes.string,
    linkProfileToFacebook: PropTypes.func.isRequired,
    linkProfileToGoogle: PropTypes.func.isRequired,
    profile: PropTypes.shape({
        displayName: PropTypes.string,
        email: PropTypes.string,
        teamName: PropTypes.string
    }),
    styles: PropTypes.objectOf(PropTypes.string),
    updateDisplayNameRequest: PropTypes.func.isRequired,
    updateTeamNameRequest: PropTypes.func.isRequired,
    updatingDisplayName: PropTypes.bool,
    updateDisplayNameError: PropTypes.string,
    updateDisplayNameErrorCode: PropTypes.string,
    updatingTeamName: PropTypes.bool,
    updateTeamNameError: PropTypes.string,
    updateTeamNameErrorCode: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
