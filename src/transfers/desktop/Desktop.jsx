import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import defaultStyles from './Desktop.module.scss';
import Pitch from '../../common/pitch/Pitch';
import ErrorModal from '../../common/modal/ErrorModal';
import StyledButton from '../../common/StyledButton/StyledButton';
import StyledModal from '../../common/modal/StyledModal';
import * as constants from '../../constants';

const teamsAreDifferent = (original, current) => {
    const playersInCurrentNotInOriginal = current.filter(c => !original.some(x => x.id === c.id));
    console.log('length', playersInCurrentNotInOriginal.length);
    return playersInCurrentNotInOriginal.length > 0 && current.length === 11;
};

const Desktop = props => (
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
);

Desktop.defaultProps = {
    currentTeam: [],
    originalTeam: [],
    fetchingOriginalTeam: false,
    onPlayerClick: noop,
    remainingBudget: 0,
    styles: defaultStyles,
    undoTransferChanges: noop,
    updateTeamRequest: noop
};

Desktop.propTypes = {
    currentTeam: PropTypes.arrayOf(PropTypes.shape({})),
    originalTeam: PropTypes.arrayOf(PropTypes.shape({})),
    fetchingOriginalTeam: PropTypes.bool,
    onPlayerClick: PropTypes.func,
    remainingBudget: PropTypes.number,
    styles: PropTypes.objectOf(PropTypes.string),
    undoTransferChanges: PropTypes.func,
    updateTeamRequest: PropTypes.func
};

export default Desktop;
