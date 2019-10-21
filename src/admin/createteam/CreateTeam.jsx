import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import defaultStyles from './CreateTeam.module.scss';
import StyledInput from '../../common/StyledInput/StyledInput';
import { closeCreateTeamError, createTeamRequest } from '../actions';
import StyledButton from '../../common/StyledButton/StyledButton';
import ErrorModal from '../../common/modal/ErrorModal';
import Spinner from '../../common/spinner/Spinner';

const CreateTeam = props => {
    const [teamName, setTeamName] = useState('');

    const createTeam = useCallback(() => {
        props.createTeamRequest(teamName);
        setTeamName('');
    }, [teamName]);

    return (
        <div className={props.styles.createTeamWrapper}>
            <div className={props.styles.createTeamHeader}>
                <StyledButton
                    color="primary"
                    onClick={createTeam}
                    text="Create Team"
                />
            </div>
            <div className={props.styles.createTeamForm}>
                <StyledInput label="Team Name" onChange={setTeamName} value={teamName} />
            </div>
            <ErrorModal
                closeModal={props.closeCreateTeamError}
                headerMessage="Create Team Error"
                isOpen={props.createTeamError.length > 0}
                errorCode={props.createTeamErrorCode}
                errorMessage={props.createTeamError}
            />
            <div className={classNames({
                [props.styles.hidden]: !props.creatingTeam
            })}
            >
                <Spinner color="secondary" />
            </div>
        </div>
    );
};

CreateTeam.defaultProps = {
    styles: defaultStyles
};

CreateTeam.propTypes = {
    closeCreateTeamError: PropTypes.func.isRequired,
    creatingTeam: PropTypes.bool.isRequired,
    createTeamError: PropTypes.string.isRequired,
    createTeamErrorCode: PropTypes.string.isRequired,
    createTeamRequest: PropTypes.func.isRequired,
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapDispatchToProps = {
    closeCreateTeamError,
    createTeamRequest
};

const mapStateToProps = state => ({
    creatingTeam: state.admin.creatingTeam,
    createTeamError: state.admin.createTeamError,
    createTeamErrorCode: state.admin.createTeamErrorCode
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTeam);
