import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import FaceIcon from '@material-ui/icons/Face';
import defaultStyles from './Comment.module.scss';
import AddReply from './AddReply';
import CommentInfo from './CommentInfo';

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

    const openReply = useCallback(() => {
        setReplyOpen(true);
    }, [setReplyOpen]);

    return (
        <div className={props.styles.commentWrapper}>
            <div className={props.styles.userInfo}>
                <div className={props.styles.userIcon}>
                    <FaceIcon color="secondary" />
                </div>
                <div className={props.styles.messageWrapper}>
                    <CommentInfo
                        displayName={displayName}
                        message={message}
                        isTopLevel={props.isTopLevel}
                        setReplyOpen={openReply}
                    />
                    {replyOpen && props.isTopLevel && (
                        <AddReply
                            cancelReply={cancelReply}
                            message="Add reply"
                            text={replyText}
                            setText={setReplyText}
                            submitReply={submitReply}
                        />
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
