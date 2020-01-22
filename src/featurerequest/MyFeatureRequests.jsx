import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import defaultStyles from './MyFeatureRequests.module.scss';
import FeatureRequest from '../common/featurerequest/FeatureRequest';
import WithCollapsableTwo from '../common/collapsableHOC/WithCollapsableTwo';

const MyFeatureRequests = props => {
    const GraphSection = WithCollapsableTwo(FeatureRequest, props.toggleFeature, 'Feature Request');

    return (
        <div className={props.styles.myRequestsWrapper}>
            {props.featureRequests.map(x => (
                <GraphSection
                    addNewComment={props.addNewComment(x.id)}
                    addNewReply={props.addNewReply(x.id)}
                    details={x}
                    showAuthor
                    id={x.id}
                    isOpen={props.featuresOpen.includes(x.id)}
                />
            ))}
        </div>
    );
};

MyFeatureRequests.defaultProps = {
    addNewComment: noop,
    addNewReply: noop,
    featureRequests: [],
    featuresOpen: [],
    styles: defaultStyles,
    toggleFeature: noop
};

MyFeatureRequests.propTypes = {
    addNewComment: PropTypes.func,
    addNewReply: PropTypes.func,
    featureRequests: PropTypes.arrayOf(PropTypes.shape({
        description: PropTypes.string,
        id: PropTypes.string,
        userId: PropTypes.string
    })),
    featuresOpen: PropTypes.arrayOf(PropTypes.string),
    styles: PropTypes.objectOf(PropTypes.string),
    toggleFeature: PropTypes.func
};

export default MyFeatureRequests;
