import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import LoadingDiv from '../common/loadingDiv/LoadingDiv';
import SuccessModal from '../common/modal/SuccessModal';
import StyledButton from '../common/StyledButton/StyledButton';
import * as textInputConstants from '../common/TextInput/constants';
import TextInput from '../common/TextInput/TextInput';
import materialStyles from '../materialStyles';
import {
    deleteAccountRequest, linkProfileToFacebook, linkProfileToGoogle,
    updateDisplayNameRequest, updateProfilePictureRequest, updateTeamNameRequest
} from './actions';
// import LinkAccounts from './linkaccounts/LinkAccounts';
import defaultStyles from './Profile.module.scss';
import * as selectors from './selectors';
import SelectProfilePicture from './selectprofilepicture/SelectProfilePicture';
import Update from './update/Update';

const Profile = props => {
    const classes = makeStyles(materialStyles)();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [email, setEmail] = useState('');

    const closeModal = useCallback(() => {
        setDeleteModalOpen(false);
        setEmail('');
    }, []);

    const deleteAccount = useCallback(() => {
        props.deleteAccountRequest(email);
        setDeleteModalOpen(false);
        setEmail('');
        // eslint-disable-next-line
    }, [props.deleteAccountRequest, email]);

    const updateProfilePicture = useCallback(photoUrl => {
        props.updateProfilePictureRequest(photoUrl);
        // eslint-disable-next-line
    }, [props.updateProfilePictureRequest])

    const potentialPictures = firebase.auth().currentUser.providerData.map(x => x.photoURL);

    return (
        <div className={props.styles.profileWrapper}>
            <Paper
                elevation={4}
                className={classes.paper}
            >
                <div className={props.styles.profileHeader}>
                    <div>
                        <div className={props.styles.key}>
                            Display Name
                        </div>
                        <div>
                            {props.profile.displayName || 'N/A'}
                        </div>
                    </div>

                    <div>
                        <div className={props.styles.key}>
                            Team Name
                        </div>
                        <div>
                            {props.profile.teamName || 'N/A'}
                        </div>
                    </div>

                    <div>
                        <div className={props.styles.key}>
                            Email
                        </div>
                        <div>
                            {props.profile.email || 'N/A'}
                        </div>
                    </div>

                    <div>
                        <div className={props.styles.key}>
                            App Version
                        </div>
                        <div>
                            {process.env.REACT_APP_VERSION}
                        </div>
                    </div>
                </div>
            </Paper>
            <div className={props.styles.bodyWrapper}>
                {/* <LinkAccounts
                    isSignedInWithFacebook={props.isSignedInWithFacebook}
                    isSignedInWithGoogle={props.isSignedInWithGoogle}
                    linkProfileToFacebook={props.linkProfileToFacebook}
                    linkProfileToGoogle={props.linkProfileToGoogle}
                /> */}
                <Update
                    loading={props.updatingDisplayName}
                    property="Display Name"
                    updateRequest={props.updateDisplayNameRequest}
                    icon={textInputConstants.textInputIcons.user}
                />
                <Update
                    loading={props.updatingTeamName}
                    property="Team Name"
                    updateRequest={props.updateTeamNameRequest}
                />
                <SelectProfilePicture
                    currentPhotoUrl={props.profile.photoUrl}
                    photoUrlBeingUpdated={props.photoUrlBeingUpdated}
                    potentialPictures={_.union(potentialPictures, [props.profile.photoUrl])}
                    updateProfilePicture={updateProfilePicture}
                />
            </div>

            <div className={props.styles.deleteButtonWrapper}>
                <LoadingDiv isLoading={props.deletingAccount} isBorderRadius isFitContent>
                    <StyledButton
                        color="secondary"
                        text="Delete Account"
                        onClick={() => setDeleteModalOpen(true)}
                        disabled={props.deletingAccount}
                    />
                </LoadingDiv>
            </div>
            <SuccessModal
                backdrop
                closeModal={closeModal}
                error
                isOpen={deleteModalOpen}
                headerMessage="Delete Account: This cannot be reversed"
                toggleModal={closeModal}
            >
                <div className={props.styles.enterEmailMessage}>
                    Please confirm your email
                </div>
                <div className={props.styles.emailTextWrapper}>
                    <TextInput
                        label="Email"
                        onChange={setEmail}
                        value={email}
                        icon={textInputConstants.textInputIcons.email}
                        iconColor="primary"
                        onSubmit={deleteAccount}
                    />
                </div>
                <div className={props.styles.submitDeleteAccountWrapper}>
                    <StyledButton
                        color="primary"
                        text="Confirm"
                        onClick={deleteAccount}
                        disabled={!email}
                    />
                </div>
            </SuccessModal>
        </div>
    );
};

Profile.defaultProps = {
    deletingAccount: false,
    // isSignedInWithFacebook: false,
    // isSignedInWithGoogle: false,
    photoUrlBeingUpdated: '',
    profile: {
        displayName: '',
        email: '',
        teamName: ''
    },
    styles: defaultStyles,
    updatingDisplayName: false,
    updatingTeamName: false
};

Profile.propTypes = {
    deletingAccount: PropTypes.bool,
    deleteAccountRequest: PropTypes.func.isRequired,
    // isSignedInWithFacebook: PropTypes.bool,
    // isSignedInWithGoogle: PropTypes.bool,
    // linkProfileToFacebook: PropTypes.func.isRequired,
    // linkProfileToGoogle: PropTypes.func.isRequired,
    photoUrlBeingUpdated: PropTypes.string,
    profile: PropTypes.shape({
        displayName: PropTypes.string,
        email: PropTypes.string,
        photoUrl: PropTypes.string,
        teamName: PropTypes.string
    }),
    styles: PropTypes.objectOf(PropTypes.string),
    updateDisplayNameRequest: PropTypes.func.isRequired,
    updateTeamNameRequest: PropTypes.func.isRequired,
    updatingDisplayName: PropTypes.bool,
    updateProfilePictureRequest: PropTypes.func.isRequired,
    updatingTeamName: PropTypes.bool
};

const mapDispatchToProps = {
    deleteAccountRequest,
    linkProfileToFacebook,
    linkProfileToGoogle,
    updateDisplayNameRequest,
    updateProfilePictureRequest,
    updateTeamNameRequest
};

const mapStateToProps = state => ({
    attemptedEmailToLink: state.profile.attemptedEmailToLink,
    auth: state.firebase.auth,

    deleteAccountError: state.profile.deleteAccountError,
    deleteAccountErrorCode: state.profile.deleteAccountErrorCode,
    deletingAccount: state.profile.deletingAccount,

    isSignedInWithFacebook: selectors.isSignedIn(state, 'facebook.com'),
    isSignedInWithGoogle: selectors.isSignedIn(state, 'google.com'),

    profile: selectors.getProfile(state),
    linkAccountErrorCode: state.profile.linkAccountErrorCode,
    linkAccountErrorMessage: state.profile.linkAccountError,

    photoUrlBeingUpdated: state.profile.photoUrlBeingUpdated,

    updatingDisplayName: state.profile.updatingDisplayName,
    updateDisplayNameError: state.profile.updateDisplayNameError,
    updateDisplayNameErrorCode: state.profile.updateDisplayNameErrorCode,

    updatingTeamName: state.profile.updatingTeamName,
    updateTeamNameError: state.profile.updateTeamNameError,
    updateTeamNameErrorCode: state.profile.updateTeamNameErrorCode
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

export { Profile as ProfileUnconnected };
