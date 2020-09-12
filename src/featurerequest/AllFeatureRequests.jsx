import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import classNames from 'classnames';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import defaultStyles from './AllFeatureRequests.module.scss';
import FeatureRequest from '../common/featurerequest/FeatureRequest';
import * as helpers from './helpers';
import StyledButton from '../common/StyledButton/StyledButton';
import TextInput from '../common/TextInput/TextInput';
import * as textInputConstants from '../common/TextInput/constants';
import Dropdown from '../common/dropdown/Dropdown';
import FadingCollapsable from '../common/fadingCollapsable/FadingCollapsable';
import LoadingDiv from '../common/loadingDiv/LoadingDiv';
import materialStyles from '../materialStyles';
import * as appConstants from '../constants';

const Title = props => (
    <div
        onClick={() => props.setIsCollapsableOpen(true)}
        className={defaultStyles.featureTitle}
        role="button"
        tabIndex={0}
    >
        {`Feature Request by ${props.displayName}`}
    </div>
);

Title.defaultProps = {
    displayName: '',
    setIsCollapsableOpen: noop
};

Title.propTypes = {
    displayName: PropTypes.string,
    setIsCollapsableOpen: PropTypes.func
};

const AllFeatureRequests = props => {
    const [filterBy, setFilterBy] = useState('allTime');
    const [sortBy, setSortBy] = useState('newestFirst');
    const [searchFilter, setSearchFilter] = useState('');
    const classes = makeStyles(materialStyles)();
    const isMobile = useMediaQuery(`(max-width:${appConstants.mobileScreenSize}px)`);

    const generateFilteredFeatures = useCallback(() => helpers
        .sortVideos(filterBy, sortBy, props.featureRequests, searchFilter),
    [filterBy, sortBy, searchFilter, props.featureRequests]);

    return (
        <div className={props.styles.allFeatureRequests}>
            <Paper
                elevation={4}
                className={classNames({
                    [classes.paper]: !isMobile,
                    [classes.paperMobile]: isMobile
                })}
            >
                <div>
                    <div className={props.styles.infoWrapper}>
                        <div className={props.styles.featureRequestMessage}>
                            Feature Requests
                        </div>
                        <div className={props.styles.openSubmitVideo}>
                            <LoadingDiv
                                isLoading={props.isSubmittingFeature}
                                isFitContent
                                isBorderRadius
                                isRed
                            >
                                <StyledButton
                                    onClick={() => props.setSubmitFeatureRequestOpen(true)}
                                    text="Submit a Feature"
                                    color="primary"
                                    disabled={props.isSubmittingFeature}
                                />
                            </LoadingDiv>
                        </div>
                    </div>
                    <div className={props.styles.reportBugsMessage}>
                        Please also use this to reports bugs
                    </div>
                </div>
                <div>
                    <div className={props.styles.sortByWrapper}>
                        <Dropdown
                            title="Filter By Date"
                            key="Filter By Date"
                            onChange={setFilterBy}
                            options={Object.values(helpers.dateFilters).map(x => ({
                                text: x.label,
                                id: x.id,
                                value: x.id
                            }))}
                            value={filterBy}
                        />
                        <Dropdown
                            title="Sort By"
                            key="Sort By"
                            onChange={setSortBy}
                            options={Object.values(helpers.sortByFilters)
                                .map(x => ({
                                    text: x.label,
                                    id: x.id,
                                    value: x.id
                                }))}
                            value={sortBy}
                        />
                    </div>
                    <div className={props.styles.searchFilter}>
                        <TextInput
                            label="Search features by author"
                            onChange={setSearchFilter}
                            value={searchFilter}
                            icon={textInputConstants.textInputIcons.user}
                            iconColor="primary"
                        />
                    </div>
                </div>
            </Paper>
            <div className={props.styles.featuresWrapper}>
                {generateFilteredFeatures().map(x => (
                    <div className={props.styles.featureWrapper} key={x.id}>
                        <FadingCollapsable
                            isSideMargins
                            isBorderRadiusTiny
                            title={<Title displayName={x.displayName} />}
                        >
                            <FeatureRequest
                                addNewComment={props.addNewComment(x.id)}
                                addNewReply={props.addNewReply(x.id)}
                                deleteComment={props.deleteComment(x.id)}
                                deleteReply={props.deleteReply(x.id)}
                                details={x}
                                isAddingCommentToFeature={props.isAddingCommentToFeature}
                                showAuthor
                                id={x.id}
                                loggedInUserId={props.loggedInUserId}
                            />
                        </FadingCollapsable>
                    </div>
                ))}
            </div>
        </div>
    );
};

AllFeatureRequests.defaultProps = {
    addNewComment: noop,
    addNewReply: noop,
    deleteComment: noop,
    deleteReply: noop,
    featureRequests: [],
    isAddingCommentToFeature: false,
    isSubmittingFeature: false,
    setSubmitFeatureRequestOpen: noop,
    styles: defaultStyles,
    loggedInUserId: ''
};

AllFeatureRequests.propTypes = {
    addNewComment: PropTypes.func,
    addNewReply: PropTypes.func,
    deleteComment: PropTypes.func,
    deleteReply: PropTypes.func,
    featureRequests: PropTypes.arrayOf(PropTypes.shape({
        description: PropTypes.string,
        id: PropTypes.string,
        userId: PropTypes.string
    })),
    isAddingCommentToFeature: PropTypes.bool,
    isSubmittingFeature: PropTypes.bool,
    setSubmitFeatureRequestOpen: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string),
    loggedInUserId: PropTypes.string
};

export default AllFeatureRequests;
