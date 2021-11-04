import { noop } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import LoadingDiv from '../loadingDiv/LoadingDiv';
import StyledButton from '../StyledButton/StyledButton';
import defaultStyles from './ConfirmModal.module.scss';
import WithModal from './WithModal';

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
                    disabled={Boolean(props.isButtonsDisabled || props.isLoading)}
                />
                <StyledButton
                    color="secondary"
                    onClick={props.cancel}
                    text="No"
                    disabled={Boolean(props.isButtonsDisabled || props.isLoading)}
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
