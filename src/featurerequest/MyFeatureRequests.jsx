import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import defaultStyles from './MyFeatureRequests.module.scss';
import FeatureRequest from '../common/featurerequest/FeatureRequest';
import WithCollapsable from '../common/collapsableHOC/WithCollapsable';

const MyFeatureRequests = props => {
    const Feature = WithCollapsable(FeatureRequest);
    return (
        <div className={props.styles.allFeatureRequests}>
            {props.featureRequests.map(x => (
                <div className={props.styles.featureWrapper}>
                    <Feature
                        addNewComment={props.addNewComment(x.id)}
                        addNewReply={props.addNewReply(x.id)}
                        deleteComment={props.deleteComment(x.id)}
                        details={x}
                        showAuthor
                        id={x.id}
                        isOpen={props.featuresOpen.includes(x.id)}
                        title={`Feature Request by ${x.displayName}`}
                        toggle={props.toggleFeature}
                        loggedInUserId={props.loggedInUserId}
                    />
                </div>
            ))}
        </div>
    );
};

MyFeatureRequests.defaultProps = {
    addNewComment: noop,
    addNewReply: noop,
    deleteComment: noop,
    featureRequests: [],
    featuresOpen: [],
    styles: defaultStyles,
    toggleFeature: noop,
    loggedInUserId: ''
};

MyFeatureRequests.propTypes = {
    addNewComment: PropTypes.func,
    addNewReply: PropTypes.func,
    deleteComment: PropTypes.func,
    featureRequests: PropTypes.arrayOf(PropTypes.shape({
        description: PropTypes.string,
        id: PropTypes.string,
        userId: PropTypes.string
    })),
    featuresOpen: PropTypes.arrayOf(PropTypes.string),
    styles: PropTypes.objectOf(PropTypes.string),
    toggleFeature: PropTypes.func,
    loggedInUserId: PropTypes.string
};

export default MyFeatureRequests;
