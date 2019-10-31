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

const Mobile = props => (
    <>
        <SwipeableDrawer
            anchor="right"
            open={!props.playerTableOpen}
            onClose={props.closePlayerTable}
            onOpen={() => {}}
        >
            <Table
                allPlayers={props.allPlayers}
                allTeams={props.allTeams}
                addPlayerToCurrentTeamRequest={props.addPlayerToCurrentTeamRequest}
                closePlayerTable={props.closePlayerTable}
                fetchingAllPlayers={props.fetchingAllPlayers}
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

Mobile.defaultProps = {
    addPlayerToCurrentTeamRequest: noop,
    allPlayers: [],
    allTeams: [],
    closePlayerTable: noop,
    closeRemoveModal: noop,
    closeRestoreModal: noop,
    closeTransfersError: noop,
    currentTeam: [],
    fetchingAllPlayers: false,
    fetchingOriginalTeam: false,
    nameFilter: '',
    onTransfersRequest: noop,
    onPlayerClick: noop,
    remainingBudget: 0,
    playerTableOpen: false,
    playerToRemove: {},
    removeModalOpen: false,
    restoreModalOpen: false,
    removePlayer: noop,
    restorePlayer: noop,
    selectReplacement: noop,
    setNameFilter: noop,
    styles: defaultStyles,
    transfersError: '',
    transfersErrorCode: ''
};

Mobile.propTypes = {
    addPlayerToCurrentTeamRequest: PropTypes.func,
    allPlayers: PropTypes.arrayOf(PropTypes.shape({})),
    allTeams: PropTypes.arrayOf(PropTypes.shape({})),
    closePlayerTable: PropTypes.func,
    closeRemoveModal: PropTypes.func,
    closeRestoreModal: PropTypes.func,
    closeTransfersError: PropTypes.func,
    currentTeam: PropTypes.arrayOf(PropTypes.shape({})),
    fetchingAllPlayers: PropTypes.bool,
    fetchingOriginalTeam: PropTypes.bool,
    nameFilter: PropTypes.string,
    onTransfersRequest: PropTypes.func,
    onPlayerClick: PropTypes.func,
    remainingBudget: PropTypes.number,
    playerTableOpen: PropTypes.bool,
    playerToRemove: PropTypes.shape({}),
    removeModalOpen: PropTypes.bool,
    removePlayer: PropTypes.func,
    restorePlayer: PropTypes.func,
    restoreModalOpen: PropTypes.bool,
    selectReplacement: PropTypes.func,
    setNameFilter: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string),
    transfersError: PropTypes.string,
    transfersErrorCode: PropTypes.string
};

export default Mobile;
