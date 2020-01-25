import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import moment from 'moment';
import { noop } from 'lodash';
import classNames from 'classnames';
import defaultStyles from './YouTubeList.module.scss';
import Spinner from '../spinner/Spinner';
import YouTubeItemOpen from './YouTubeItemOpen';
import YouTubeItemClosed from './YouTubeItemClosed';

const defaultOpts = {
    height: '390',
    width: ((1 * window.innerWidth) / 3).toString(),
    playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
    }
};

// eslint-disable-next-line no-underscore-dangle
const generateTime = date => moment(new Date(date._seconds * 1000)).startOf('second').fromNow();

const YouTubeList = props => {
    const [videosOpen, setVideosOpen] = useState([]);

    const toggleFeature = useCallback(id => {
        if (!videosOpen.includes(id)) {
            setVideosOpen([...videosOpen, id]);
        } else {
            setVideosOpen(videosOpen.filter(x => x !== id));
        }
    }, [setVideosOpen, videosOpen]);

    return (
        <>
            {props.loading ? <div className={props.styles.loadingSpinner}><Spinner color="secondary" /></div>
                : (
                    <div className={props.styles.videoListWrapper}>
                        {props.videos.map(x => (
                            <div
                                className={classNames({
                                    [props.styles.videoWrapper]: true,
                                    [props.styles.notExpandedVideoWrapper]: videosOpen
                                        .includes(x.id)
                                })}
                                key={x.id}
                            >
                                {videosOpen.includes(x.id) ? (
                                    <>
                                        <div className={props.styles.expandLess}>
                                            <ExpandLessIcon onClick={() => toggleFeature(x.id)} />
                                        </div>
                                        <YouTubeItemOpen
                                            approversPage={props.approversPage}
                                            authId={props.authId}
                                            date={generateTime(x.dateCreated)}
                                            dateCreated={x.dateCreated}
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
                                    </>
                                ) : (
                                    <div className={props.styles.collapsedVideoWrapper}>
                                        <div tabIndex={0} role="button" className={props.styles.expandIcon} onClick={() => toggleFeature(x.id)}>
                                            <ExpandMoreIcon />
                                        </div>
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
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) }
        </>

    );
};

YouTubeList.defaultProps = {
    authId: '',
    approversPage: false,
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
    authId: PropTypes.string,
    approversPage: PropTypes.bool,
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
