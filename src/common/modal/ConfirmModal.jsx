import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import StyledModal from './StyledModal';
import defaultStyles from './ConfirmModal.module.scss';
import StyledButton from '../StyledButton/StyledButton';

const ConfirmModal = props => (
    <StyledModal
        backdrop
        closeModal={props.closeModal}
        isOpen={props.isOpen}
        headerMessage={props.headerMessage}
        toggleModal={props.closeModal}
    >
        <div className={props.styles.modalWrapper}>
            {props.text}
            <div className={props.styles.buttonsWrapper}>
                <StyledButton
                    color="secondary"
                    onClick={props.submit}
                    text="Yes"
                />
                <StyledButton
                    color="primary"
                    onClick={props.cancel}
                    text="No"
                />
            </div>
        </div>
    </StyledModal>
);

ConfirmModal.defaultProps = {
    cancel: noop,
    closeModal: noop,
    headerMessage: '',
    isOpen: false,
    styles: defaultStyles,
    submit: noop,
    text: 'Are you sure?'
};

ConfirmModal.propTypes = {
    cancel: PropTypes.func,
    closeModal: PropTypes.func,
    headerMessage: PropTypes.string,
    isOpen: PropTypes.bool,
    styles: PropTypes.objectOf(PropTypes.string),
    submit: PropTypes.func,
    text: PropTypes.string
};

export default ConfirmModal;
