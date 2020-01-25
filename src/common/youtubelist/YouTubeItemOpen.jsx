import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import defaultStyles from './YouTubeItem.module.scss';
import CustomYouTube from '../youtube/YouTube';
import StyledButton from '../StyledButton/StyledButton';
import Voting from './Voting';

const YouTubeIcon = props => {
    const onReady = e => e.target.pauseVideo();
    return (
        <div className={props.styles.openVideoItemWrapper}>
            <div className={props.styles.expandedWrapper}>
                <div className={props.styles.userInfo}>
                    <div className={props.styles.videoTitle}>
                        {`Title: ${props.youTubeTitle}`}
                    </div>
                    <div className={props.styles.email}>
                        {`Author: ${props.displayName}`}
                    </div>
                    <div className={props.styles.email}>
                        {`Email: ${props.email}`}
                    </div>
                    <div className={props.styles.dateCreated}>
                        {`Created: ${props.date}`}
                    </div>
                </div>
                {props.approversPage && (
                    <div className={props.styles.buttonWrapper}>
                        <div>
                            <StyledButton
                                text="Approve"
                                onClick={() => props.openConfirm(props.videoId)}
                            />
                        </div>
                        <div>
                            <StyledButton
                                text="Reject"
                                onClick={() => props.openReject(props.videoId)}
                                color="secondary"
                            />

                        </div>
                    </div>
                ) }
                {props.votingPage && (
                    <Voting
                        authId={props.authId}
                        downvoteHighlightRequest={props
                            .downvoteHighlightRequest}
                        video={props.video}
                        upvote={props.upvote}
                        upvoteHighlightRequest={props
                            .upvoteHighlightRequest}
                    />
                )}
            </div>
            <div className={props.styles.video}>
                <CustomYouTube
                    videoId={props.videoLinkId}
                    opts={props.opts}
                    onReady={onReady}
                />
            </div>
        </div>
    );
};

YouTubeIcon.defaultProps = {
    approversPage: false,
    authId: '',
    date: '',
    displayName: '',
    downvoteHighlightRequest: noop,
    email: '',
    openConfirm: noop,
    openReject: noop,
    opts: {},
    styles: defaultStyles,
    upvote: noop,
    upvoteHighlightRequest: noop,
    video: {},
    videoId: '',
    videoLinkId: '',
    votingPage: false,
    youTubeTitle: ''
};

YouTubeIcon.propTypes = {
    approversPage: PropTypes.bool,
    authId: PropTypes.string,
    date: PropTypes.string,
    displayName: PropTypes.string,
    downvoteHighlightRequest: PropTypes.func,
    email: PropTypes.string,
    openConfirm: PropTypes.func,
    openReject: PropTypes.func,
    opts: PropTypes.shape({}),
    styles: PropTypes.objectOf(PropTypes.string),
    upvote: PropTypes.func,
    upvoteHighlightRequest: PropTypes.func,
    video: PropTypes.shape({}),
    videoId: PropTypes.string,
    videoLinkId: PropTypes.string,
    votingPage: PropTypes.bool,
    youTubeTitle: PropTypes.string
};

export default YouTubeIcon;
