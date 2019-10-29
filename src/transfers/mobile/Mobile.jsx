import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import defaultStyles from './Mobile.module.scss';
import Pitch from '../../common/pitch/Pitch';
import Dropdown from '../../common/dropdown/Dropdown';
import Grid from '../../common/grid/Grid';
import StyledInput from '../../common/StyledInput/StyledInput';
import ErrorModal from '../../common/modal/ErrorModal';
import StyledButton from '../../common/StyledButton/StyledButton';
import * as helpers from '../helpers';
import Table from './Table';
import StyledModal from '../../common/modal/StyledModal';

const Mobile = props => {
    const [sideOpen, setSideOpen] = useState(false);
    return (
        <>
            <SwipeableDrawer
                anchor="right"
                open={props.playerTableOpen}
                onClose={props.closePlayerTable}
                onOpen={() => {}}
            >
                <Table
                    allPlayers={props.allPlayers}
                    addPlayerToCurrentTeamRequest={props.addPlayerToCurrentTeamRequest}
                    closePlayerTable={props.closePlayerTable}
                    fetchingAllPlayers={props.fetchingAllPlayers}
                    teamFilter={props.teamFilter}
                    positionFilter={props.positionFilter}
                    minPriceFilter={props.minPriceFilter}
                    maxPriceFilter={props.maxPriceFilter}
                    sortByFilter={props.sortByFilter}
                    nameFilter={props.nameFilter}
                    setNameFilter={props.setNameFilter}
                    playerToRemove={props.playerToRemove}
                    onTransfersRequest={props.onTransfersRequest}
                    remainingBudget={props.remainingBudget}
                />
            </SwipeableDrawer>
            <div className={props.styles.pitchWrapper}>
                <div className={props.styles.currentTeamWrapper}>
                    <div className={props.styles.transfersHeader}>
                        <div className={props.styles.remainingBudget}>
                            <div className={props.styles.remainingBudgetValue}>
                                {`£${props.remainingBudget} mil`}
                            </div>
                            <div className={props.styles.remainingBudgetText}>
                  Remaining Budget
                            </div>
                        </div>
                    </div>
                    <Pitch
                        additionalInfo={player => `£${player.price} mil`}
                        activeTeam={props.currentTeam}
                        loading={props.fetchingOriginalTeam}
                        onPlayerClick={props.onPlayerClick}
                        renderEmptyPlayers
                    />
                    {/* <div className={props.styles.playersWrapper}>
                    <div className={props.styles.playersHeader}>
                        <div className={props.styles.playersTitle}>
                     Player Selection
                        </div>
                        <div className={props.styles.nameFilter}>
                            <StyledInput label="Name" onChange={props.setNameFilter} value={props.nameFilter} />
                        </div>
                        <div className={props.styles.playerFilters}>

                            <Dropdown activeValue={props.teamFilter} onChange={props.setTeamFilter} options={helpers.generateTeamOptions(props.allTeams)} title="Team" />
                            <Dropdown activeValue={props.positionFilter} onChange={props.setPositionFilter} options={helpers.positions} title="Position" />
                            <Dropdown activeValue={props.minPriceFilter} onChange={props.setMinPriceFilter} options={helpers.numberRange(4, 12, 1)} title="Min Price" />
                            <Dropdown activeValue={props.maxPriceFilter} onChange={props.setMaxPriceFilter} options={helpers.numberRange(4, 12, 1)} title="Max Price" />
                            <Dropdown activeValue={props.sortByFilter} onChange={props.setSortByFilter} options={helpers.sortByOptions} title="Sort By" />
                        </div>
                        <div className={props.styles.buttonsWrapper}>

                            <StyledButton color="primary" onClick={props.updateTeamRequest} text="Save team" />
                            <StyledButton color="primary" onClick={props.undoTransferChanges} text="Undo changes" />
                        </div>
                    </div>
                    <div className={props.styles.playerTableWrapper}>
                        <Grid
                            columns={helpers.columnsWhenSmallScreen(props.sortByFilter)}
                            // gridHeader="Players"
                            loading={props.fetchingAllPlayers}
                            onRowClick={props.addPlayerToCurrentTeamRequest}
                            rows={helpers.filterPlayers(
                                props.allPlayers,
                                props.teamFilter,
                                props.positionFilter,
                                props.minPriceFilter,
                                props.maxPriceFilter,
                                props.sortByFilter,
                                props.nameFilter
                            )}
                            rowsPerPageOptions={[10, 25, 50]}
                        />
                    </div>
                </div> */}

                </div>
            </div>
            <ErrorModal
                closeModal={props.closeTransfersError}
                headerMessage="Transfer Error"
                isOpen={props.transfersError.length > 0}
                errorCode={props.transfersErrorCode}
                errorMessage={props.transfersError}
            />
            <StyledModal
                backdrop
                closeModal={props.closeRemoveModal}
                isOpen={props.removeModalOpen}
                headerMessage="Removing player"
                toggleModal={props.closeRemoveModal}
            >
                <div className={props.styles.modalWrapper}>
                    Select option
                    <div className={props.styles.buttonsWrapper}>
                        <StyledButton
                            color="primary"
                            onClick={props.selectReplacement}
                            text="Select Replacement"
                        />
                        <StyledButton
                            color="primary"
                            onClick={props.removePlayer}
                            text="Remove Player"
                        />
                    </div>
                </div>
            </StyledModal>
            <StyledModal
                backdrop
                closeModal={props.closeRestoreModal}
                isOpen={props.restoreModalOpen}
                headerMessage="Restoring player"
                toggleModal={props.closeRestoreModal}
            >
                <div className={props.styles.modalWrapper}>
                    Select option
                    <div className={props.styles.buttonsWrapper}>
                        <StyledButton
                            color="primary"
                            onClick={props.restorePlayer}
                            text="Restore player"
                        />
                        <StyledButton
                            color="primary"
                            onClick={props.selectReplacement}
                            text="Select Replacement"
                        />
                    </div>
                </div>
            </StyledModal>
        </>
    );
};

Mobile.defaultProps = {
    addPlayerToCurrentTeamRequest: noop,
    allTeams: [],
    allPlayers: [],
    closeTransfersError: noop,
    currentTeam: [],
    fetchingAllPlayers: false,
    fetchingOriginalTeam: false,
    nameFilter: '',
    maxPriceFilter: '',
    minPriceFilter: '',
    onPlayerClick: noop,
    remainingBudget: 0,
    positionFilter: '',
    setMaxPriceFilter: noop,
    setMinPriceFilter: noop,
    setNameFilter: noop,
    setTeamFilter: noop,
    setPositionFilter: noop,
    sortByFilter: '',
    setSortByFilter: noop,
    styles: defaultStyles,
    teamFilter: '',
    transfersError: '',
    transfersErrorCode: '',
    updateTeamRequest: noop,
    undoTransferChanges: noop
};

Mobile.propTypes = {
    addPlayerToCurrentTeamRequest: PropTypes.func,
    allTeams: PropTypes.arrayOf(PropTypes.shape({})),
    allPlayers: PropTypes.arrayOf(PropTypes.shape({})),
    closeTransfersError: PropTypes.func,
    currentTeam: PropTypes.arrayOf(PropTypes.shape({})),
    fetchingAllPlayers: PropTypes.bool,
    fetchingOriginalTeam: PropTypes.bool,
    nameFilter: PropTypes.string,
    maxPriceFilter: PropTypes.string,
    minPriceFilter: PropTypes.string,
    onPlayerClick: PropTypes.func,
    remainingBudget: PropTypes.number,
    positionFilter: PropTypes.string,
    setMaxPriceFilter: PropTypes.func,
    setMinPriceFilter: PropTypes.func,
    setNameFilter: PropTypes.func,
    setPositionFilter: PropTypes.func,
    setTeamFilter: PropTypes.func,
    setSortByFilter: PropTypes.func,
    sortByFilter: PropTypes.string,
    styles: PropTypes.objectOf(PropTypes.string),
    teamFilter: PropTypes.string,
    transfersError: PropTypes.string,
    transfersErrorCode: PropTypes.string,
    undoTransferChanges: PropTypes.func,
    updateTeamRequest: PropTypes.func
};

export default Mobile;
