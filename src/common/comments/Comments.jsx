import { noop } from 'lodash';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import AddReply from './AddReply';
import Comment from './Comment';
import defaultStyles from './Comments.module.scss';

const hasChildren = comment => comment.comments && comment.comments.length;

const RenderComments = props => {
    const [newComment, setNewComment] = useState('');

    const cancelReply = useCallback(() => {
        setNewComment('');
    }, [setNewComment]);

    const addNewComment = useCallback(() => {
        props.addNewComment(newComment);
        setNewComment('');
        // eslint-disable-next-line
    }, [props.addNewComment, setNewComment, newComment]);

    const renderComment = (comment,
        isTopLevel, submitReply, loggedInUserId, deleteComment, deleteReply, parentId) => {
        if (hasChildren(comment)) {
            return (
                <React.Fragment key={`${comment.id}-${isTopLevel}${comment.date}`}>
                    <Comment
                        deleteComment={deleteComment}
                        deleteReply={deleteReply}
                        details={comment}
                        isAddingCommentToItem={props.isAddingCommentToItem}
                        isTopLevel={isTopLevel}
                        submitReply={submitReply}
                        loggedInUserId={loggedInUserId}
                        key={comment.id}
                    />
                    <div className={props.styles.shiftRight}>
                        {comment.comments.map(x => renderComment(
                            x,
                            false,
                            noop,
                            loggedInUserId,
                            noop,
                            deleteReply,
                            comment.id
                        ))}
                    </div>
                </React.Fragment>
            );
        }
        return (
            <Comment
                deleteComment={deleteComment}
                deleteReply={deleteReply}
                details={comment}
                isAddingCommentToItem={props.isAddingCommentToItem}
                isTopLevel={isTopLevel}
                submitReply={submitReply}
                loggedInUserId={loggedInUserId}
                parentId={parentId}
                key={comment.id}
            />
        );
    };

    const renderCommentsRecursively = (comments, submitReply, loggedInUserId) => comments
        .map(x => renderComment(x, true, submitReply, loggedInUserId, props.deleteComment,
            props.deleteReply, null));

    return (
        <div className={props.styles.comments}>
            Comments
            <hr className={props.styles.commentsDivider} />
            <div className={props.styles.addTopLevelComment}>
                <div className={props.styles.addNewCommentWrapper}>
                    <div className={props.styles.initialComment}>
                        <AddReply
                            cancelReply={cancelReply}
                            isAddingCommentToItem={props.isAddingCommentToItem}
                            label="Add a new comment"
                            message="Add comment"
                            setText={setNewComment}
                            submitReply={addNewComment}
                            text={newComment}
                        />
                    </div>
                </div>
            </div>
            {renderCommentsRecursively(props.comments, props.addNewReply, props.loggedInUserId)}
        </div>
    );
};

RenderComments.defaultProps = {
    addNewComment: noop,
    addNewReply: noop,
    comments: [],
    deleteComment: noop,
    deleteReply: noop,
    isAddingCommentToItem: false,
    styles: defaultStyles,
    loggedInUserId: ''
};

RenderComments.propTypes = {
    addNewComment: PropTypes.func,
    addNewReply: PropTypes.func,
    comments: PropTypes.arrayOf(PropTypes.shape({})),
    deleteComment: PropTypes.func,
    deleteReply: PropTypes.func,
    isAddingCommentToItem: PropTypes.bool,
    styles: PropTypes.objectOf(PropTypes.string),
    loggedInUserId: PropTypes.string
};

export default RenderComments;
