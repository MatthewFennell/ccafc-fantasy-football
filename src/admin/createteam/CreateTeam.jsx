import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { noop } from 'lodash';
import defaultStyles from './CreateTeam.module.scss';
import {
    createTeamRequest, closeSuccessMessage
} from '../actions';
import StyledButton from '../../common/StyledButton/StyledButton';
import Spinner from '../../common/spinner/Spinner';
import SuccessModal from '../../common/modal/SuccessModal';
import TextInput from '../../common/TextInput/TextInput';

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
                        disabled={!teamName}
                    />
                </div>
                <div className={props.styles.createTeamForm}>
                    <TextInput
                        label="Team Name"
                        onChange={setTeamName}
                        value={teamName}
                    />
                </div>
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
                isOpen={props.successMessage.length > 0}
                isSuccess
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
    closeSuccessMessage: PropTypes.func.isRequired,
    creatingTeam: PropTypes.bool.isRequired,
    createTeamRequest: PropTypes.func.isRequired,
    styles: PropTypes.objectOf(PropTypes.string),
    successMessage: PropTypes.string
};

const mapDispatchToProps = {
    closeSuccessMessage,
    createTeamRequest
};

const mapStateToProps = state => ({
    creatingTeam: state.admin.creatingTeam,
    successMessage: state.admin.successMessage
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTeam);

export { CreateTeam as CreateTeamUnconnected };
