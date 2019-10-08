/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { linkProfileToFacebook, linkProfileToGoogle, closeAuthError } from '../auth/actions';
import defaultStyles from './Profile.module.scss';
import LinkAccounts from './LinkAccounts';
import * as selectors from '../auth/selectors';
import StyledModal from '../common/modal/StyledModal';

const Profile = props => (
    <div className={props.styles.profileWrapper}>
        <LinkAccounts
            linkProfileToFacebook={props.linkProfileToFacebook}
            linkProfileToGoogle={props.linkProfileToGoogle}
        />
        <StyledModal
            backdrop
            closeModal={props.closeAuthError}
            error
            isOpen={props.linkAccountErrorMessage.length > 0}
            headerMessage="Account Linking Error"
            toggleModal={props.closeAuthError}
        >
            <div className={props.styles.modalWrapper}>
                <div>
                        Code:
                    {' '}
                    {props.linkAccountErrorCode}
                </div>
                <div>
                        Message:
                    {' '}
                    {props.linkAccountErrorMessage}
                </div>
                {props.attemptedEmailToLink && (
                    <div>
                        Attempted Email:
                        {props.attemptedEmailToLink}
                    </div>
                )}
            </div>
        </StyledModal>
    </div>
);

const mapDispatchToProps = {
    closeAuthError,
    linkProfileToFacebook,
    linkProfileToGoogle
};

const mapStateToProps = state => ({
    attemptedEmailToLink: selectors.getAttemptedEmailToLink(state),
    auth: state.firebase.auth,
    linkAccountErrorCode: selectors.getLinkAccountErrorCode(state),
    linkAccountErrorMessage: selectors.getLinkAccountError(state)
});

Profile.defaultProps = {
    attemptedEmailToLink: '',
    linkAccountErrorCode: '',
    linkAccountErrorMessage: '',
    styles: defaultStyles
};

Profile.propTypes = {
    attemptedEmailToLink: PropTypes.string,
    closeAuthError: PropTypes.func.isRequired,
    linkAccountErrorCode: PropTypes.string,
    linkAccountErrorMessage: PropTypes.string,
    linkProfileToFacebook: PropTypes.func.isRequired,
    linkProfileToGoogle: PropTypes.func.isRequired,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
