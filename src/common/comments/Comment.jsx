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

    const {
        date, displayName, message, id, userId
    } = props.details;

    const cancelReply = useCallback(() => {
        setReplyText('');
        setReplyOpen(false);
    }, [setReplyOpen, setReplyText]);

    const submitReply = useCallback(() => {
        props.submitReply(replyText, id);
        setReplyText('');
        // eslint-disable-next-line
    }, [setReplyText, props.details, replyText, id]);

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
                        date={date}
                        displayName={displayName}
                        message={message}
                        isTopLevel={props.isTopLevel}
                        setReplyOpen={openReply}
                        loggedInUserId={props.loggedInUserId}
                        userId={userId}
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
    submitReply: noop,
    loggedInUserId: ''
};

Comment.propTypes = {
    details: PropTypes.shape({
        date: PropTypes.string,
        displayName: PropTypes.string,
        id: PropTypes.string,
        message: PropTypes.string
    }),
    isTopLevel: PropTypes.bool,
    styles: PropTypes.objectOf(PropTypes.string),
    submitReply: PropTypes.func,
    loggedInUserId: PropTypes.string
};

export default Comment;
