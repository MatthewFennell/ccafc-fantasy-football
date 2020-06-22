import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import defaultStyles from './AddReply.module.scss';
import TextInput from '../TextInput/TextInput';
import * as textInputConstants from '../TextInput/constants';
import LoadingDiv from '../loadingDiv/LoadingDiv';

const AddReply = props => {
    const { submitReply, isAddingCommentToItem } = props;

    const [isAddingComment, setIsAddingComment] = useState(false);

    useEffect(() => {
        if (!isAddingCommentToItem) {
            setIsAddingComment(false);
        }
    }, [isAddingCommentToItem]);

    const onSubmitReply = useCallback(() => {
        if (!isAddingCommentToItem && !isAddingComment) {
            setIsAddingComment(true);
            submitReply();
        }
    }, [setIsAddingComment, submitReply, isAddingCommentToItem, isAddingComment]);

    return (
        <div className={props.styles.replyingWrapper}>
            <TextInput
                label={props.label}
                value={props.text}
                onChange={props.setText}
                icon={textInputConstants.textInputIcons.face}
                iconColor="secondary"
            />
            <div className={props.styles.replyOptions}>
                <div
                    className={props.styles.cancelReply}
                    onClick={props.cancelReply}
                    role="button"
                    tabIndex={0}
                >
                    Cancel
                </div>

                <LoadingDiv
                    isLoading={isAddingCommentToItem && isAddingComment}
                    isNoPadding
                >
                    <div
                        className={props.styles.submitReply}
                        onClick={onSubmitReply}
                        role="button"
                        tabIndex={0}
                    >
                        {props.message}
                    </div>
                </LoadingDiv>
            </div>
        </div>
    );
};

AddReply.defaultProps = {
    cancelReply: noop,
    isAddingCommentToItem: false,
    label: '',
    message: '',
    text: '',
    setText: noop,
    styles: defaultStyles,
    submitReply: noop
};

AddReply.propTypes = {
    cancelReply: PropTypes.func,
    isAddingCommentToItem: PropTypes.bool,
    label: PropTypes.string,
    message: PropTypes.string,
    text: PropTypes.string,
    setText: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string),
    submitReply: PropTypes.func
};

export default AddReply;
