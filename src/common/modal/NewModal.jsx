import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import defaultStyles from './NewModal.module.scss';

const getModalStyle = () => ({
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%'
});

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        'box-shadow': '0px 0px 11px 1px rgba(0,0,0,0.3)'
    }
}));

const WithModal = Component => {
    const NormalComponent = props => {
        const classes = useStyles();
        // getModalStyle is not a pure function, we roll the style only on the first render
        const [modalStyle] = useState(getModalStyle);
        const {
            styles, isOpen, closeModal, headerMessage, ...args
        } = props; // Need to not pass down styles

        return (
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={props.isOpen}
                    onClose={props.closeModal}
                >
                    <div style={modalStyle} className={classes.paper}>
                        <div className={props.styles.modalContextWrapper}>
                            <div className={props.styles.closeModalIcon}>
                                <CloseIcon onClick={props.closeModal} />
                            </div>
                            <div className={props.styles.headerWrapper}>
                                {props.headerMessage}
                            </div>
                            <Component {...args} />
                        </div>
                    </div>
                </Modal>
            </div>
        );
    };

    NormalComponent.defaultProps = {
        cancel: noop,
        closeModal: noop,
        headerMessage: '',
        isOpen: false,
        styles: defaultStyles,
        submit: noop
    };

    NormalComponent.propTypes = {
        cancel: PropTypes.func,
        closeModal: PropTypes.func,
        headerMessage: PropTypes.string,
        isOpen: PropTypes.bool,
        styles: PropTypes.objectOf(PropTypes.string),
        submit: PropTypes.func
    };

    return NormalComponent;
};

export default WithModal;
