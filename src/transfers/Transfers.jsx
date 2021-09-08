import useMediaQuery from '@material-ui/core/useMediaQuery';
import _, { noop } from 'lodash';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import SuccessModal from '../common/modal/SuccessModal';
import * as appConstants from '../constants';
import { fetchActiveTeamRequest } from '../currentteam/actions';
import { fetchFixturesRequest } from '../fixtures/actions';
import { fetchUserStatsRequest } from '../overview/actions';
import {
    addPlayerToCurrentTeamRequest, closeSuccessMessage, fetchAllPlayersRequest,
    fetchAllTeamsRequest, removePlayerFromCurrentTeam, replacePlayerRequest,
    restorePlayerRequest, undoTransferChanges, updateTeamRequest
} from './actions';
import Desktop from './desktop/Desktop';
import { desktopColumns } from './helpers';
import { getColumns } from './mobile/helpers';
import Mobile from './mobile/Mobile';
import defaultStyles from './Transfers.module.scss';

const Transfers = props => {
    useEffect(() => {
        props.fetchUserStatsRequest(props.auth.uid);
        props.fetchActiveTeamRequest(props.auth.uid);
        props.fetchAllPlayersRequest();
        props.fetchAllTeamsRequest();
        props.fetchFixturesRequest();
        // eslint-disable-next-line
    }, [props.fetchUserStatsRequest, props.auth.uid,
        props.fetchActiveTeamRequest, props.fetchAllPlayersRequest,
        props.fetchAllTeamsRequest, fetchFixturesRequest]);

    const [removeModalOpen, setRemoveModalOpen] = useState(false);
    const [restoreModalOpen, setRestoreModalOpen] = useState(false);
    const [playerToRemove, setPlayerToRemove] = useState({});
    const [playerToRestore, setPlayerToRestore] = useState(null);

    const [playerTableOpen, setPlayerTableOpen] = useState(false);
    const [sortBy, setSortBy] = useState('points');
    const [positionFilter, setPositionFilter] = useState('');

    const [columnModalOpen, setColumnModalOpen] = useState(false);
    const [nameFilter, setNameFilter] = useState('Asc');
    const [searchByName, setSearchByName] = useState('');
    const [pointsFilter, setPointsFilter] = useState('Desc');
    const [teamFilter, setTeamFilter] = useState('');
    const [goalFilter, setGoalFilter] = useState('Desc');
    const [assistsFilter, setAssistsFilter] = useState('Desc');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(20000);
    const [priceFilter, setPriceFilter] = useState('Desc');
    const [previousScoreFilter, setPreviousScoreFilter] = useState('Desc');
    const [myColumns, setMyColumns] = useState(getColumns(() => setColumnModalOpen(true)));
    const [isAscendingSort, setIsAscendingSort] = useState(false);

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
        if (!_.isEmpty(playerToRemove)) {
            props.removePlayerFromCurrentTeam(playerToRemove);
        }
        setRemoveModalOpen(false);
        setPlayerToRemove({});
        // eslint-disable-next-line
    }, [playerToRemove, props.removePlayerFromCurrentTeam]);

    const selectReplacement = useCallback(() => {
        const { position, ...rest } = playerToRemove;
        if (!_.isEmpty(rest)) {
            props.removePlayerFromCurrentTeam(playerToRemove);
        }
        setSortBy('position');
        if (!_.isEmpty(playerToRemove)) {
            setPositionFilter(playerToRemove.position || positionFilter);
        } else if (!_.isEmpty(playerToRestore)) {
            setPositionFilter(playerToRestore.position || positionFilter);
        }
        setPlayerTableOpen(true);
        setRemoveModalOpen(false);
        setRestoreModalOpen(false);
        setPlayerToRemove({});
        // eslint-disable-next-line
    }, [setPlayerTableOpen, playerToRemove, positionFilter, playerToRestore]);

    const selectReplacementDesktop = useCallback(() => {
        const { position, ...rest } = playerToRemove;
        if (!_.isEmpty(rest)) {
            props.removePlayerFromCurrentTeam(playerToRemove);
        }
        setSortBy('position');
        if (!_.isEmpty(playerToRemove)) {
            setPositionFilter(playerToRemove.position || positionFilter);
        } else if (!_.isEmpty(playerToRestore)) {
            setPositionFilter(playerToRestore.position || positionFilter);
        }
        setPlayerTableOpen(true);
        setRemoveModalOpen(false);
        setRestoreModalOpen(false);
        setPlayerToRemove({});
        // eslint-disable-next-line
    }, [setPlayerTableOpen, playerToRemove, positionFilter, props.removePlayerFromCurrentTeam, playerToRestore]);

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

    const desktopSortBy = useCallback(sort => {
        if (sortBy === sort) {
            setIsAscendingSort(!isAscendingSort);
        } else {
            setIsAscendingSort(false);
        }
        setSortBy(sort);
    }, [sortBy, isAscendingSort]);

    const isMobile = useMediaQuery(`(max-width:${appConstants.mobileScreenSize}px)`);

    return (
        <>
            {isMobile && (
                <Mobile
                    allPlayers={props.allPlayers}
                    allTeams={props.allTeams}
                    closeRemoveModal={closeRemove}
                    closeRestoreModal={closeRestore}
                    closePlayerTable={closeTable}
                    currentTeam={props.currentTeam}
                    fetchingAllPlayers={props.fetchingAllPlayers}
                    fetchingOriginalTeam={props.fetchingOriginalTeam}
                    fixtures={props.fixtures}
                    loadingFixtures={props.loadingFixtures}
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
                    undoTransferChanges={props.undoTransferChanges}
                    updateTeamRequest={props.updateTeamRequest}
                    stateObj={stateObj}
                />
            )}
            {!isMobile && (
                <Desktop
                    allPlayers={props.allPlayers}
                    allTeams={props.allTeams}
                    closeRemoveModal={closeRemove}
                    closeRestoreModal={closeRestore}
                    currentTeam={props.currentTeam}
                    desktopColumns={desktopColumns(desktopSortBy, sortBy, props.styles)}
                    fetchingAllPlayers={props.fetchingAllPlayers}
                    fetchingOriginalTeam={props.fetchingOriginalTeam}
                    fixtures={props.fixtures}
                    isAscendingSort={isAscendingSort}
                    loadingFixtures={props.loadingFixtures}
                    onPlayerClick={onPlayerClick}
                    onTransfersRequest={onTransfersRequest}
                    originalTeam={props.originalTeam}
                    playerToRemove={playerToRemove}
                    positionFilter={positionFilter}
                    remainingBudget={props.remainingBudget}
                    removeModalOpen={removeModalOpen}
                    removePlayer={removePlayer}
                    restoreModalOpen={restoreModalOpen}
                    restorePlayer={restorePlayer}
                    selectReplacement={selectReplacementDesktop}
                    setPositionFilter={setPositionFilter}
                    sortBy={sortBy}
                    stateObj={stateObj}
                    undoTransferChanges={props.undoTransferChanges}
                    updateTeamRequest={props.updateTeamRequest}
                />
            )}
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

Transfers.defaultProps = {
    allPlayers: [],
    allTeams: [],
    auth: {},
    currentTeam: [],
    fetchingAllPlayers: false,
    fetchingOriginalTeam: false,
    fixtures: [],
    loadingFixtures: false,
    originalTeam: [],
    remainingBudget: 0,
    successMessage: '',
    styles: defaultStyles
};

Transfers.propTypes = {
    addPlayerToCurrentTeamRequest: PropTypes.func.isRequired,
    allPlayers: PropTypes.arrayOf(PropTypes.shape({})),
    allTeams: PropTypes.arrayOf(PropTypes.shape({})),
    auth: PropTypes.shape({
        uid: PropTypes.string
    }),
    closeSuccessMessage: PropTypes.func.isRequired,
    currentTeam: PropTypes.arrayOf(PropTypes.shape({})),
    fetchingAllPlayers: PropTypes.bool,
    fetchAllPlayersRequest: PropTypes.func.isRequired,
    fetchActiveTeamRequest: PropTypes.func.isRequired,
    fetchAllTeamsRequest: PropTypes.func.isRequired,
    fetchingOriginalTeam: PropTypes.bool,
    fixtures: PropTypes.arrayOf(PropTypes.shape({
        teamOne: PropTypes.string,
        result: PropTypes.string,
        teamTwo: PropTypes.string,
        location: PropTypes.string,
        time: PropTypes.string,
        completed: PropTypes.bool,
        league: PropTypes.string
    })),
    fetchUserStatsRequest: PropTypes.func.isRequired,
    fetchFixturesRequest: PropTypes.func.isRequired,
    loadingFixtures: PropTypes.bool,
    originalTeam: PropTypes.arrayOf(PropTypes.shape({})),
    remainingBudget: PropTypes.number,
    replacePlayerRequest: PropTypes.func.isRequired,
    removePlayerFromCurrentTeam: PropTypes.func.isRequired,
    restorePlayerRequest: PropTypes.func.isRequired,
    successMessage: PropTypes.string,
    styles: PropTypes.objectOf(PropTypes.string),
    undoTransferChanges: PropTypes.func.isRequired,
    updateTeamRequest: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    addPlayerToCurrentTeamRequest,
    closeSuccessMessage,
    fetchActiveTeamRequest,
    fetchAllPlayersRequest,
    fetchAllTeamsRequest,
    fetchFixturesRequest,
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
    fixtures: state.fixtures.fixtures,
    loadingFixtures: state.fixtures.loadingFixtures,
    originalTeam: state.transfers.originalTeam,
    remainingBudget: state.transfers.remainingBudget,
    successMessage: state.transfers.successMessage
});

export default connect(mapStateToProps, mapDispatchToProps)(Transfers);

export { Transfers as TransfersUnconnected };
