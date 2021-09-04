import { noop } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import Voting from './Voting';
import defaultStyles from './YouTubeItem.module.scss';

const YouTubeItemClosed = props => (
    <div
        className={props.styles.closedVideoItemWrapper}
        onClick={() => props.setIsCollapsableOpen(true)}
        role="button"
        tabIndex={0}
    >
        <div>{`Title: ${props.title}`}</div>
        <div>{`Author: ${props.author}`}</div>
        <div>{`Created ${props.date}`}</div>
        {props.votingPage && (
            <Voting
                authId={props.authId}
                downvoteHighlightRequest={props
                    .downvoteHighlightRequest}
                isBeingVotedOn={props.isBeingVotedOn}
                video={props.video}
                upvote={props.upvote}
                upvoteHighlightRequest={props
                    .upvoteHighlightRequest}
            />
        )}
    </div>
);

YouTubeItemClosed.defaultProps = {
    author: '',
    authId: '',
    date: '',
    downvoteHighlightRequest: noop,
    isBeingVotedOn: false,
    setIsCollapsableOpen: noop,
    styles: defaultStyles,
    upvote: noop,
    upvoteHighlightRequest: noop,
    video: {},
    votingPage: false,
    title: ''
};

YouTubeItemClosed.propTypes = {
    authId: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
    downvoteHighlightRequest: PropTypes.func,
    isBeingVotedOn: PropTypes.bool,
    setIsCollapsableOpen: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string),
    upvote: PropTypes.func,
    upvoteHighlightRequest: PropTypes.func,
    video: PropTypes.shape({}),
    votingPage: PropTypes.bool,
    title: PropTypes.string
};

export default YouTubeItemClosed;
