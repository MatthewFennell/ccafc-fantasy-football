import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import defaultStyles from './MyFeatureRequests.module.scss';
import FeatureRequest from '../common/featurerequest/FeatureRequest';

const MyFeatureRequests = props => {
    const y = 5;

    return (
        <div className={props.styles.myRequestsWrapper}>
            {props.featureRequests.map(x => <FeatureRequest details={x} showAuthor />)}
        </div>
    );
};

MyFeatureRequests.defaultProps = {
    featureRequests: [],
    styles: defaultStyles
};

MyFeatureRequests.propTypes = {
    featureRequests: PropTypes.arrayOf(PropTypes.shape({
        description: PropTypes.string,
        id: PropTypes.string,
        userId: PropTypes.string
    })),
    styles: PropTypes.objectOf(PropTypes.string)
};

export default MyFeatureRequests;
