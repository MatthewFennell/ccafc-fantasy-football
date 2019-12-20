import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import defaultStyles from './Mobile.module.scss';
import Pitch from '../../common/pitch/Pitch';
import ErrorModal from '../../common/modal/ErrorModal';
import StyledButton from '../../common/StyledButton/StyledButton';
import Table from './Table';
import StyledModal from '../../common/modal/StyledModal';
import * as constants from '../../constants';

const teamsAreDifferent = (original, current) => {
    const playersInCurrentNotInOriginal = current.filter(c => !original.some(x => x.id === c.id));
    console.log('length', playersInCurrentNotInOriginal.length);
    return playersInCurrentNotInOriginal.length > 0 && current.length === 11;
};

const Mobile = props => (
    <>
        <SwipeableDrawer
            anchor="right"
            open={props.playerTableOpen}
            onClose={props.closePlayerTable}
            onOpen={noop}
        >
            <Table
                activeTeam={props.currentTeam}
                allPlayers={props.allPlayers}
                allTeams={props.allTeams}
                closePlayerTable={props.closePlayerTable}
                fetchingAllPlayers={props.fetchingAllPlayers}
                playerToRemove={props.playerToRemove}
                onTransfersRequest={props.onTransfersRequest}
                remainingBudget={props.remainingBudget}
                positionFilter={props.positionFilter}
                setPositionFilter={props.setPositionFilter}
                setSortBy={props.setSortBy}
                sortBy={props.sortBy}
                stateObj={props.stateObj}
            />
        </SwipeableDrawer>
        <div className={props.styles.pitchWrapper}>
            <div className={props.styles.currentTeamWrapper}>
                <div className={props.styles.transfersHeader}>
                    <div className={props.styles.remainingBudget}>
                        <div className={props.styles.remainingBudgetValue}>
                            {`£${props.remainingBudget} mil`}
                        </div>
                    </div>
                    <div>
                        <StyledButton
                            color="primary"
                            onClick={props.undoTransferChanges}
                            text="Reset"
                        />
                    </div>
                    <div>
                        <StyledButton
                            color="primary"
                            onClick={props.updateTeamRequest}
                            text="Confirm"
                        />
                        {teamsAreDifferent(props.originalTeam, props.currentTeam)
                        && (
                            <div className={props.styles.saveChanges}>
                            Save changes
                            </div>
                        )}
                    </div>
                </div>
                <Pitch
                    additionalInfo={player => `£${player.price} mil`}
                    activeTeam={props.currentTeam}
                    loading={props.fetchingOriginalTeam}
                    maxInPos={{
                        GOALKEEPER: constants.maxPerPosition.GOALKEEPER,
                        DEFENDER: constants.maxPerPosition.DEFENDER,
                        MIDFIELDER: constants.maxPerPosition.MIDFIELDER,
                        ATTACKER: constants.maxPerPosition.ATTACKER
                    }}
                    onPlayerClick={props.onPlayerClick}
                    renderEmptyPlayers
                />
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
            headerMessage={props.playerToRemove.id !== undefined ? 'Replace / Remove Player' : 'Add Player'}
            toggleModal={props.closeRemoveModal}
        >
            <div className={props.styles.modalWrapper}>
                <div className={props.styles.buttonsWrapper}>
                    <StyledButton
                        color="primary"
                        onClick={props.selectReplacement}
                        text={props.playerToRemove.id !== undefined ? 'Select Replacement' : 'Add Player'}
                    />
                    {props.playerToRemove.id !== undefined && (
                        <StyledButton
                            color="primary"
                            onClick={props.removePlayer}
                            text="Remove Player"
                        />
                    )}

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
                <div className={props.styles.buttonsWrapper}>
                    <StyledButton
                        color="primary"
                        onClick={props.selectReplacement}
                        text="Select Replacement"
                    />
                    <StyledButton
                        color="primary"
                        onClick={props.restorePlayer}
                        text="Restore player"
                    />
                </div>
            </div>
        </StyledModal>
    </>
);

Mobile.defaultProps = {
    allPlayers: [],
    allTeams: [],
    closePlayerTable: noop,
    closeRemoveModal: noop,
    closeRestoreModal: noop,
    closeTransfersError: noop,
    currentTeam: [],
    fetchingAllPlayers: false,
    fetchingOriginalTeam: false,
    onTransfersRequest: noop,
    onPlayerClick: noop,
    originalTeam: [],
    remainingBudget: 0,
    playerTableOpen: false,
    playerToRemove: {},
    positionFilter: '',
    removeModalOpen: false,
    restoreModalOpen: false,
    removePlayer: noop,
    restorePlayer: noop,
    setPositionFilter: noop,
    selectReplacement: noop,
    setSortBy: noop,
    sortBy: '',
    styles: defaultStyles,
    transfersError: '',
    transfersErrorCode: '',
    undoTransferChanges: noop,
    updateTeamRequest: noop,
    stateObj: {}
};

Mobile.propTypes = {
    allPlayers: PropTypes.arrayOf(PropTypes.shape({})),
    allTeams: PropTypes.arrayOf(PropTypes.shape({})),
    closePlayerTable: PropTypes.func,
    closeRemoveModal: PropTypes.func,
    closeRestoreModal: PropTypes.func,
    closeTransfersError: PropTypes.func,
    currentTeam: PropTypes.arrayOf(PropTypes.shape({})),
    fetchingAllPlayers: PropTypes.bool,
    fetchingOriginalTeam: PropTypes.bool,
    onTransfersRequest: PropTypes.func,
    onPlayerClick: PropTypes.func,
    originalTeam: PropTypes.arrayOf(PropTypes.shape({})),
    remainingBudget: PropTypes.number,
    playerTableOpen: PropTypes.bool,
    playerToRemove: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            name: PropTypes.string,
            position: PropTypes.string,
            price: PropTypes.number,
            id: PropTypes.string
        })
    ]),
    positionFilter: PropTypes.string,
    removeModalOpen: PropTypes.bool,
    removePlayer: PropTypes.func,
    restorePlayer: PropTypes.func,
    restoreModalOpen: PropTypes.bool,
    selectReplacement: PropTypes.func,
    setPositionFilter: PropTypes.func,
    setSortBy: PropTypes.func,
    sortBy: PropTypes.string,
    styles: PropTypes.objectOf(PropTypes.string),
    transfersError: PropTypes.string,
    transfersErrorCode: PropTypes.string,
    undoTransferChanges: PropTypes.func,
    updateTeamRequest: PropTypes.func,
    stateObj: PropTypes.shape({})
};

export default Mobile;
