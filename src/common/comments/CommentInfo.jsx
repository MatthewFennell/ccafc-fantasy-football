import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import defaultStyles from './CommentInfo.module.scss';

const CommentInfo = props => (
    <>
        <div className={props.styles.metaData}>
            <div className={props.styles.author}>
                {props.displayName}
            </div>
            <div className={props.styles.date}>
                {moment(props.date).fromNow()}
            </div>
            {props.loggedInUserId === props.userId
            && (
                <div
                    className={props.styles.deleteComment}
                    onClick={props.deleteComment}
                    role="button"
                    tabIndex={0}
                >
                    <DeleteIcon fontSize="small" color="primary" />
                </div>
            )}

        </div>
        <div className={props.styles.commentMessage}>
            {props.message}
        </div>
        {props.isTopLevel
            && (
                <div
                    role="button"
                    tabIndex={0}
                    className={props.styles.reply}
                    onClick={props.setReplyOpen}
                >
                Reply
                </div>
            ) }
    </>
);

CommentInfo.defaultProps = {
    date: null,
    deleteComment: noop,
    displayName: '',
    loggedInUserId: '',
    isTopLevel: false,
    message: '',
    setReplyOpen: noop,
    styles: defaultStyles,
    userId: ''
};

CommentInfo.propTypes = {
    date: PropTypes.string,
    deleteComment: PropTypes.func,
    displayName: PropTypes.string,
    loggedInUserId: PropTypes.string,
    isTopLevel: PropTypes.bool,
    message: PropTypes.string,
    setReplyOpen: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string),
    userId: PropTypes.string
};

export default CommentInfo;
