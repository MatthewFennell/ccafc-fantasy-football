import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import { noop } from 'lodash';
import defaultStyles from './Highlights.module.scss';
import StyledButton from '../common/StyledButton/StyledButton';
import {
    closeHighlightError, submitHighlightRequest, fetchHighlightsRequest,
    upvoteHighlightRequest, downvoteHighlightRequest, fetchUserHighlightsToBeApprovedRequest,
    fetchRejectedHighlightsRequest, addCommentToVideoRequest, addReplyToVideoRequest,
    deleteCommentRequest, deleteReplyRequest, closeSuccessMessage, setHighlightError
} from './actions';
import ErrorModal from '../common/modal/ErrorModal';
import SuccessModal from '../common/modal/SuccessModal';
import YouTubeList from '../common/youtubelist/YouTubeList';
import SubmitVideo from './SubmitVideo';
import RadioButton from '../common/radio/RadioButton';
import * as helpers from './helpers';
import StyledInput from '../common/StyledInput/StyledInput';

const Highlights = props => {
    useEffect(() => {
        props.fetchHighlightsRequest();
        // eslint-disable-next-line
    }, []);

    const [submitVideoOpen, setSubmitVideoOpen] = useState(false);
    const [filterBy, setFilterBy] = useState('allTime');
    const [sortBy, setSortBy] = useState('newestFirst');
    const [searchFilter, setSearchFilter] = useState('');
    const openSubmitVideo = useCallback(() => {
        setSubmitVideoOpen(true);
    }, [setSubmitVideoOpen]);

    const addNewComment = useCallback(id => comment => {
        props.addCommentToVideoRequest(comment, id);
        // eslint-disable-next-line
    }, [props.addCommentToFeatureRequest]);

    const addNewReply = useCallback(id => (message, origin) => {
        props.addReplyToVideoRequest(message, id, origin);
        // eslint-disable-next-line
    }, [props.addReplyToVideoRequest]);

    const deleteComment = useCallback(videoId => commentId => {
        props.deleteCommentRequest(videoId, commentId);
        // eslint-disable-next-line
    }, [props.deleteCommentRequest])

    const deleteReply = useCallback(featureId => (commentId, replyId) => {
        props.deleteReplyRequest(featureId, commentId, replyId);
        // eslint-disable-next-line
    }, [props.deleteReplyRequest])

    return (
        <>
            <div className={props.styles.highlightsWrapper}>
                <div className={props.styles.highlightsHeader}>
                    <div className={props.styles.infoWrapper}>
                        <div className={props.styles.highlightsMessage}>
                  Highlights
                        </div>
                        <div className={props.styles.openSubmitVideo}>
                            <StyledButton onClick={openSubmitVideo} text="Submit a Video" color="primary" />
                        </div>
                        <div className={props.styles.searchFilter}>
                            <StyledInput label="Search videos" onChange={setSearchFilter} value={searchFilter} />
                        </div>
                    </div>
                    <div className={props.styles.sortByWrapper}>
                        <div>
                            <RadioButton
                                radioLabel="Filter By Date"
                                onChange={setFilterBy}
                                options={Object.values(helpers.dateFilters).map(x => ({
                                    radioLabel: x.label,
                                    value: x.id
                                }))}
                                value={filterBy}
                            />
                        </div>
                        <div>
                            <RadioButton
                                radioLabel="Sort By"
                                onChange={setSortBy}
                                options={Object.values(helpers.sortByFilters).map(x => ({
                                    radioLabel: x.label,
                                    value: x.id
                                }))}
                                value={sortBy}
                            />
                        </div>
                    </div>
                </div>
                <div className={props.styles.karmaWrapper}>
                    <div className={props.styles.karmaIcon}><WhatshotIcon fontSize="large" color="primary" /></div>
                    <div className={props.styles.karmaInfo}>
                        <div className={props.styles.karmaValue}>
                            {helpers.generateKarma(props.videos
                                .filter(x => x.userId === props.auth.uid))}
                        </div>
                        <div className={props.styles.karmaText}>Karma</div>
                    </div>
                </div>
            </div>
            <YouTubeList
                addNewComment={addNewComment}
                addNewReply={addNewReply}
                authId={props.auth.uid}
                deleteComment={deleteComment}
                deleteReply={deleteReply}
                downvoteHighlightRequest={props.downvoteHighlightRequest}
                loading={props.loadingVideos}
                videos={helpers.sortVideos(filterBy, sortBy, props.videos, searchFilter)}
                votingPage
                upvoteHighlightRequest={props.upvoteHighlightRequest}
            />
            <SubmitVideo
                closeSubmitVideo={() => setSubmitVideoOpen(false)}
                fetchRejectedHighlightsRequest={props.fetchRejectedHighlightsRequest}
                fetchUserHighlightsToBeApproved={props.fetchUserHighlightsToBeApproved}
                loadingVideosToBeApproved={props.loadingVideosToBeApproved}
                loadingRejectedVideos={props.loadingRejectedVideos}
                submitVideoOpen={submitVideoOpen}
                submitHighlightRequest={props.submitHighlightRequest}
                submitHighlightError={props.setHighlightError}
                videosToBeApproved={props.videosToBeApproved}
                videosRejected={props.videosRejected}
                myVideos={props.videos.filter(x => x.userId === props.auth.uid)}
            />
            <ErrorModal
                closeModal={props.closeHighlightError}
                headerMessage={props.errorHeader}
                isOpen={props.errorMessage.length > 0}
                errorCode={props.errorCode}
                errorMessage={props.errorMessage}
            />
            <SuccessModal
                backdrop
                closeModal={props.closeSuccessMessage}
                isOpen={props.successMessage.length > 0}
                headerMessage={props.successMessage}
                toggleModal={noop}
            />
        </>
    );
};

Highlights.defaultProps = {
    auth: '',
    errorMessage: '',
    errorCode: '',
    errorHeader: '',
    loadingVideos: false,
    loadingVideosToBeApproved: false,
    loadingRejectedVideos: false,
    successMessage: '',
    styles: defaultStyles,
    videos: [],
    videosToBeApproved: [],
    videosRejected: []
};

Highlights.propTypes = {
    addCommentToVideoRequest: PropTypes.func.isRequired,
    addReplyToVideoRequest: PropTypes.func.isRequired,
    auth: PropTypes.shape({
        uid: PropTypes.string
    }),
    closeHighlightError: PropTypes.func.isRequired,
    closeSuccessMessage: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    errorCode: PropTypes.string,
    errorHeader: PropTypes.string,
    deleteCommentRequest: PropTypes.func.isRequired,
    deleteReplyRequest: PropTypes.func.isRequired,
    downvoteHighlightRequest: PropTypes.func.isRequired,
    loadingVideosToBeApproved: PropTypes.bool,
    loadingRejectedVideos: PropTypes.bool,
    fetchHighlightsRequest: PropTypes.func.isRequired,
    fetchRejectedHighlightsRequest: PropTypes.func.isRequired,
    fetchUserHighlightsToBeApproved: PropTypes.func.isRequired,
    loadingVideos: PropTypes.bool,
    styles: PropTypes.objectOf(PropTypes.string),
    setHighlightError: PropTypes.func.isRequired,
    submitHighlightRequest: PropTypes.func.isRequired,
    successMessage: PropTypes.string,
    videos: PropTypes.arrayOf(PropTypes.shape({})),
    videosToBeApproved: PropTypes.arrayOf(PropTypes.shape({})),
    videosRejected: PropTypes.arrayOf(PropTypes.shape({})),
    upvoteHighlightRequest: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    addCommentToVideoRequest,
    addReplyToVideoRequest,
    closeHighlightError,
    closeSuccessMessage,
    deleteCommentRequest,
    deleteReplyRequest,
    downvoteHighlightRequest,
    fetchRejectedHighlightsRequest,
    fetchHighlightsRequest,
    fetchUserHighlightsToBeApproved: fetchUserHighlightsToBeApprovedRequest,
    setHighlightError,
    submitHighlightRequest,
    upvoteHighlightRequest
};

const mapStateToProps = state => ({
    auth: state.firebase.auth,
    commentError: state.highlights.commentError,
    commentErrorCode: state.highlights.commentErrorCode,
    errorMessage: state.highlights.errorMessage,
    errorCode: state.highlights.errorCode,
    errorHeader: state.highlights.errorHeader,
    highlightError: state.highlights.submitLinkError,
    highlightErrorCode: state.highlights.submitLinkErrorCode,
    loadingVideos: state.highlights.loadingVideos,
    loadingVideosToBeApproved: state.highlights.loadingVideosToBeApproved,
    loadingRejectedVideos: state.highlights.loadingRejectedVideos,
    successMessage: state.highlights.successMessage,
    videos: state.highlights.videos,
    videosToBeApproved: state.highlights.videosToBeApproved,
    videosRejected: state.highlights.videosRejected
});

export default connect(mapStateToProps, mapDispatchToProps)(Highlights);
