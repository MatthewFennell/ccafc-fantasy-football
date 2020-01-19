import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import defaultStyles from './MyFeatureRequests.module.scss';

const MyFeatureRequests = props => {
    console.log('feature request', props.featureRequests);

    return (
        <div className={props.styles.myRequestsWrapper}>
            {props.featureRequests.map(x => <div> Feature Request </div>)}
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
