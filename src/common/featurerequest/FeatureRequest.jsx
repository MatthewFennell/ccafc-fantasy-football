import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import defaultStyles from './FeatureRequest.module.scss';
import Comments from '../comments/Comments';

const dummyComments = [
    {
        displayName: 'Bob',
        message: 'This is a comment',
        id: 'abc',
        comments: [
            {
                displayName: 'Michael',
                message: 'First nested comment'
            }
        ]
    },
    {
        displayName: 'Henry',
        message: '2nd comment',
        id: 'bef',
        comments: [
            {
                displayName: 'Fred',
                message: 'nest me oh please'
            },
            {
                displayName: 'Alex',
                message: 'Hope i stay nested'
            }
        ]
    }
];

const FeatureRequest = props => {
    const { description, displayName } = props.details;

    const submitReply = useCallback((message, origin) => {
        console.log(message, origin);
    });

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
            <Comments comments={dummyComments} submitReply={submitReply} />
        </div>
    );
};

FeatureRequest.defaultProps = {
    details: {},
    showAuthor: false,
    styles: defaultStyles
};

FeatureRequest.propTypes = {
    details: PropTypes.shape({
        description: PropTypes.string,
        displayName: PropTypes.string,
        id: PropTypes.string,
        userId: PropTypes.string
    }),
    showAuthor: PropTypes.bool,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default FeatureRequest;
