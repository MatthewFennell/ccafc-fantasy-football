import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { noop } from 'lodash';
import defaultStyles from './YouTubeList.module.scss';
import Spinner from '../spinner/Spinner';
import YouTubeItemOpen from './YouTubeItemOpen';
import YouTubeItemClosed from './YouTubeItemClosed';
import FadingCollapsable from '../fadingCollapsable/FadingCollapsable';

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
    <>
        {props.loading ? <div className={props.styles.loadingSpinner}><Spinner color="secondary" /></div>
            : (
                <div className={props.styles.videoListWrapper}>
                    {props.videos.map(x => (
                        <div
                            className={props.styles.videoWrapper}
                            key={x.id}
                        >

                            <FadingCollapsable title={(
                                <YouTubeItemClosed
                                    authId={props.authId}
                                    author={x.displayName}
                                    date={generateTime(x.dateCreated)}
                                    downvoteHighlightRequest={props
                                        .downvoteHighlightRequest}
                                    title={x.title}
                                    upvote={props.upvote}
                                    upvoteHighlightRequest={props.upvoteHighlightRequest}
                                    video={x}
                                    votingPage={props.votingPage}
                                />
                            )}
                            >
                                <YouTubeItemOpen
                                    addNewComment={props.addNewComment(x.id)}
                                    addNewReply={props.addNewReply(x.id)}
                                    approversPage={props.approversPage}
                                    authId={props.authId}
                                    comments={x.comments}
                                    date={generateTime(x.dateCreated)}
                                    dateCreated={x.dateCreated}
                                    deleteComment={props.deleteComment(x.id)}
                                    deleteReply={props.deleteReply(x.id)}
                                    displayName={x.displayName}
                                    downvoteHighlightRequest={props
                                        .downvoteHighlightRequest}
                                    email={x.email}
                                    openConfirm={props.openConfirm}
                                    openReject={props.openReject}
                                    opts={props.opts}
                                    upvote={props.upvote}
                                    upvoteHighlightRequest={props.upvoteHighlightRequest}
                                    video={x}
                                    videoId={x.id}
                                    videoLinkId={x.videoId}
                                    votingPage={props.votingPage}
                                    youTubeTitle={x.title}
                                />
                            </FadingCollapsable>
                        </div>
                    ))}
                </div>
            ) }
    </>

);

YouTubeList.defaultProps = {
    addNewComment: noop,
    addNewReply: noop,
    authId: '',
    approversPage: false,
    deleteComment: noop,
    deleteReply: noop,
    downvoteHighlightRequest: noop,
    loading: false,
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
    loading: PropTypes.bool,
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
