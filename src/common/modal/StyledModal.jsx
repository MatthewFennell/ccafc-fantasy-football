import React, { useState } from 'react';
import {
    MDBContainer, MDBModal, MDBModalBody, MDBModalHeader
} from 'mdbreact';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import defaultStyles from './StyledModal.module.scss';

import './ModalBackground.css';


const StyledModal = props => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <MDBContainer className={props.styles.modalWrapper}>
            <MDBModal
                position={props.position}
                backdrop={props.backdrop}
                isOpen={props.isOpen}
                toggle={() => setModalOpen(!modalOpen)}
            >
                <MDBModalHeader toggle={props.closeModal} />
                <MDBModalBody>
                    {props.children}
                </MDBModalBody>
            </MDBModal>
        </MDBContainer>
    );
};

StyledModal.defaultProps = {
    backdrop: false,
    closeModal: noop,
    isOpen: false,
    position: '',
    styles: defaultStyles
};

StyledModal.propTypes = {
    backdrop: PropTypes.bool,
    closeModal: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    isOpen: PropTypes.bool,
    position: PropTypes.string,
    styles: PropTypes.objectOf(PropTypes.string)
};


export default StyledModal;
