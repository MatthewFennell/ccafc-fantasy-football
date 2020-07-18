import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import fp from 'lodash/fp';
import { noop } from 'lodash';
import defaultStyles from './DeleteTeam.module.scss';
import Dropdown from '../../common/dropdown/Dropdown';
import {
    fetchTeamsRequest, deleteTeamRequest, closeSuccessMessage
} from '../actions';
import StyledButton from '../../common/StyledButton/StyledButton';
import SuccessModal from '../../common/modal/SuccessModal';
import Spinner from '../../common/spinner/Spinner';
import LoadingDiv from '../../common/loadingDiv/LoadingDiv';

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
                        disabled={!teamName}
                    />
                </div>
                <div className={props.styles.deleteTeamForm}>
                    <div className={props.styles.deleteTeamDropdowns}>
                        <LoadingDiv isLoading={props.isFetchingTeams} isPadding isBorderRadius>
                            <Dropdown
                                value={teamName}
                                onChange={setTeamName}
                                options={props.allTeams}
                                title="Team"
                                key="Team"
                            />
                        </LoadingDiv>
                    </div>

                </div>
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
                isOpen={props.successMessage.length > 0}
                isSuccess
                headerMessage={props.successMessage}
                toggleModal={noop}
            />
        </>
    );
};

DeleteTeam.defaultProps = {
    allTeams: [],
    isFetchingTeams: false,
    successMessage: '',
    styles: defaultStyles
};

DeleteTeam.propTypes = {
    allTeams: PropTypes.arrayOf(PropTypes.shape({})),
    closeSuccessMessage: PropTypes.func.isRequired,
    deleteTeamRequest: PropTypes.func.isRequired,
    deletingTeam: PropTypes.bool.isRequired,
    fetchTeamsRequest: PropTypes.func.isRequired,
    isFetchingTeams: PropTypes.bool,
    successMessage: PropTypes.string,
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapDispatchToProps = {
    closeSuccessMessage,
    deleteTeamRequest,
    fetchTeamsRequest
};

const mapStateToProps = state => ({
    allTeams: state.admin.allTeams,
    deletingTeam: state.admin.deletingTeam,
    isFetchingTeams: state.admin.isFetchingTeams,
    successMessage: state.admin.successMessage
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteTeam);

export { DeleteTeam as DeleteTeamUnconnected };
