import { noop } from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import FadingCollapsable from '../fadingCollapsable/FadingCollapsable';
import YouTubeItemClosed from './YouTubeItemClosed';
import YouTubeItemOpen from './YouTubeItemOpen';
import defaultStyles from './YouTubeList.module.scss';

const defaultOpts = {
    height: '390',
    width: ((1 * window.innerWidth) / 3).toString(),
    playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
    }
};

// eslint-disable-next-line no-underscore-dangle
const generateTime = date => moment(new Date(date._seconds * 1000)).startOf('second').fromNow();

const YouTubeList = props => (
    <div className={props.styles.videoListWrapper}>
        {props.videos.map(video => (
            <div
                className={props.styles.videoWrapper}
                key={video.id}
            >
                <FadingCollapsable
                    title={(
                        <YouTubeItemClosed
                            authId={props.authId}
                            author={video.displayName}
                            date={generateTime(video.dateCreated)}
                            downvoteHighlightRequest={props
                                .downvoteHighlightRequest}
                            isBeingVotedOn={props.highlightBeingVotedOn === video.id}
                            title={video.title}
                            upvote={props.upvote}
                            upvoteHighlightRequest={props.upvoteHighlightRequest}
                            video={video}
                            votingPage={props.votingPage}
                        />
                    )}
                    isBorderRadiusTiny
                >
                    <YouTubeItemOpen
                        addNewComment={props.addNewComment(video.id)}
                        addNewReply={props.addNewReply(video.id)}
                        approversPage={props.approversPage}
                        authId={props.authId}
                        comments={video.comments}
                        date={generateTime(video.dateCreated)}
                        dateCreated={video.dateCreated}
                        deleteComment={props.deleteComment(video.id)}
                        deleteReply={props.deleteReply(video.id)}
                        displayName={video.displayName}
                        downvoteHighlightRequest={props
                            .downvoteHighlightRequest}
                        email={video.email}
                        isAddingCommentToVideo={props.isAddingCommentToVideo}
                        isBeingApproved={props.highlightBeingApproved === video.id}
                        isBeingRejected={props.highlightBeingRejected === video.id}
                        openConfirm={props.openConfirm}
                        openReject={props.openReject}
                        opts={props.opts}
                        upvote={props.upvote}
                        upvoteHighlightRequest={props.upvoteHighlightRequest}
                        video={video}
                        videoId={video.id}
                        videoLinkId={video.videoId}
                        votingPage={props.votingPage}
                        youTubeTitle={video.title}
                    />
                </FadingCollapsable>
            </div>
        ))}
    </div>

);

YouTubeList.defaultProps = {
    addNewComment: noop,
    addNewReply: noop,
    authId: '',
    approversPage: false,
    deleteComment: noop,
    deleteReply: noop,
    downvoteHighlightRequest: noop,
    highlightBeingApproved: '',
    highlightBeingRejected: '',
    highlightBeingVotedOn: '',
    isAddingCommentToVideo: false,
    openConfirm: noop,
    openReject: noop,
    opts: defaultOpts,
    styles: defaultStyles,
    videos: [],
    upvote: noop,
    upvoteHighlightRequest: noop,
    votingPage: false
};

YouTubeList.propTypes = {
    addNewComment: PropTypes.func,
    addNewReply: PropTypes.func,
    authId: PropTypes.string,
    approversPage: PropTypes.bool,
    deleteComment: PropTypes.func,
    deleteReply: PropTypes.func,
    downvoteHighlightRequest: PropTypes.func,
    highlightBeingApproved: PropTypes.string,
    highlightBeingRejected: PropTypes.string,
    highlightBeingVotedOn: PropTypes.string,
    isAddingCommentToVideo: PropTypes.bool,
    openConfirm: PropTypes.func,
    openReject: PropTypes.func,
    opts: PropTypes.shape({

    }),
    styles: PropTypes.objectOf(PropTypes.string),
    upvote: PropTypes.func,
    videos: PropTypes.arrayOf(PropTypes.shape({})),
    upvoteHighlightRequest: PropTypes.func,
    votingPage: PropTypes.bool

};

export default YouTubeList;
