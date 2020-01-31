import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { noop } from 'lodash';
import defaultStyles from './CreateTeam.module.scss';
import StyledInput from '../../common/StyledInput/StyledInput';
import { closeCreateTeamError, createTeamRequest, closeSuccessMessage } from '../actions';
import StyledButton from '../../common/StyledButton/StyledButton';
import ErrorModal from '../../common/modal/ErrorModal';
import SuccessModal from '../../common/modal/SuccessModal';
import Spinner from '../../common/spinner/Spinner';

const CreateTeam = props => {
    const [teamName, setTeamName] = useState('');

    const createTeam = useCallback(() => {
        props.createTeamRequest(teamName);
        setTeamName('');
        // eslint-disable-next-line
    }, [teamName, props.createTeamRequest]);

    return (
        <>
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

CreateTeam.defaultProps = {
    styles: defaultStyles,
    successMessage: ''
};

CreateTeam.propTypes = {
    closeCreateTeamError: PropTypes.func.isRequired,
    closeSuccessMessage: PropTypes.func.isRequired,
    creatingTeam: PropTypes.bool.isRequired,
    createTeamError: PropTypes.string.isRequired,
    createTeamErrorCode: PropTypes.string.isRequired,
    createTeamRequest: PropTypes.func.isRequired,
    styles: PropTypes.objectOf(PropTypes.string),
    successMessage: PropTypes.string
};

const mapDispatchToProps = {
    closeCreateTeamError,
    closeSuccessMessage,
    createTeamRequest
};

const mapStateToProps = state => ({
    creatingTeam: state.admin.creatingTeam,
    createTeamError: state.admin.createTeamError,
    createTeamErrorCode: state.admin.createTeamErrorCode,
    successMessage: state.admin.successMessage
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTeam);

export { CreateTeam as CreateTeamUnconnected };
