import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import fp from 'lodash/fp';
import defaultStyles from './DeleteTeam.module.scss';
import Dropdown from '../../common/dropdown/Dropdown';
import {
    closeDeleteTeamError, fetchTeamsRequest, fetchPlayersForTeamRequest, deleteTeamRequest
} from '../actions';
import StyledButton from '../../common/StyledButton/StyledButton';
import ErrorModal from '../../common/modal/ErrorModal';
import Spinner from '../../common/spinner/Spinner';

const DeleteTeam = props => {
    const [teamName, setTeamName] = useState('');

    useEffect(() => {
        props.fetchTeamsRequest();
    }, [props.fetchTeamsRequest]);

    const nameToId = name => fp.get('id')(props.allTeams.find(a => a.value === name));

    const deleteTeam = useCallback(() => {
        props.deleteTeamRequest(nameToId(teamName), teamName);
        setTeamName('');
    }, [teamName, props.deleteTeamRequest]);

    return (
        <div className={props.styles.deleteTeamWrapper}>
            <div className={props.styles.deleteTeamHeader}>
                <StyledButton
                    color="primary"
                    onClick={deleteTeam}
                    text="Delete Team"
                />
            </div>
            <div className={props.styles.deleteTeamForm}>
                <div className={props.styles.deleteTeamDropdowns}>
                    <Dropdown activeValue={teamName} onChange={setTeamName} options={props.allTeams} title="Team" key="Team" />
                </div>

            </div>
            <ErrorModal
                closeModal={props.closeDeleteTeamError}
                headerMessage="Delete Team Error"
                isOpen={props.deleteTeamError.length > 0}
                errorCode={props.deleteTeamErrorCode}
                errorMessage={props.deleteTeamError}
            />
            <div className={classNames({
                [props.styles.hidden]: !props.deletingTeam
            })}
            >
                <Spinner color="secondary" />
            </div>
        </div>
    );
};

DeleteTeam.defaultProps = {
    allTeams: [],
    styles: defaultStyles
};

DeleteTeam.propTypes = {
    allTeams: PropTypes.arrayOf(PropTypes.shape({})),
    closeDeleteTeamError: PropTypes.func.isRequired,
    deleteTeamError: PropTypes.string.isRequired,
    deleteTeamErrorCode: PropTypes.string.isRequired,
    deleteTeamRequest: PropTypes.func.isRequired,
    deletingTeam: PropTypes.bool.isRequired,
    fetchTeamsRequest: PropTypes.func.isRequired,
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapDispatchToProps = {
    closeDeleteTeamError,
    deleteTeamRequest,
    fetchTeamsRequest,
    fetchPlayersForTeamRequest
};

const mapStateToProps = state => ({
    allTeams: state.admin.allTeams,
    deleteTeamError: state.admin.deleteTeamError,
    deleteTeamErrorCode: state.admin.deleteTeamErrorCode,
    deletingTeam: state.admin.deletingTeam
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteTeam);
