import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import defaultStyles from './FeatureRequest.module.scss';
import Comments from '../comments/Comments';

const FeatureRequest = props => {
    const {
        comments, description, displayName
    } = props.details;

    return (
        <div className={props.styles.featureRequestWrapper}>
            {props.showAuthor && (
                <div
                    className={props.styles.author}
                    onClick={() => props.setIsCollapsableOpen(false)}
                    role="button"
                    tabIndex={0}
                >
                    <div className={props.styles.key}>
                        Author:
                    </div>
                    <div className={props.styles.value}>
                        {displayName}
                    </div>
                </div>
            )}
            <div
                className={props.styles.featureDescription}
                onClick={() => props.setIsCollapsableOpen(false)}
                role="button"
                tabIndex={0}
            >
                <div className={props.styles.key}>
                    Description:
                </div>
                <div className={props.styles.value}>
                    {description}
                </div>
            </div>
            <div className={props.styles.commentsWrapper}>
                <Comments
                    addNewComment={props.addNewComment}
                    addNewReply={props.addNewReply}
                    comments={comments}
                    deleteComment={props.deleteComment}
                    deleteReply={props.deleteReply}
                    isAddingCommentToItem={props.isAddingCommentToFeature}
                    loggedInUserId={props.loggedInUserId}
                />
            </div>
        </div>
    );
};

FeatureRequest.defaultProps = {
    addNewComment: noop,
    addNewReply: noop,
    deleteComment: noop,
    deleteReply: noop,
    details: {},
    isAddingCommentToFeature: false,
    setIsCollapsableOpen: noop,
    showAuthor: false,
    styles: defaultStyles,
    loggedInUserId: ''
};

FeatureRequest.propTypes = {
    addNewComment: PropTypes.func,
    addNewReply: PropTypes.func,
    deleteComment: PropTypes.func,
    deleteReply: PropTypes.func,
    details: PropTypes.shape({
        comments: PropTypes.arrayOf(PropTypes.shape({
            displayName: PropTypes.string,
            message: PropTypes.string
        })),
        description: PropTypes.string,
        displayName: PropTypes.string,
        id: PropTypes.string,
        userId: PropTypes.string
    }),
    isAddingCommentToFeature: PropTypes.bool,
    setIsCollapsableOpen: PropTypes.func,
    showAuthor: PropTypes.bool,
    styles: PropTypes.objectOf(PropTypes.string),
    loggedInUserId: PropTypes.string
};

export default FeatureRequest;
