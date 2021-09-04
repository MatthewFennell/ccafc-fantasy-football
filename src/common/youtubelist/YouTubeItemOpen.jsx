import { noop } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import Comments from '../comments/Comments';
import LoadingDiv from '../loadingDiv/LoadingDiv';
import StyledButton from '../StyledButton/StyledButton';
import CustomYouTube from '../youtube/YouTube';
import Voting from './Voting';
import defaultStyles from './YouTubeItem.module.scss';

const YouTubeItemOpen = props => {
    const onReady = e => e.target.pauseVideo();
    return (
        <div className={props.styles.openVideoItemWrapper}>
            <div
                className={props.styles.expandedWrapper}
                role="button"
                tabIndex={0}
                onClick={() => props.setIsCollapsableOpen(false)}
            >
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
                        <div className={props.styles.youtubeButton}>
                            <LoadingDiv
                                isLoading={props.isBeingApproved}
                                isFitContent
                                isMargin
                                isBorderRadius
                                onClick={e => e.stopPropagation()}
                            >
                                <StyledButton
                                    text="Approve"
                                    onClick={() => props.openConfirm(props.videoId)}
                                    disabled={props.isBeingApproved || props.isBeingRejected}
                                />
                            </LoadingDiv>
                        </div>
                        <div className={props.styles.youtubeButton}>
                            <LoadingDiv
                                isLoading={props.isBeingRejected}
                                isFitContent
                                isMargin
                                isBorderRadius
                                onClick={e => e.stopPropagation()}
                            >
                                <StyledButton
                                    text="Reject"
                                    onClick={() => props.openReject(props.videoId)}
                                    color="secondary"
                                    disabled={props.isBeingApproved || props.isBeingRejected}
                                />
                            </LoadingDiv>
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
            <div className={props.styles.commentsWrapper}>
                <Comments
                    addNewComment={props.addNewComment}
                    addNewReply={props.addNewReply}
                    comments={props.comments}
                    deleteComment={props.deleteComment}
                    deleteReply={props.deleteReply}
                    loggedInUserId={props.authId}
                    isAddingCommentToItem={props.isAddingCommentToVideo}
                />
            </div>
        </div>
    );
};

YouTubeItemOpen.defaultProps = {
    addNewComment: noop,
    addNewReply: noop,
    approversPage: false,
    authId: '',
    comments: [],
    date: '',
    deleteComment: noop,
    deleteReply: noop,
    displayName: '',
    downvoteHighlightRequest: noop,
    email: '',
    isAddingCommentToVideo: false,
    isBeingApproved: false,
    isBeingRejected: false,
    openConfirm: noop,
    openReject: noop,
    opts: {},
    setIsCollapsableOpen: noop,
    styles: defaultStyles,
    upvote: noop,
    upvoteHighlightRequest: noop,
    video: {},
    videoId: '',
    videoLinkId: '',
    votingPage: false,
    youTubeTitle: ''
};

YouTubeItemOpen.propTypes = {
    addNewComment: PropTypes.func,
    addNewReply: PropTypes.func,
    approversPage: PropTypes.bool,
    authId: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.shape({})),
    date: PropTypes.string,
    deleteComment: PropTypes.func,
    deleteReply: PropTypes.func,
    displayName: PropTypes.string,
    downvoteHighlightRequest: PropTypes.func,
    email: PropTypes.string,
    isAddingCommentToVideo: PropTypes.bool,
    isBeingApproved: PropTypes.bool,
    isBeingRejected: PropTypes.bool,
    openConfirm: PropTypes.func,
    openReject: PropTypes.func,
    opts: PropTypes.shape({}),
    setIsCollapsableOpen: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string),
    upvote: PropTypes.func,
    upvoteHighlightRequest: PropTypes.func,
    video: PropTypes.shape({}),
    videoId: PropTypes.string,
    videoLinkId: PropTypes.string,
    votingPage: PropTypes.bool,
    youTubeTitle: PropTypes.string
};

export default YouTubeItemOpen;
