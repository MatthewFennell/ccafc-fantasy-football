import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import defaultStyles from './Transfers.module.scss';
import { fetchUserStatsRequest } from '../overview/actions';
import { fetchActiveTeamRequest } from '../currentteam/actions';
import {
    fetchAllPlayersRequest, fetchAllTeamsRequest, addPlayerToCurrentTeamRequest,
    closeTransfersError, undoTransferChanges, removePlayerFromCurrentTeam,
    updateTeamRequest
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

    const [teamFilter, setTeamFilter] = useState('');
    const [positionFilter, setPositionFilter] = useState('');
    const [sortByFilter, setSortByFilter] = useState('points');
    const [minPriceFilter, setMinPriceFilter] = useState('');
    const [maxPriceFilter, setMaxPriceFilter] = useState('');
    const [nameFilter, setNameFilter] = useState('');

    const onPlayerClick = useCallback(player => {
        if (player.id === undefined) {
            setPositionFilter(player[0] + player.slice(1).toLowerCase());
        } else if (player.id === null) {
            setPositionFilter(player.position[0] + player.position.slice(1).toLowerCase());
        } else {
            props.removePlayerFromCurrentTeam(player);
        }
    }, [props.currentTeam]);

    return (
        <Mobile
            addPlayerToCurrentTeamRequest={props.addPlayerToCurrentTeamRequest}
            allTeams={props.allTeams}
            allPlayers={props.allPlayers}
            closeTransfersError={props.closeTransfersError}
            currentTeam={props.currentTeam}
            fetchingAllPlayers={props.fetchingAllPlayers}
            fetchingOriginalTeam={props.fetchingOriginalTeam}
            maxPriceFilter={maxPriceFilter}
            minPriceFilter={minPriceFilter}
            nameFilter={nameFilter}
            onPlayerClick={onPlayerClick}
            positionFilter={positionFilter}
            remainingBudget={props.remainingBudget}
            setMaxPriceFilter={setMaxPriceFilter}
            setMinPriceFilter={setMinPriceFilter}
            setNameFilter={setNameFilter}
            setPositionFilter={setPositionFilter}
            setTeamFilter={setTeamFilter}
            setSortByFilter={setSortByFilter}
            sortByFilter={sortByFilter}
            teamFilter={teamFilter}
            transfersError={props.transfersError}
            transfersErrorCode={props.transfersErrorCode}
            undoTransferChanges={props.undoTransferChanges}
            updateTeamRequest={props.updateTeamRequest}
        />
    );
};

Transfers.defaultProps = {
    allPlayers: [],
    allTeams: [],
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
    removePlayerFromCurrentTeam: PropTypes.func.isRequired,
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
    removePlayerFromCurrentTeam,
    undoTransferChanges,
    updateTeamRequest
};

const mapStateToProps = state => ({
    allTeams: state.transfers.allTeams,
    allPlayers: state.transfers.allPlayers,
    auth: state.firebase.auth,
    currentTeam: state.transfers.currentTeam,
    fetchingAllPlayers: state.transfers.fetchingAllPlayers,
    fetchingOriginalTeam: state.transfers.fetchingOriginalTeam,
    remainingBudget: state.transfers.remainingBudget,
    transfersError: state.transfers.transfersError,
    transfersErrorCode: state.transfers.transfersErrorCode
});

export default connect(mapStateToProps, mapDispatchToProps)(Transfers);
