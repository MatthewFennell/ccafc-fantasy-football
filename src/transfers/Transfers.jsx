import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Media from 'react-media';
import { fetchUserStatsRequest } from '../overview/actions';
import { fetchActiveTeamRequest } from '../currentteam/actions';
import {
    fetchAllPlayersRequest, fetchAllTeamsRequest, addPlayerToCurrentTeamRequest,
    closeTransfersError, undoTransferChanges, removePlayerFromCurrentTeam,
    updateTeamRequest, restorePlayerRequest, replacePlayerRequest
} from './actions';
import Mobile from './mobile/Mobile';
import { getColumns } from './mobile/helpers';
import Desktop from './desktop/Desktop';

const Transfers = props => {
    useEffect(() => {
        props.fetchUserStatsRequest(props.auth.uid);
        props.fetchActiveTeamRequest(props.auth.uid);
        props.fetchAllPlayersRequest();
        props.fetchAllTeamsRequest();
        // eslint-disable-next-line
    }, [props.fetchUserStatsRequest, props.auth.uid,
        props.fetchActiveTeamRequest, props.fetchAllPlayersRequest, props.fetchAllTeamsRequest]);

    const [removeModalOpen, setRemoveModalOpen] = useState(false);
    const [restoreModalOpen, setRestoreModalOpen] = useState(false);
    const [playerToRemove, setPlayerToRemove] = useState({});
    const [playerToRestore, setPlayerToRestore] = useState(null);

    const [playerTableOpen, setPlayerTableOpen] = useState(false);
    const [sortBy, setSortBy] = useState('points');
    const [positionFilter, setPositionFilter] = useState('GOALKEEPER');

    const [columnModalOpen, setColumnModalOpen] = useState(false);
    const [nameFilter, setNameFilter] = useState('Asc');
    const [searchByName, setSearchByName] = useState('');
    const [pointsFilter, setPointsFilter] = useState('Desc');
    const [teamFilter, setTeamFilter] = useState('');
    const [goalFilter, setGoalFilter] = useState('Asc');
    const [assistsFilter, setAssistsFilter] = useState('Asc');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(15);
    const [priceFilter, setPriceFilter] = useState('Asc');
    const [previousScoreFilter, setPreviousScoreFilter] = useState('Desc');
    const [myColumns, setMyColumns] = useState(getColumns(() => setColumnModalOpen(true)));

    const stateObj = {
        myColumns,
        setMyColumns,
        columnModalOpen,
        setColumnModalOpen,
        nameFilter,
        setNameFilter,
        searchByName,
        setSearchByName,
        pointsFilter,
        setPointsFilter,
        teamFilter,
        setTeamFilter,
        goalFilter,
        setGoalFilter,
        assistsFilter,
        setAssistsFilter,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        priceFilter,
        setPriceFilter,
        previousScoreFilter,
        setPreviousScoreFilter
    };


    const onPlayerClick = useCallback(player => {
        if (player.inactive) {
            setPlayerToRestore(player);
            setRestoreModalOpen(true);
        } else {
            setPlayerToRemove(player);
            setRemoveModalOpen(true);
        }
    }, []);

    const removePlayer = useCallback(() => {
        props.removePlayerFromCurrentTeam(playerToRemove);
        setRemoveModalOpen(false);
        setPlayerToRemove({});
        // eslint-disable-next-line
    }, [playerToRemove, props.removePlayerFromCurrentTeam]);

    const selectReplacement = useCallback(() => {
        setSortBy('position');
        setPositionFilter(playerToRemove.position || positionFilter);
        setPlayerTableOpen(true);
        setRemoveModalOpen(false);
    }, [setPlayerTableOpen, playerToRemove, positionFilter]);

    const restorePlayer = useCallback(() => {
        props.restorePlayerRequest(playerToRestore.id);
        setRestoreModalOpen(false);
        // eslint-disable-next-line
    }, [props.restorePlayerRequest, playerToRestore]);

    const onTransfersRequest = useCallback(transfer => {
        setRestoreModalOpen(false);
        setPlayerTableOpen(false);
        if (playerToRemove.id) {
            props.replacePlayerRequest(playerToRemove,
                ({ ...transfer, position: transfer.position.toUpperCase() }));
            setPlayerToRemove({});
            setPlayerToRestore({});
        } else {
            props.addPlayerToCurrentTeamRequest(transfer);
        }
        // eslint-disable-next-line
    }, [props.replacePlayerRequest, playerToRemove]);

    const closeRemove = useCallback(() => {
        setRemoveModalOpen(false);
    }, [setRemoveModalOpen]);

    const closeRestore = useCallback(() => {
        setRestoreModalOpen(false);
    }, [setRestoreModalOpen]);

    const closeTable = useCallback(() => {
        setPlayerTableOpen(false);
    }, [setPlayerTableOpen]);

    return (
        <Media queries={{
            mobile: '(max-width: 599px)',
            desktop: '(min-width: 600px)'
        }}
        >
            {matches => (
                <>
                    {matches.mobile && (
                        <Mobile
                            allPlayers={props.allPlayers}
                            allTeams={props.allTeams}
                            closeRemoveModal={closeRemove}
                            closeRestoreModal={closeRestore}
                            closePlayerTable={closeTable}
                            closeTransfersError={props.closeTransfersError}
                            currentTeam={props.currentTeam}
                            fetchingAllPlayers={props.fetchingAllPlayers}
                            fetchingOriginalTeam={props.fetchingOriginalTeam}
                            onPlayerClick={onPlayerClick}
                            onTransfersRequest={onTransfersRequest}
                            originalTeam={props.originalTeam}
                            playerTableOpen={playerTableOpen}
                            playerToRemove={playerToRemove}
                            positionFilter={positionFilter}
                            setPositionFilter={setPositionFilter}
                            remainingBudget={props.remainingBudget}
                            removeModalOpen={removeModalOpen}
                            removePlayer={removePlayer}
                            restorePlayer={restorePlayer}
                            restoreModalOpen={restoreModalOpen}
                            selectReplacement={selectReplacement}
                            setSortBy={setSortBy}
                            sortBy={sortBy}
                            transfersError={props.transfersError}
                            transfersErrorCode={props.transfersErrorCode}
                            undoTransferChanges={props.undoTransferChanges}
                            updateTeamRequest={props.updateTeamRequest}
                            stateObj={stateObj}
                        />
                    )}
                    {matches.desktop && (
                        <Desktop
                            allPlayers={props.allPlayers}
                            allTeams={props.allTeams}
                            currentTeam={props.currentTeam}
                            fetchingOriginalTeam={props.fetchingOriginalTeam}
                            onPlayerClick={onPlayerClick}
                            originalTeam={props.originalTeam}
                            remainingBudget={props.remainingBudget}
                            stateObj={stateObj}
                            undoTransferChanges={props.undoTransferChanges}
                            updateTeamRequest={props.updateTeamRequest}
                        />
                    )}
                </>
            )}
        </Media>
    );

    // return (
    //     <Mobile
    //         allPlayers={props.allPlayers}
    //         allTeams={props.allTeams}
    //         closeRemoveModal={closeRemove}
    //         closeRestoreModal={closeRestore}
    //         closePlayerTable={closeTable}
    //         closeTransfersError={props.closeTransfersError}
    //         currentTeam={props.currentTeam}
    //         fetchingAllPlayers={props.fetchingAllPlayers}
    //         fetchingOriginalTeam={props.fetchingOriginalTeam}
    //         onPlayerClick={onPlayerClick}
    //         onTransfersRequest={onTransfersRequest}
    //         originalTeam={props.originalTeam}
    //         playerTableOpen={playerTableOpen}
    //         playerToRemove={playerToRemove}
    //         positionFilter={positionFilter}
    //         setPositionFilter={setPositionFilter}
    //         remainingBudget={props.remainingBudget}
    //         removeModalOpen={removeModalOpen}
    //         removePlayer={removePlayer}
    //         restorePlayer={restorePlayer}
    //         restoreModalOpen={restoreModalOpen}
    //         selectReplacement={selectReplacement}
    //         setSortBy={setSortBy}
    //         sortBy={sortBy}
    //         transfersError={props.transfersError}
    //         transfersErrorCode={props.transfersErrorCode}
    //         undoTransferChanges={props.undoTransferChanges}
    //         updateTeamRequest={props.updateTeamRequest}
    //         stateObj={stateObj}
    //     />
    // );
};

Transfers.defaultProps = {
    allPlayers: [],
    allTeams: [],
    auth: {},
    currentTeam: [],
    fetchingAllPlayers: false,
    fetchingOriginalTeam: false,
    originalTeam: [],
    remainingBudget: 0,
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
    originalTeam: PropTypes.arrayOf(PropTypes.shape({})),
    remainingBudget: PropTypes.number,
    replacePlayerRequest: PropTypes.func.isRequired,
    removePlayerFromCurrentTeam: PropTypes.func.isRequired,
    restorePlayerRequest: PropTypes.func.isRequired,
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
    originalTeam: state.transfers.originalTeam,
    remainingBudget: state.transfers.remainingBudget,
    transfersError: state.transfers.transfersError,
    transfersErrorCode: state.transfers.transfersErrorCode
});

export default connect(mapStateToProps, mapDispatchToProps)(Transfers);
