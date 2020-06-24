import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import defaultStyles from './ConfirmModal.module.scss';
import StyledButton from '../StyledButton/StyledButton';
import WithModal from './WithModal';
import LoadingDiv from '../loadingDiv/LoadingDiv';

const ConfirmModal = props => (
    <>
        <div className={props.styles.modalText}>
            {props.text}
        </div>
        <div className={props.styles.buttonsWrapper}>
            <LoadingDiv isLoading={props.isLoading} isFitContent isBorderRadius isNoPadding>
                <StyledButton
                    color="primary"
                    onClick={props.submit}
                    text="Yes"
                    disabled={props.isButtonsDisabled}
                />
                <StyledButton
                    color="secondary"
                    onClick={props.cancel}
                    text="No"
                    disabled={props.isButtonsDisabled}
                />
            </LoadingDiv>
        </div>
    </>
);

ConfirmModal.defaultProps = {
    cancel: noop,
    isButtonsDisabled: false,
    isLoading: false,
    styles: defaultStyles,
    submit: noop,
    text: 'Are you sure?'
};

ConfirmModal.propTypes = {
    cancel: PropTypes.func,
    isButtonsDisabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    styles: PropTypes.objectOf(PropTypes.string),
    submit: PropTypes.func,
    text: PropTypes.string
};

export default WithModal(ConfirmModal);
