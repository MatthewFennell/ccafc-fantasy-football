import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import defaultStyles from './MyFeatureRequests.module.scss';
import FeatureRequest from '../common/featurerequest/FeatureRequest';
import WithCollapsable from '../common/collapsableHOC/WithCollapsable';
import RadioButton from '../common/radio/RadioButton';
import * as helpers from './helpers';
import StyledButton from '../common/StyledButton/StyledButton';
import TextInput from '../common/TextInput/TextInput';
import * as textInputConstants from '../common/TextInput/constants';

const MyFeatureRequests = props => {
    const [filterBy, setFilterBy] = useState('allTime');
    const [sortBy, setSortBy] = useState('newestFirst');
    const [searchFilter, setSearchFilter] = useState('');

    const generateFilteredFeatures = useCallback(() => helpers
        .sortVideos(filterBy, sortBy, props.featureRequests, searchFilter),
    [filterBy, sortBy, searchFilter, props.featureRequests]);

    const Feature = WithCollapsable(FeatureRequest);

    return (
        <div className={props.styles.allFeatureRequests}>
            <div className={props.styles.featureRequestHeader}>
                <div className={props.styles.infoWrapper}>
                    <div className={props.styles.featureRequestMessage}>
                    Feature Requests
                    </div>
                    <div className={props.styles.openSubmitVideo}>
                        <StyledButton
                            onClick={() => props.setSubmitFeatureRequestOpen(true)}
                            text="Submit a Feature"
                            color="primary"
                        />
                    </div>
                    <div className={props.styles.searchFilter}>
                        <TextInput
                            label="Search features by author"
                            onChange={setSearchFilter}
                            value={searchFilter}
                            icon={textInputConstants.textInputIcons.user}
                        />
                    </div>
                </div>
                <div className={props.styles.sortByWrapper}>
                    <div>
                        <RadioButton
                            radioLabel="Filter By Date"
                            onChange={setFilterBy}
                            options={Object.values(helpers.dateFilters).map(x => ({
                                radioLabel: x.label,
                                value: x.id
                            }))}
                            value={filterBy}
                        />
                    </div>
                    <div>
                        <RadioButton
                            radioLabel="Sort By"
                            onChange={setSortBy}
                            options={Object.values(helpers.sortByFilters)
                                .map(x => ({
                                    radioLabel: x.label,
                                    value: x.id
                                }))}
                            value={sortBy}
                        />
                    </div>
                </div>
            </div>
            <div className={props.styles.featuresWrapper}>
                {generateFilteredFeatures().map(x => (
                    <div className={props.styles.featureWrapper} key={x.id}>
                        <Feature
                            addNewComment={props.addNewComment(x.id)}
                            addNewReply={props.addNewReply(x.id)}
                            deleteComment={props.deleteComment(x.id)}
                            deleteReply={props.deleteReply(x.id)}
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
        </div>
    );
};

MyFeatureRequests.defaultProps = {
    addNewComment: noop,
    addNewReply: noop,
    deleteComment: noop,
    deleteReply: noop,
    featureRequests: [],
    featuresOpen: [],
    setSubmitFeatureRequestOpen: noop,
    styles: defaultStyles,
    toggleFeature: noop,
    loggedInUserId: ''
};

MyFeatureRequests.propTypes = {
    addNewComment: PropTypes.func,
    addNewReply: PropTypes.func,
    deleteComment: PropTypes.func,
    deleteReply: PropTypes.func,
    featureRequests: PropTypes.arrayOf(PropTypes.shape({
        description: PropTypes.string,
        id: PropTypes.string,
        userId: PropTypes.string
    })),
    featuresOpen: PropTypes.arrayOf(PropTypes.string),
    setSubmitFeatureRequestOpen: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string),
    toggleFeature: PropTypes.func,
    loggedInUserId: PropTypes.string
};

export default MyFeatureRequests;
