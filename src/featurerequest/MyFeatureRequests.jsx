import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import defaultStyles from './MyFeatureRequests.module.scss';
import FeatureRequest from '../common/featurerequest/FeatureRequest';

const MyFeatureRequests = props => {
    { props.featureRequests.forEach(x => {
        console.log('x', x);
    }); }
    return (
        <div className={props.styles.myRequestsWrapper}>
            {props.featureRequests.map(x => (
                <FeatureRequest
                    addNewComment={props.addNewComment}
                    addNewReply={props.addNewReply}
                    details={x}
                    showAuthor
                />
            ))}
        </div>
    );
};

MyFeatureRequests.defaultProps = {
    addNewComment: noop,
    addNewReply: noop,
    featureRequests: [],
    styles: defaultStyles
};

MyFeatureRequests.propTypes = {
    addNewComment: PropTypes.func,
    addNewReply: PropTypes.func,
    featureRequests: PropTypes.arrayOf(PropTypes.shape({
        description: PropTypes.string,
        id: PropTypes.string,
        userId: PropTypes.string
    })),
    styles: PropTypes.objectOf(PropTypes.string)
};

export default MyFeatureRequests;
