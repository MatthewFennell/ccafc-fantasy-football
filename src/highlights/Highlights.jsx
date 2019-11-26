import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import defaultStyles from './Highlights.module.scss';
import StyledButton from '../common/StyledButton/StyledButton';
import {
    closeHighlightError, submitHighlightRequest, submitHighlightError, fetchHighlightsRequest,
    upvoteHighlightRequest, downvoteHighlightRequest
} from './actions';
import ErrorModal from '../common/modal/ErrorModal';
import YouTubeList from '../common/youtubelist/YouTubeList';
import SubmitVideo from './SubmitVideo';

const Highlights = props => {
    useEffect(() => {
        props.fetchHighlightsRequest();
    }, []);

    const [submitVideoOpen, setSubmitVideoOpen] = useState(false);
    const openSubmitVideo = useCallback(() => {
        setSubmitVideoOpen(true);
    }, [setSubmitVideoOpen, submitVideoOpen]);

    return (
        <>
            <SubmitVideo
                closeSubmitVideo={() => setSubmitVideoOpen(false)}
                submitVideoOpen={submitVideoOpen}
                submitHighlightRequest={props.submitHighlightRequest}
                submitHighlightError={props.submitHighlightError}
            />
            <ErrorModal
                closeModal={props.closeHighlightError}
                headerMessage="Submit Highlight Error"
                isOpen={props.highlightError.length > 0}
                errorCode={props.highlightErrorCode}
                errorMessage={props.highlightError}
            />
            <div className={props.styles.highlightsHeader}>
                <div className={props.styles.highlightsMessage}>
                  Highlights
                </div>
                <div className={props.styles.openSubmitVideo}>
                    <StyledButton onClick={openSubmitVideo} text="Click here to submit a video for approval" color="primary" />
                </div>
            </div>
            <YouTubeList
                authId={props.auth.uid}
                downvoteHighlightRequest={props.downvoteHighlightRequest}
                loading={props.loadingVideos}
                videos={props.videos}
                votingPage
                upvoteHighlightRequest={props.upvoteHighlightRequest}
            />
        </>
    );
};

Highlights.defaultProps = {
    auth: '',
    highlightError: '',
    highlightErrorCode: '',
    loadingVideos: false,
    styles: defaultStyles,
    videos: []
};

Highlights.propTypes = {
    auth: PropTypes.shape({
        uid: PropTypes.string
    }),
    closeHighlightError: PropTypes.func.isRequired,
    downvoteHighlightRequest: PropTypes.func.isRequired,
    fetchHighlightsRequest: PropTypes.func.isRequired,
    highlightError: PropTypes.string,
    highlightErrorCode: PropTypes.string,
    loadingVideos: PropTypes.bool,
    styles: PropTypes.objectOf(PropTypes.string),
    submitHighlightError: PropTypes.func.isRequired,
    submitHighlightRequest: PropTypes.func.isRequired,
    videos: PropTypes.arrayOf(PropTypes.shape({})),
    upvoteHighlightRequest: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    closeHighlightError,
    downvoteHighlightRequest,
    fetchHighlightsRequest,
    submitHighlightError,
    submitHighlightRequest,
    upvoteHighlightRequest
};

const mapStateToProps = state => ({
    auth: state.firebase.auth,
    highlightError: state.highlights.submitLinkError,
    highlightErrorCode: state.highlights.submitLinkErrorCode,
    loadingVideos: state.highlights.loadingVideos,
    videos: state.highlights.videos
});

export default connect(mapStateToProps, mapDispatchToProps)(Highlights);
