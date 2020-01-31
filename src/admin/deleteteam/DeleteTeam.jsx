import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import fp from 'lodash/fp';
import { noop } from 'lodash';
import defaultStyles from './DeleteTeam.module.scss';
import Dropdown from '../../common/dropdown/Dropdown';
import {
    closeDeleteTeamError, fetchTeamsRequest, deleteTeamRequest, closeSuccessMessage
} from '../actions';
import StyledButton from '../../common/StyledButton/StyledButton';
import ErrorModal from '../../common/modal/ErrorModal';
import SuccessModal from '../../common/modal/SuccessModal';
import Spinner from '../../common/spinner/Spinner';

const DeleteTeam = props => {
    const [teamName, setTeamName] = useState('');

    useEffect(() => {
        props.fetchTeamsRequest();
        // eslint-disable-next-line
    }, [props.fetchTeamsRequest]);

    const nameToId = name => fp.get('id')(props.allTeams.find(a => a.value === name));

    const deleteTeam = useCallback(() => {
        props.deleteTeamRequest(nameToId(teamName), teamName);
        setTeamName('');
        // eslint-disable-next-line
    }, [teamName, props.deleteTeamRequest, nameToId]);

    return (
        <>
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
            <SuccessModal
                backdrop
                closeModal={props.closeSuccessMessage}
                isOpen={props.successMessage.length}
                headerMessage={props.successMessage}
                toggleModal={noop}
            />
        </>
    );
};

DeleteTeam.defaultProps = {
    allTeams: [],
    successMessage: '',
    styles: defaultStyles
};

DeleteTeam.propTypes = {
    allTeams: PropTypes.arrayOf(PropTypes.shape({})),
    closeDeleteTeamError: PropTypes.func.isRequired,
    closeSuccessMessage: PropTypes.func.isRequired,
    deleteTeamError: PropTypes.string.isRequired,
    deleteTeamErrorCode: PropTypes.string.isRequired,
    deleteTeamRequest: PropTypes.func.isRequired,
    deletingTeam: PropTypes.bool.isRequired,
    fetchTeamsRequest: PropTypes.func.isRequired,
    successMessage: PropTypes.string,
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapDispatchToProps = {
    closeDeleteTeamError,
    closeSuccessMessage,
    deleteTeamRequest,
    fetchTeamsRequest
};

const mapStateToProps = state => ({
    allTeams: state.admin.allTeams,
    deleteTeamError: state.admin.deleteTeamError,
    deleteTeamErrorCode: state.admin.deleteTeamErrorCode,
    deletingTeam: state.admin.deletingTeam,
    successMessage: state.admin.successMessage
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteTeam);

export { DeleteTeam as DeleteTeamUnconnected };
