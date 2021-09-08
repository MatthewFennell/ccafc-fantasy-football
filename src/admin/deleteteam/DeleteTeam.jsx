import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import classNames from 'classnames';
import fp from 'lodash/fp';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Dropdown from '../../common/dropdown/Dropdown';
import LoadingDiv from '../../common/loadingDiv/LoadingDiv';
import Spinner from '../../common/spinner/Spinner';
import StyledButton from '../../common/StyledButton/StyledButton';
import * as appConstants from '../../constants';
import materialStyles from '../../materialStyles';
import { deleteTeamRequest, fetchTeamsRequest } from '../actions';
import defaultStyles from './DeleteTeam.module.scss';

const DeleteTeam = props => {
    const classes = makeStyles(materialStyles)();
    const isMobile = useMediaQuery(`(max-width:${appConstants.mobileScreenSize}px)`);
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
        <Paper
            elevation={4}
            className={classNames({
                [classes.paper]: !isMobile,
                [classes.paperMobile]: isMobile
            })}
        >
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
        </Paper>
    );
};

DeleteTeam.defaultProps = {
    allTeams: [],
    isFetchingTeams: false,
    styles: defaultStyles
};

DeleteTeam.propTypes = {
    allTeams: PropTypes.arrayOf(PropTypes.shape({})),
    deleteTeamRequest: PropTypes.func.isRequired,
    deletingTeam: PropTypes.bool.isRequired,
    fetchTeamsRequest: PropTypes.func.isRequired,
    isFetchingTeams: PropTypes.bool,
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapDispatchToProps = {
    deleteTeamRequest,
    fetchTeamsRequest
};

const mapStateToProps = state => ({
    allTeams: state.admin.allTeams,
    deletingTeam: state.admin.deletingTeam,
    isFetchingTeams: state.admin.isFetchingTeams
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteTeam);

export { DeleteTeam as DeleteTeamUnconnected };
