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
        props.addNewComment(newComment);
        setNewComment('');
    }, [props.addNewComment, setNewComment]);

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
            {renderCommentsRecursively(props.comments, props.addNewReply)}
        </div>
    );
};

RenderComments.defaultProps = {
    addNewComment: noop,
    addNewReply: noop,
    comments: [],
    styles: defaultStyles
};

RenderComments.propTypes = {
    addNewComment: PropTypes.func,
    addNewReply: PropTypes.func,
    comments: PropTypes.arrayOf(PropTypes.shape({})),
    styles: PropTypes.objectOf(PropTypes.string)
};

export default RenderComments;
