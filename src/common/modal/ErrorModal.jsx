import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import StyledModal from './StyledModal';
import defaultStyles from './ErrorModal.module.scss';

const ErrorModal = props => (
    <StyledModal
        backdrop
        closeModal={props.closeModal}
        error
        isOpen={props.isOpen}
        headerMessage={props.headerMessage}
        toggleModal={props.closeModal}
    >
        <div className={props.styles.modalWrapper}>
            <div>
                {`Code: ${props.errorCode}`}
            </div>
            <div>
                {`Message: ${props.errorMessage}`}
            </div>

        </div>
    </StyledModal>
);

ErrorModal.defaultProps = {
    closeModal: noop,
    errorCode: '',
    errorMessage: '',
    headerMessage: '',
    isOpen: false,
    styles: defaultStyles
};

ErrorModal.propTypes = {
    closeModal: PropTypes.func,
    errorCode: PropTypes.string,
    errorMessage: PropTypes.string,
    headerMessage: PropTypes.string,
    isOpen: PropTypes.bool,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default ErrorModal;
