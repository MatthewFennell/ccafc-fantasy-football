import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import FaceIcon from '@material-ui/icons/Face';
import defaultStyles from './Comment.module.scss';
import StyledInput from '../StyledInput/StyledInput';

const Comment = props => {
    const [replyOpen, setReplyOpen] = useState(false);
    const [replyText, setReplyText] = useState('');

    const { displayName, message, id } = props.details;

    const cancelReply = useCallback(() => {
        setReplyText('');
        setReplyOpen(false);
    }, [setReplyOpen, setReplyText]);

    const submitReply = useCallback(() => {
        props.submitReply(replyText, id);
    }, [props.details, replyText]);

    return (
        <div className={props.styles.commentWrapper}>
            <div className={props.styles.userInfo}>
                <div className={props.styles.userIcon}>
                    <FaceIcon color="secondary" />
                </div>
                <div className={props.styles.messageWrapper}>
                    <div className={props.styles.metaData}>
                        <div className={props.styles.author}>
                            {displayName}
                        </div>
                        <div className={props.styles.date}>
                    15 days ago
                        </div>

                    </div>
                    <div className={props.styles.commentMessage}>
                        {message}
                    </div>
                    {props.isTopLevel
                    && (
                        <div
                            role="button"
                            tabIndex={0}
                            className={props.styles.reply}
                            onClick={() => setReplyOpen(true)}
                        >
                        Reply
                        </div>
                    ) }
                    {replyOpen && props.isTopLevel && (
                        <div className={props.styles.replyingWrapper}>
                            <StyledInput value={replyText} onChange={setReplyText} />
                            <div className={props.styles.replyOptions}>
                                <div
                                    className={props.styles.cancelReply}
                                    onClick={cancelReply}
                                    role="button"
                                    tabIndex={0}
                                >
                                    Cancel
                                </div>
                                <div
                                    className={props.styles.submitReply}
                                    onClick={submitReply}
                                    role="button"
                                    tabIndex={0}
                                >
                                    Reply
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

Comment.defaultProps = {
    details: {},
    isTopLevel: false,
    styles: defaultStyles,
    submitReply: noop
};

Comment.propTypes = {
    details: PropTypes.shape({
        displayName: PropTypes.string,
        id: PropTypes.string,
        message: PropTypes.string
    }),
    isTopLevel: PropTypes.bool,
    styles: PropTypes.objectOf(PropTypes.string),
    submitReply: PropTypes.func
};

export default Comment;
