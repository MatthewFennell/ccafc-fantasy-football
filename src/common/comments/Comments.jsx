import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import FaceIcon from '@material-ui/icons/Face';
import defaultStyles from './Comments.module.scss';
import Comment from './Comment';
import AddReply from './AddReply';

const hasChildren = comment => comment.comments && comment.comments.length;

const RenderComments = props => {
    const [newComment, setNewComment] = useState('');

    const cancelReply = useCallback(() => {
        setNewComment('');
    }, [newComment]);

    const addNewComment = useCallback(() => {
        console.log('adding new comment', newComment);
    }, [newComment]);

    const renderComment = (comment, isTopLevel, submitReply) => {
        if (hasChildren(comment)) {
            return (
                <>
                    <Comment
                        details={comment}
                        isTopLevel={isTopLevel}
                        submitReply={submitReply}
                    />
                    <div className={props.styles.shiftRight}>
                        {comment.comments.map(x => renderComment(x, false))}
                    </div>
                </>
            );
        }
        return (
            <Comment
                details={comment}
                isTopLevel={isTopLevel}
                submitReply={submitReply}
            />
        );
    };

    const renderCommentsRecursively = (comments, submitReply) => comments
        .map(x => renderComment(x, true, submitReply));

    return (
        <div className={props.styles.comments}>
                Comments
            <hr className={props.styles.commentsDivider} />
            <div className={props.styles.addTopLevelComment}>
                <div className={props.styles.addNewCommentWrapper}>
                    <div>
                        <FaceIcon color="secondary" />
                    </div>
                    <div className={props.styles.initialComment}>
                        <AddReply
                            label="Add a new comment..."
                            text={newComment}
                            setText={setNewComment}
                            cancelReply={cancelReply}
                            submitReply={addNewComment}
                            message="Add comment"
                        />
                    </div>
                </div>
            </div>
            {renderCommentsRecursively(props.comments, props.submitReply)}
        </div>
    );
};

RenderComments.defaultProps = {
    comments: [],
    styles: defaultStyles,
    submitReply: noop
};

RenderComments.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.shape({})),
    styles: PropTypes.objectOf(PropTypes.string),
    submitReply: PropTypes.func
};

export default RenderComments;
