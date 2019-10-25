import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import defaultStyles from './Transfers.module.scss';
import { fetchUserStatsRequest } from '../overview/actions';
import { fetchActiveTeamRequest } from '../currentteam/actions';
import { fetchAllPlayersRequest, fetchAllTeamsRequest, addPlayerToCurrentTeamRequest } from './actions';
import Pitch from '../common/pitch/Pitch';
import Dropdown from '../common/dropdown/Dropdown';
import * as helpers from './helpers';
import Grid from '../common/grid/Grid';

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
    const [sortByFilter, setSortByFilter] = useState('');
    const [minPriceFilter, setMinPriceFilter] = useState('');
    const [maxPriceFilter, setMaxPriceFilter] = useState('');

    const onPlayerClick = useCallback(player => {
        console.log('player', player);
    }, [props.currentTeam]);

    return (
        <div className={props.styles.transfers}>
            <div className={props.styles.transfersHeader}>
                <div className={props.styles.remainingBudget}>
                    <div className={props.styles.remainingBudgetValue}>
                        {`£${props.remainingBudget} mil`}
                    </div>
                    <div className={props.styles.remainingBudgetText}>
                        Remaining Budget
                    </div>
                </div>
                <div className={props.styles.remainingTransfers}>
                    <div className={props.styles.remainingTransfersValue}>
                        {props.remainingTransfers}
                    </div>
                    <div className={props.styles.remainingTransfersText}>
                        Remaining Transfers
                    </div>
                </div>

            </div>
            <div className={props.styles.bodyWrapper}>
                <div className={props.styles.pitchWrapper}>
                    <Pitch
                        activeTeam={[]}
                        loading={props.fetchingOriginalTeam}
                        onPlayerClick={onPlayerClick}
                        renderEmptyPlayers
                    />
                </div>
                <div className={props.styles.playersWrapper}>
                    <div className={props.styles.playersHeader}>
                        <div className={props.styles.playersTitle}>
                            Player Selection
                        </div>
                        <div className={props.styles.playerFilters}>
                            <Dropdown activeValue={teamFilter} onChange={setTeamFilter} options={helpers.generateTeamOptions(props.allTeams)} title="Team" />
                            <Dropdown activeValue={positionFilter} onChange={setPositionFilter} options={helpers.positions} title="Position" />
                            <Dropdown activeValue={minPriceFilter} onChange={setMinPriceFilter} options={helpers.numberRange(4, 12, 1)} title="Min Price" />
                            <Dropdown activeValue={maxPriceFilter} onChange={setMaxPriceFilter} options={helpers.numberRange(4, 12, 1)} title="Max Price" />
                            <Dropdown activeValue={sortByFilter} onChange={setSortByFilter} options={helpers.sortByOptions} title="Sort By" />
                        </div>
                    </div>
                    <div className={props.styles.playerTableWrapper}>
                        <Grid
                            columns={helpers.columns}
                            // gridHeader="Players"
                            loading={props.fetchingAllPlayers}
                            onRowClick={props.addPlayerToCurrentTeamRequest}
                            rows={helpers.filterPlayers(
                                props.allPlayers,
                                teamFilter,
                                positionFilter,
                                minPriceFilter,
                                maxPriceFilter,
                                sortByFilter
                            )}
                            rowsPerPageOptions={[10, 25, 50]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

Transfers.defaultProps = {
    allPlayers: [],
    allTeams: [],
    auth: {},
    currentTeam: [],
    fetchingAllPlayers: false,
    fetchingUserStats: false,
    fetchingOriginalTeam: false,
    remainingBudget: 0,
    remainingTransfers: 0,
    styles: defaultStyles
};

Transfers.propTypes = {
    addPlayerToCurrentTeamRequest: PropTypes.func.isRequired,
    allPlayers: PropTypes.arrayOf(PropTypes.shape({})),
    allTeams: PropTypes.arrayOf(PropTypes.shape({})),
    auth: PropTypes.shape({
        uid: PropTypes.string
    }),
    currentTeam: PropTypes.arrayOf(PropTypes.shape({})),
    fetchingAllPlayers: PropTypes.bool,
    fetchAllPlayersRequest: PropTypes.func.isRequired,
    fetchingUserStats: PropTypes.bool,
    fetchActiveTeamRequest: PropTypes.func.isRequired,
    fetchAllTeamsRequest: PropTypes.func.isRequired,
    fetchingOriginalTeam: PropTypes.bool,
    fetchUserStatsRequest: PropTypes.func.isRequired,
    remainingBudget: PropTypes.number,
    remainingTransfers: PropTypes.number,
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapDispatchToProps = {
    addPlayerToCurrentTeamRequest,
    fetchActiveTeamRequest,
    fetchAllPlayersRequest,
    fetchAllTeamsRequest,
    fetchUserStatsRequest
};

const mapStateToProps = state => ({
    allTeams: state.transfers.allTeams,
    allPlayers: state.transfers.allPlayers,
    auth: state.firebase.auth,
    currentTeam: state.transfers.currentTeam,
    fetchingAllPlayers: state.transfers.fetchingAllPlayers,
    fetchingUserStats: state.transfers.fetchingUserStats,
    fetchingOriginalTeam: state.transfers.fetchingOriginalTeam,
    remainingBudget: state.transfers.remainingBudget,
    remainingTransfers: state.transfers.remainingTransfers
});

export default connect(mapStateToProps, mapDispatchToProps)(Transfers);
