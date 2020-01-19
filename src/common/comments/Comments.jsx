import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import defaultStyles from './Comments.module.scss';
import Comment from './Comment';

const hasChildren = comment => comment.comments && comment.comments.length;

const RenderComments = props => {
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
