import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import defaultStyles from './Transfers.module.scss';
import { fetchUserStatsRequest } from '../overview/actions';
import { fetchActiveTeamRequest } from '../currentteam/actions';
import {
    fetchAllPlayersRequest, fetchAllTeamsRequest, addPlayerToCurrentTeamRequest,
    closeTransfersError, undoTransferChanges, removePlayerFromCurrentTeam,
    updateTeamRequest, restorePlayerRequest, replacePlayerRequest
} from './actions';
import Mobile from './mobile/Mobile';

const Transfers = props => {
    useEffect(() => {
        props.fetchUserStatsRequest(props.auth.uid);
        props.fetchActiveTeamRequest(props.auth.uid);
        props.fetchAllPlayersRequest();
        props.fetchAllTeamsRequest();
    }, [props.fetchUserStatsRequest, props.auth.uid,
        props.fetchActiveTeamRequest, props.fetchAllPlayersRequest, props.fetchAllTeamsRequest]);

    const [positionFilter, setPositionFilter] = useState('');

    const [removeModalOpen, setRemoveModalOpen] = useState(false);
    const [restoreModalOpen, setRestoreModalOpen] = useState(false);
    const [playerToRemove, setPlayerToRemove] = useState({});
    const [playerToRestore, setPlayerToRestore] = useState(null);

    const [playerTableOpen, setPlayerTableOpen] = useState(false);

    const onPlayerClick = useCallback(player => {
        if (player.id === undefined) {
            setPositionFilter(player[0] + player.slice(1).toLowerCase());
        } else if (player.id === null) {
            setPositionFilter(player.position[0] + player.position.slice(1).toLowerCase());
        } else if (player.inactive) {
            console.log('player', player);
            setPlayerToRestore(player);
            setRestoreModalOpen(true);
        } else {
            setPlayerToRemove(player);
            setRemoveModalOpen(true);
        }
    }, [props.currentTeam]);

    const removePlayer = useCallback(() => {
        props.removePlayerFromCurrentTeam(playerToRemove);
        setRemoveModalOpen(false);
        setPlayerToRemove({});
    }, [playerToRemove, props.removePlayerFromCurrentTeam]);

    const selectReplacement = useCallback(() => {
        setPlayerTableOpen(true);
        setRemoveModalOpen(false);
    }, [playerTableOpen, setPlayerTableOpen]);

    const restorePlayer = useCallback(() => {
        props.restorePlayerRequest(playerToRestore.id);
        setRestoreModalOpen(false);
    }, [props.restorePlayerRequest, playerToRestore]);

    console.log('player to restore', playerToRestore);

    const onTransfersRequest = useCallback(transfer => {
        if (playerToRemove.id) {
            props.replacePlayerRequest(playerToRemove, transfer);
            setPlayerTableOpen(false);
            setPlayerToRemove({});
            setPlayerToRestore({});
        } else {
            console.log('not removing, only adding');
        }
    }, [props.replacePlayerRequest, playerToRemove]);

    return (
        <Mobile
            addPlayerToCurrentTeamRequest={props.addPlayerToCurrentTeamRequest}
            allPlayers={props.allPlayers}
            allTeams={props.allTeams}
            closeRemoveModal={() => setRemoveModalOpen(false)}
            closeRestoreModal={() => setRestoreModalOpen(false)}
            closePlayerTable={() => setPlayerTableOpen(false)}
            closeTransfersError={props.closeTransfersError}
            currentTeam={props.currentTeam}
            fetchingAllPlayers={props.fetchingAllPlayers}
            fetchingOriginalTeam={props.fetchingOriginalTeam}
            onPlayerClick={onPlayerClick}
            onTransfersRequest={onTransfersRequest}
            playerTableOpen={playerTableOpen}
            playerToRemove={playerToRemove}
            remainingBudget={props.remainingBudget}
            removeModalOpen={removeModalOpen}
            removePlayer={removePlayer}
            restorePlayer={restorePlayer}
            restoreModalOpen={restoreModalOpen}
            selectReplacement={selectReplacement}
            transfersError={props.transfersError}
            transfersErrorCode={props.transfersErrorCode}
        />
    );
};

Transfers.defaultProps = {
    allPlayers: [],
    auth: {},
    currentTeam: [],
    fetchingAllPlayers: false,
    fetchingOriginalTeam: false,
    remainingBudget: 0,
    styles: defaultStyles,
    transfersError: '',
    transfersErrorCode: ''
};

Transfers.propTypes = {
    addPlayerToCurrentTeamRequest: PropTypes.func.isRequired,
    allPlayers: PropTypes.arrayOf(PropTypes.shape({})),
    allTeams: PropTypes.arrayOf(PropTypes.shape({})),
    auth: PropTypes.shape({
        uid: PropTypes.string
    }),
    closeTransfersError: PropTypes.func.isRequired,
    currentTeam: PropTypes.arrayOf(PropTypes.shape({})),
    fetchingAllPlayers: PropTypes.bool,
    fetchAllPlayersRequest: PropTypes.func.isRequired,
    fetchActiveTeamRequest: PropTypes.func.isRequired,
    fetchAllTeamsRequest: PropTypes.func.isRequired,
    fetchingOriginalTeam: PropTypes.bool,
    fetchUserStatsRequest: PropTypes.func.isRequired,
    remainingBudget: PropTypes.number,
    replacePlayerRequest: PropTypes.func.isRequired,
    removePlayerFromCurrentTeam: PropTypes.func.isRequired,
    restorePlayerRequest: PropTypes.func.isRequired,
    styles: PropTypes.objectOf(PropTypes.string),
    transfersError: PropTypes.string,
    transfersErrorCode: PropTypes.string,
    undoTransferChanges: PropTypes.func.isRequired,
    updateTeamRequest: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    addPlayerToCurrentTeamRequest,
    closeTransfersError,
    fetchActiveTeamRequest,
    fetchAllPlayersRequest,
    fetchAllTeamsRequest,
    fetchUserStatsRequest,
    replacePlayerRequest,
    restorePlayerRequest,
    removePlayerFromCurrentTeam,
    undoTransferChanges,
    updateTeamRequest
};

const mapStateToProps = state => ({
    allPlayers: state.transfers.allPlayers,
    allTeams: state.transfers.allTeams,
    auth: state.firebase.auth,
    currentTeam: state.transfers.currentTeam,
    fetchingAllPlayers: state.transfers.fetchingAllPlayers,
    fetchingOriginalTeam: state.transfers.fetchingOriginalTeam,
    remainingBudget: state.transfers.remainingBudget,
    transfersError: state.transfers.transfersError,
    transfersErrorCode: state.transfers.transfersErrorCode
});

export default connect(mapStateToProps, mapDispatchToProps)(Transfers);
