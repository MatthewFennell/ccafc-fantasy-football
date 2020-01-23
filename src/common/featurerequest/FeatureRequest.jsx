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
                <div className={props.styles.author}>
                    {`Author: ${displayName}`}
                </div>
            )}
            <div className={props.styles.description}>
                {`Feature description: ${description}`}
            </div>
            <Comments
                addNewComment={props.addNewComment}
                addNewReply={props.addNewReply}
                comments={comments}
            />
        </div>
    );
};

FeatureRequest.defaultProps = {
    addNewComment: noop,
    addNewReply: noop,
    details: {},
    showAuthor: false,
    styles: defaultStyles
};

FeatureRequest.propTypes = {
    addNewComment: PropTypes.func,
    addNewReply: PropTypes.func,
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
    showAuthor: PropTypes.bool,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default FeatureRequest;
