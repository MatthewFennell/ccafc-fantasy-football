import React from 'react';
import {
    MDBContainer, MDBModal, MDBModalBody, MDBModalHeader
} from 'mdbreact';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import defaultStyles from './SuccessModal.module.scss';
import './ModalBackground.css';

const SuccessModal = props => (
    <MDBContainer className={props.styles.modalWrapper}>

        <MDBModal
            position={props.position}
            backdrop={props.backdrop}
            isOpen={props.isOpen}
            toggle={props.toggleModal}
            className={props.styles.modalContent}
        >
            <MDBModalHeader
                className={props.styles.modalHeader}
                toggle={props.closeModal}
            >
                {props.headerMessage}
            </MDBModalHeader>
            <MDBModalBody>
                {props.children}
            </MDBModalBody>
        </MDBModal>
    </MDBContainer>
);

SuccessModal.defaultProps = {
    backdrop: false,
    closeModal: noop,
    headerMessage: '',
    isOpen: false,
    position: '',
    styles: defaultStyles,
    toggleModal: noop
};

SuccessModal.propTypes = {
    backdrop: PropTypes.bool,
    closeModal: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    headerMessage: PropTypes.string,
    isOpen: PropTypes.bool,
    position: PropTypes.string,
    styles: PropTypes.objectOf(PropTypes.string),
    toggleModal: PropTypes.func
};


export default SuccessModal;
