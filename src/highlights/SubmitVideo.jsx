import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { noop } from 'lodash';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import WithCollapsable from '../common/collapsableHOC/WithCollapsable';
import Grid from '../common/grid/Grid';
import StyledButton from '../common/StyledButton/StyledButton';
import TextInput from '../common/TextInput/TextInput';
import CustomYouTube from '../common/youtube/YouTube';
import { generateTimeSinceNow, generateYouTubeLinkFromId } from '../helperFunctions';
import materialStyles from '../materialStyles';
import mobileCollapsableStyles from './MobileCollapsableStyles.module.scss';
import defaultStyles from './SubmitVideo.module.scss';

const widthForSmallColumns = 600;

const columns = [
    {
        id: 'title',
        label: 'Title',
        align: 'center',
        showOnSmallScreen: true
    },
    {
        id: 'videoLink',
        label: 'Video',
        align: 'center',
        showOnSmallScreen: false
    },
    {
        id: 'dateCreated',
        label: 'Date Created',
        align: 'center',
        showOnSmallScreen: false
    },
    {
        id: 'status',
        label: 'Status',
        align: 'center',
        showOnSmallScreen: true
    },
    {
        id: 'extraInfo',
        label: 'Extra Info',
        align: 'center',
        showOnSmallScreen: false
    }
];

const opts = {
    height: '390',
    playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
    }
};

const SubmitVideo = props => {
    const classes = makeStyles(materialStyles)();
    useEffect(() => {
        if (props.submitVideoOpen) {
            props.fetchUserHighlightsToBeApproved();
            props.fetchRejectedHighlightsRequest();
        }
        // eslint-disable-next-line
    }, [props.fetchUserHighlightsToBeApproved, props.submitVideoOpen]);

    const [video, setVideo] = useState('');
    const [exampleOpen, setExampleOpen] = useState(false);
    const [videoTitle, setVideoTitle] = useState('');

    const CollapsableYouTube = WithCollapsable(CustomYouTube);

    const onReady = e => e.target.pauseVideo();

    const updateId = useCallback(e => {
        setExampleOpen(false);
        setVideo(e);
    }, [setExampleOpen, setVideo]);

    const updateVideoTitle = useCallback(e => {
        setExampleOpen(false);
        setVideoTitle(e);
    }, [setVideoTitle, setExampleOpen]);

    const submitVideo = useCallback(() => {
        if (!videoTitle || !video) {
            return;
        }

        setExampleOpen(false);
        if (videoTitle.length && video.length > 3) {
            props.submitHighlightRequest(video, videoTitle);
        } else if (video.length) {
            props.setErrorMessage('Error submitting highlight', {
                code: 'Invalid title',
                message: 'Title must be at least 4 characters long'
            });
        }
        props.closeSubmitVideo();
        setVideo('');
        setVideoTitle('');
        // eslint-disable-next-line
    }, [video, props.submitHighlightRequest,
        props.setErrorMessage, exampleOpen, setExampleOpen, videoTitle]);

    const generateRows = (approved, waitingApproval, rejected) => approved.map(x => ({
        title: x.title,
        videoLink: generateYouTubeLinkFromId(x.videoId),
        dateCreated: generateTimeSinceNow(x.dateCreated),
        status: <div className={props.styles.approved}>Approved</div>,
        extraInfo: `Votes: ${x.upvotes.length - x.downvotes.length > 0 ? '+' : ''}${x.upvotes.length - x.downvotes.length}`
    })).concat(
        waitingApproval.map(x => ({
            title: x.title,
            videoLink: generateYouTubeLinkFromId(x.videoId),
            dateCreated: generateTimeSinceNow(x.dateCreated),
            status: <div className={props.styles.waiting}>Waiting for Approval</div>,
            extraInfo: ''
        }))
    ).concat(rejected.map(x => ({
        title: x.title,
        videoLink: generateYouTubeLinkFromId(x.videoId),
        dateCreated: generateTimeSinceNow(x.dateCreated),
        status: <div className={props.styles.rejected}>Rejected</div>,
        extraInfo: x.reason
    })));

    const openExample = useCallback(() => {
        if (video && video.length > 0) {
            setExampleOpen(true);
        }
    }, [setExampleOpen, video]);

    return (
        <SwipeableDrawer
            anchor="right"
            open={props.submitVideoOpen}
            onClose={props.closeSubmitVideo}
            onOpen={noop}
        >
            <Paper
                elevation={4}
                className={classes.paper}
            >
                {true && (
                    <div className={props.styles.backIcon}>
                        <ArrowBackIcon
                            onClick={props.closeSubmitVideo}
                            fontSize="large"
                        />
                    </div>
                )}

                <div className={props.styles.addHighlight}>
                    <div className={props.styles.inputWrapper}>
                        <TextInput
                            onChange={updateVideoTitle}
                            value={videoTitle}
                            label="Video Title"
                        />
                        <TextInput
                            onChange={updateId}
                            value={video}
                            label="YouTube Video ID"
                            onBlur={openExample}
                            onSubmit={submitVideo}
                        />
                        <StyledButton
                            onClick={submitVideo}
                            text="Submit Video for Approval"
                            color="primary"
                            disabled={!videoTitle || !video}
                        />
                    </div>
                </div>
                <div className={props.styles.videoIdHint}>
                    e.g. The ID is the section in bold https://www.youtube.com/watch?v=
                    <b>LYMGGgbOz1k</b>
                </div>
            </Paper>
            <CollapsableYouTube
                isOpen={exampleOpen}
                toggle={setExampleOpen}
                title="Check your video ID works"
                videoId={video}
                opts={opts}
                onReady={onReady}
                styles={mobileCollapsableStyles}
            />
            <Paper
                elevation={4}
                className={classes.paper}
            >
                <Grid
                    gridHeader="My Video Requests"
                    loading={props.loadingVideosToBeApproved || props.loadingRejectedVideos}
                    columns={columns.filter(x => (window.innerWidth < widthForSmallColumns
                        ? x.showOnSmallScreen : true))}
                    rows={generateRows(props.myVideos,
                        props.videosToBeApproved, props.videosRejected)}
                    showPagination
                    rowsPerPageOptions={[5, 50, 100]}
                />

            </Paper>
        </SwipeableDrawer>
    );
};

SubmitVideo.defaultProps = {
    closeSubmitVideo: noop,
    fetchRejectedHighlightsRequest: noop,
    fetchUserHighlightsToBeApproved: noop,
    loadingVideosToBeApproved: false,
    loadingRejectedVideos: false,
    myVideos: [],
    setErrorMessage: noop,
    submitHighlightRequest: noop,
    submitVideoOpen: false,
    styles: defaultStyles,
    videosToBeApproved: [],
    videosRejected: []
};

SubmitVideo.propTypes = {
    closeSubmitVideo: PropTypes.func,
    fetchRejectedHighlightsRequest: PropTypes.func,
    fetchUserHighlightsToBeApproved: PropTypes.func,
    loadingVideosToBeApproved: PropTypes.bool,
    loadingRejectedVideos: PropTypes.bool,
    myVideos: PropTypes.arrayOf(PropTypes.shape({})),
    setErrorMessage: PropTypes.func,
    submitHighlightRequest: PropTypes.func,
    submitVideoOpen: PropTypes.bool,
    styles: PropTypes.objectOf(PropTypes.string),
    videosToBeApproved: PropTypes.arrayOf(PropTypes.shape({})),
    videosRejected: PropTypes.arrayOf(PropTypes.shape({}))
};

export default SubmitVideo;
