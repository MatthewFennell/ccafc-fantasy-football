import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import defaultStyles from './Highlights.module.scss';
import StyledInput from '../common/StyledInput/StyledInput';
import StyledButton from '../common/StyledButton/StyledButton';
import {
    closeHighlightError, submitHighlightRequest, submitHighlightError, fetchHighlightsRequest
} from './actions';
import ErrorModal from '../common/modal/ErrorModal';
import WithCollapsable from '../common/collapsableHOC/WithCollapsable';
import CustomYouTube from '../common/youtube/YouTube';
import YouTubeList from '../common/youtubelist/YouTubeList';

const opts = {
    height: '390',
    // width: '100%',
    playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
    }
};

const Highlights = props => {
    useEffect(() => {
        props.fetchHighlightsRequest();
    }, []);

    const [video, setVideo] = useState('');
    const [exampleOpen, setExampleOpen] = useState(false);
    const [videoTitle, setVideoTitle] = useState('');
    const submitVideo = useCallback(() => {
        setExampleOpen(false);
        if (videoTitle.length > 3) {
            props.submitHighlightRequest(video, videoTitle);
        } else {
            props.submitHighlightError({
                code: 'Invalid title',
                message: 'Title must be at least 4 characters long'
            });
        }
    }, [video, props.submitHighlightRequest,
        props.submitHighlightError, exampleOpen, setExampleOpen, videoTitle]);

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

    return (
        <>
            <div>
                <div className={props.styles.addHighlight}>
                    <div className={props.styles.highlightMessage}>
                  Please submit your highlight to be added as a YouTube video (Just the video ID)
                    </div>
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
            <ErrorModal
                closeModal={props.closeHighlightError}
                headerMessage="Submit Highlight Error"
                isOpen={props.highlightError.length > 0}
                errorCode={props.highlightErrorCode}
                errorMessage={props.highlightError}
            />
            <YouTubeList
                videos={props.videos}
                votingPage
            />
        </>
    );
};

Highlights.defaultProps = {
    highlightError: '',
    highlightErrorCode: '',
    styles: defaultStyles,
    videos: []
};

Highlights.propTypes = {
    closeHighlightError: PropTypes.func.isRequired,
    fetchHighlightsRequest: PropTypes.func.isRequired,
    highlightError: PropTypes.string,
    highlightErrorCode: PropTypes.string,
    styles: PropTypes.objectOf(PropTypes.string),
    submitHighlightError: PropTypes.func.isRequired,
    submitHighlightRequest: PropTypes.func.isRequired,
    videos: PropTypes.arrayOf(PropTypes.shape({}))
};

const mapDispatchToProps = {
    closeHighlightError,
    fetchHighlightsRequest,
    submitHighlightError,
    submitHighlightRequest
};

const mapStateToProps = state => ({
    highlightError: state.highlights.submitLinkError,
    highlightErrorCode: state.highlights.submitLinkErrorCode,
    videos: state.highlights.videos
});

export default connect(mapStateToProps, mapDispatchToProps)(Highlights);
