import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import defaultStyles from './SubmitVideo.module.scss';
import StyledInput from '../common/StyledInput/StyledInput';
import StyledButton from '../common/StyledButton/StyledButton';
import CustomYouTube from '../common/youtube/YouTube';
import WithCollapsable from '../common/collapsableHOC/WithCollapsable';

const opts = {
    height: '390',
    // width: '100%',
    playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
    }
};

const SubmitVideo = props => {
    const [video, setVideo] = useState('');
    const [exampleOpen, setExampleOpen] = useState(false);
    const [videoTitle, setVideoTitle] = useState('');

    const CollapsableYouTube = WithCollapsable(CustomYouTube, exampleOpen, setExampleOpen, 'Check your video ID works');

    const onReady = e => e.target.pauseVideo();

    const updateId = useCallback(e => {
        setExampleOpen(false);
        setVideo(e);
    }, [setExampleOpen, exampleOpen, video, setVideo]);

    const updateVideoTitle = useCallback(e => {
        setExampleOpen(false);
        setVideoTitle(e);
    }, [setVideoTitle, videoTitle, exampleOpen, setExampleOpen]);

    const submitVideo = useCallback(() => {
        setExampleOpen(false);
        if (videoTitle.length && video.length > 3) {
            props.submitHighlightRequest(video, videoTitle);
        } else if (video.length) {
            props.submitHighlightError({
                code: 'Invalid title',
                message: 'Title must be at least 4 characters long'
            });
        }
        props.closeSubmitVideo();
        setVideo('');
        setVideoTitle('');
    }, [video, props.submitHighlightRequest,
        props.submitHighlightError, exampleOpen, setExampleOpen, videoTitle]);

    return (
        <SwipeableDrawer
            anchor="right"
            open={props.submitVideoOpen}
            onClose={props.closeSubmitVideo}
            onOpen={noop}
        >
            <div className={props.styles.drawerWrapper}>
                <div className={props.styles.addHighlight}>
                    <div className={props.styles.inputWrapper}>
                        <StyledInput onChange={updateVideoTitle} value={videoTitle} label="Video Title" />
                        <StyledInput onChange={updateId} value={video} label="YouTube Video ID" />
                        <StyledButton onClick={submitVideo} text="Submit Video for Approval" color="primary" />
                    </div>
                </div>
                <CollapsableYouTube
                    videoId={video}
                    opts={opts}
                    onReady={onReady}
                />
            </div>
        </SwipeableDrawer>
    );
};

SubmitVideo.defaultProps = {
    closeSubmitVideo: noop,
    submitHighlightError: noop,
    submitHighlightRequest: noop,
    submitVideoOpen: false,
    styles: defaultStyles
};

SubmitVideo.propTypes = {
    closeSubmitVideo: PropTypes.func,
    submitHighlightError: PropTypes.func,
    submitHighlightRequest: PropTypes.func,
    submitVideoOpen: PropTypes.bool,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default SubmitVideo;
