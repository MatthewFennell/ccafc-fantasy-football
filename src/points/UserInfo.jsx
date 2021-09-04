import EditIcon from '@material-ui/icons/Edit';
import fp from 'lodash/fp';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import LoadingDiv from '../common/loadingDiv/LoadingDiv';
import SuccessModal from '../common/modal/SuccessModal';
import Spinner from '../common/spinner/Spinner';
import StyledButton from '../common/StyledButton/StyledButton';
import TextInput from '../common/TextInput/TextInput';
import defaultStyles from './UserInfo.module.scss';

const getTotalOfStat = (team, stat) => team.reduce((prev, cur) => prev + cur[stat], 0);

const UserInfo = props => {
    const entry = (key, value) => (
        <div className={props.styles.detailWrapper}>
            <div className={props.styles.key}>
                {key}
            </div>
            <div className={props.styles.value}>
                {value}
            </div>
        </div>
    );

    const [isEditingTeamName, setIsEditingTeamName] = useState(false);
    const [newTeamName, setNewTeamName] = useState('');

    const closeEditTeamName = () => setIsEditingTeamName(false);

    const openEditTeamName = () => {
        setNewTeamName(props.loggedInTeamName);
        setIsEditingTeamName(true);
    };

    const onConfirmUpdateTeam = () => {
        props.updateTeamNameRequest(newTeamName);
        setIsEditingTeamName(false);
    };

    return (
        props.fetchingDetails
            ? (
                <div className={props.styles.loadingSpinner}>
                    <Spinner color="secondary" />
                </div>
            )
            : (
                <>
                    {entry('User', props.displayName)}
                    <div className={props.styles.detailWrapper}>
                        <div className={props.styles.key}>
                            Team name
                        </div>
                        <div className={props.styles.customValue}>
                            <div className={props.styles.myTeamName}>
                                {props.userBeingViewed === props.loggedInUser
                                    ? props.loggedInTeamName : props.teamName}

                            </div>
                            {props.userBeingViewed === props.loggedInUser
                            && (
                                <div className={props.styles.editIcon}>
                                    <EditIcon
                                        color="primary"
                                        onClick={() => openEditTeamName()}
                                    />
                                </div>
                            ) }
                        </div>
                    </div>
                    {entry('Week points', getTotalOfStat(props.team, 'points'))}
                    <div className={props.styles.spacing} />
                    {entry('# Goals', getTotalOfStat(props.team, 'goals'))}
                    {entry('# Assists', getTotalOfStat(props.team, 'assists'))}
                    <div className={props.styles.spacing} />
                    {props.photoUrl && (
                        <div className={props.styles.photoWrapper}>
                            <img
                                className={props.styles.photo}
                                src={props.photoUrl}
                                alt="Error loading"
                            />
                        </div>
                    )}
                    <SuccessModal
                        backdrop
                        closeModal={closeEditTeamName}
                        error
                        isOpen={isEditingTeamName || props.updatingTeamName}
                        headerMessage="Edit Team name"
                    >
                        <TextInput
                            label="Team Name"
                            onChange={setNewTeamName}
                            value={newTeamName}
                            onSubmit={onConfirmUpdateTeam}
                        />
                        <div className={props.styles.modalButtons}>
                            <LoadingDiv isLoading={props.updatingTeamName} isFitContent>
                                <StyledButton
                                    text="Confirm"
                                    onClick={onConfirmUpdateTeam}
                                    disabled={props.updatingTeamName}
                                />
                                <StyledButton
                                    text="Cancel"
                                    color="secondary"
                                    onClick={closeEditTeamName}
                                    disabled={props.updatingTeamName}
                                />
                            </LoadingDiv>
                        </div>
                    </SuccessModal>
                </>
            )
    );
};

UserInfo.defaultProps = {
    displayName: '',
    loggedInUser: '',
    loggedInTeamName: '',
    fetchingDetails: false,
    photoUrl: '',
    userBeingViewed: '',
    updateTeamNameRequest: fp.noop,
    teamName: '',
    updatingTeamName: false,
    styles: defaultStyles,
    team: []
};

UserInfo.propTypes = {
    displayName: PropTypes.string,
    fetchingDetails: PropTypes.bool,
    loggedInUser: PropTypes.string,
    loggedInTeamName: PropTypes.string,
    userBeingViewed: PropTypes.string,
    photoUrl: PropTypes.string,
    teamName: PropTypes.string,
    updatingTeamName: PropTypes.bool,
    updateTeamNameRequest: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string),
    team: PropTypes.arrayOf(PropTypes.shape({
        points: PropTypes.number
    }))
};

export default UserInfo;
