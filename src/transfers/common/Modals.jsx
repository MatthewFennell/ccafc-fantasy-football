import { noop } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import SuccessModal from '../../common/modal/SuccessModal';
import StyledButton from '../../common/StyledButton/StyledButton';
import defaultStyles from './Modals.module.scss';

const Modals = props => (
    <>
        <SuccessModal
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
        </SuccessModal>
        <SuccessModal
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
        </SuccessModal>
    </>
);

Modals.defaultProps = {
    closeRemoveModal: noop,
    closeRestoreModal: noop,
    removeModalOpen: false,
    removePlayer: noop,
    restoreModalOpen: false,
    restorePlayer: noop,
    playerToRemove: {
        id: ''
    },
    selectReplacement: noop,
    styles: defaultStyles
};

Modals.propTypes = {
    closeRemoveModal: PropTypes.func,
    closeRestoreModal: PropTypes.func,
    playerToRemove: PropTypes.shape({
        id: PropTypes.string
    }),
    removeModalOpen: PropTypes.bool,
    removePlayer: PropTypes.func,
    restoreModalOpen: PropTypes.bool,
    restorePlayer: PropTypes.func,
    selectReplacement: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default Modals;
