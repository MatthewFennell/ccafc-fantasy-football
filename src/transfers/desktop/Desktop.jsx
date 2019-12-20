import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import defaultStyles from './Desktop.module.scss';
import Pitch from '../../common/pitch/Pitch';
import StyledButton from '../../common/StyledButton/StyledButton';
import * as constants from '../../constants';
import Modals from '../common/Modals';

const teamsAreDifferent = (original, current) => {
    const playersInCurrentNotInOriginal = current.filter(c => !original.some(x => x.id === c.id));
    console.log('length', playersInCurrentNotInOriginal.length);
    return playersInCurrentNotInOriginal.length > 0 && current.length === 11;
};

const Desktop = props => (
    <>
        <div className={props.styles.transfersWrapperDesktop}>
            <div className={props.styles.pitchWrapper}>
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
            <div className={props.styles.tableWrapper}>Table</div>
        </div>
        <Modals
            closeRemoveModal={props.closeRemoveModal}
            closeRestoreModal={props.closeRestoreModal}
            closeTransfersError={props.closeTransfersError}
            playerToRemove={props.playerToRemove}
            removeModalOpen={props.removeModalOpen}
            removePlayer={props.removePlayer}
            restoreModalOpen={props.restoreModalOpen}
            restorePlayer={props.restorePlayer}
            selectReplacement={props.selectReplacement}
            transfersError={props.transfersError}
            transfersErrorCode={props.transfersErrorCode}
        />
    </>
);

Desktop.defaultProps = {
    closeRemoveModal: noop,
    closeRestoreModal: noop,
    closeTransfersError: noop,
    currentTeam: [],
    originalTeam: [],
    fetchingOriginalTeam: false,
    onPlayerClick: noop,
    playerToRemove: {},
    remainingBudget: 0,
    removePlayer: noop,
    removeModalOpen: false,
    restoreModalOpen: false,
    restorePlayer: noop,
    selectReplacement: noop,
    styles: defaultStyles,
    transfersError: '',
    transfersErrorCode: '',
    undoTransferChanges: noop,
    updateTeamRequest: noop
};

Desktop.propTypes = {
    closeRemoveModal: PropTypes.func,
    closeRestoreModal: PropTypes.func,
    closeTransfersError: PropTypes.func,
    currentTeam: PropTypes.arrayOf(PropTypes.shape({})),
    originalTeam: PropTypes.arrayOf(PropTypes.shape({})),
    fetchingOriginalTeam: PropTypes.bool,
    onPlayerClick: PropTypes.func,
    playerToRemove: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            name: PropTypes.string,
            position: PropTypes.string,
            price: PropTypes.number,
            id: PropTypes.string
        })
    ]),
    remainingBudget: PropTypes.number,
    removeModalOpen: PropTypes.bool,
    removePlayer: PropTypes.func,
    restoreModalOpen: PropTypes.bool,
    restorePlayer: PropTypes.func,
    selectReplacement: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string),
    transfersError: PropTypes.objectOf(PropTypes.string),
    transfersErrorCode: PropTypes.objectOf(PropTypes.string),
    undoTransferChanges: PropTypes.func,
    updateTeamRequest: PropTypes.func
};

export default Desktop;
