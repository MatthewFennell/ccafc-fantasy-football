import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import fp from 'lodash/fp';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import defaultStyles from './DeletePlayer.module.scss';
import Dropdown from '../../common/dropdown/Dropdown';
import {
    fetchTeamsRequest, fetchPlayersForTeamRequest, deletePlayerRequest
} from '../actions';
import StyledButton from '../../common/StyledButton/StyledButton';
import Spinner from '../../common/spinner/Spinner';
import LoadingDiv from '../../common/loadingDiv/LoadingDiv';
import materialStyles from '../../materialStyles';
import * as appConstants from '../../constants';

const DeletePlayer = props => {
    const classes = makeStyles(materialStyles)();
    const isMobile = useMediaQuery(`(max-width:${appConstants.mobileScreenSize}px)`);
    const [playerName, setPlayerName] = useState('');
    const [playerTeam, setPlayerTeam] = useState('');

    useEffect(() => {
        props.fetchTeamsRequest();
        // eslint-disable-next-line
    }, [props.fetchTeamsRequest]);

    const setTeam = useCallback(name => {
        setPlayerTeam(name);
        props.fetchPlayersForTeamRequest(name);
        // eslint-disable-next-line
    }, [props.fetchPlayersForTeamRequest, playerTeam, setPlayerTeam]);

    const playersForActiveTeam = fp.getOr([], playerTeam)(props.teamsWithPlayers);

    const nameToId = name => fp.get('id')(playersForActiveTeam.find(a => a.value === name));

    const deletePlayer = useCallback(() => {
        props.deletePlayerRequest(nameToId(playerName));
        setPlayerName('');
        setPlayerTeam('');
        // eslint-disable-next-line
    }, [playerName, props.deletePlayerRequest, nameToId]);

    return (
        <Paper
            elevation={4}
            className={classNames({
                [classes.paper]: !isMobile,
                [classes.paperMobile]: isMobile
            })}
        >
            <div className={props.styles.deletePlayerHeader}>
                <StyledButton
                    color="primary"
                    onClick={deletePlayer}
                    text="Delete Player"
                    disabled={!playerTeam || !playerName}
                />
            </div>
            <div className={props.styles.deletePlayerForm}>
                <div className={props.styles.deletePlayerDropdowns}>
                    <LoadingDiv
                        isLoading={props.isFetchingTeams}
                        isBorderRadius
                    >
                        <Dropdown
                            value={playerTeam}
                            onChange={setTeam}
                            options={props.allTeams}
                            title="Team"
                            key="Team"
                        />
                    </LoadingDiv>
                    <LoadingDiv
                        isLoading={props.isFetchingPlayersForTeam}
                        isBorderRadius
                    >
                        <Dropdown
                            value={playerName}
                            onChange={setPlayerName}
                            options={playersForActiveTeam}
                            title="Player"
                            key="Player"
                        />
                    </LoadingDiv>
                </div>

            </div>

            <div className={classNames({
                [props.styles.hidden]: !props.deletingPlayer
            })}
            >
                <Spinner color="secondary" />
            </div>
        </Paper>
    );
};

DeletePlayer.defaultProps = {
    allTeams: [],
    isFetchingPlayersForTeam: false,
    isFetchingTeams: false,
    styles: defaultStyles
};

DeletePlayer.propTypes = {
    allTeams: PropTypes.arrayOf(PropTypes.shape({})),
    deletePlayerRequest: PropTypes.func.isRequired,
    deletingPlayer: PropTypes.bool.isRequired,
    fetchTeamsRequest: PropTypes.func.isRequired,
    fetchPlayersForTeamRequest: PropTypes.func.isRequired,
    isFetchingPlayersForTeam: PropTypes.bool,
    isFetchingTeams: PropTypes.bool,
    styles: PropTypes.objectOf(PropTypes.string),
    teamsWithPlayers: PropTypes.objectOf(PropTypes.array).isRequired
};

const mapDispatchToProps = {
    deletePlayerRequest,
    fetchTeamsRequest,
    fetchPlayersForTeamRequest
};

const mapStateToProps = state => ({
    allTeams: state.admin.allTeams,
    deletingPlayer: state.admin.deletingPlayer,
    isFetchingPlayersForTeam: state.admin.isFetchingPlayersForTeam,
    isFetchingTeams: state.admin.isFetchingTeams,
    teamsWithPlayers: state.admin.teamsWithPlayers
});

export default connect(mapStateToProps, mapDispatchToProps)(DeletePlayer);

export { DeletePlayer as DeletePlayerUnconnected };
