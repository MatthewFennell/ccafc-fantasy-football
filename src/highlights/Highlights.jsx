import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import _, { noop } from 'lodash';
import defaultStyles from './Highlights.module.scss';
import StyledButton from '../common/StyledButton/StyledButton';
import {
    submitHighlightRequest, fetchHighlightsRequest,
    upvoteHighlightRequest, downvoteHighlightRequest, fetchUserHighlightsToBeApprovedRequest,
    fetchRejectedHighlightsRequest, addCommentToVideoRequest, addReplyToVideoRequest,
    deleteCommentRequest, deleteReplyRequest, closeSuccessMessage
} from './actions';
import { setErrorMessage } from '../errorHandling/actions';
import SuccessModal from '../common/modal/SuccessModal';
import YouTubeList from '../common/youtubelist/YouTubeList';
import SubmitVideo from './SubmitVideo';
import * as helpers from './helpers';
import TextInput from '../common/TextInput/TextInput';
import * as textInputConstants from '../common/TextInput/constants';
import Dropdown from '../common/dropdown/Dropdown';
import LoadingDiv from '../common/loadingDiv/LoadingDiv';
import Spinner from '../common/spinner/Spinner';
import ConfirmModal from '../common/modal/ConfirmModal';

const Highlights = props => {
    useEffect(() => {
        props.fetchHighlightsRequest();
        // eslint-disable-next-line
    }, []);

    const [submitVideoOpen, setSubmitVideoOpen] = useState(false);
    const [filterBy, setFilterBy] = useState('allTime');
    const [sortBy, setSortBy] = useState('newestFirst');
    const [searchFilter, setSearchFilter] = useState('');
    const [deleteCommentInfo, setDeleteCommentInfo] = useState({});
    const [deleteReplyInfo, setDeleteReplyInfo] = useState({});

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
        setDeleteCommentInfo({
            videoId,
            commentId
        });
    }, [setDeleteCommentInfo]);

    const confirmDeleteComment = useCallback(() => {
        props.deleteCommentRequest(deleteCommentInfo.videoId, deleteCommentInfo.commentId);
        setDeleteCommentInfo({});
        // eslint-disable-next-line
    }, [deleteCommentInfo, props.deleteCommentRequest, setDeleteCommentInfo]);

    const deleteReply = useCallback(videoId => (commentId, replyId) => {
        setDeleteReplyInfo({
            videoId,
            commentId,
            replyId
        });
    }, [setDeleteReplyInfo]);

    const confirmDeleteReply = useCallback(() => {
        props.deleteReplyRequest(deleteReplyInfo.videoId,
            deleteReplyInfo.commentId, deleteReplyInfo.replyId);
        setDeleteReplyInfo({});
        // eslint-disable-next-line
    }, [deleteReplyInfo, props.deleteReplyRequest, setDeleteReplyInfo])

    return (
        <>
            <div className={props.styles.highlightsWrapper}>
                <div className={props.styles.highlightsHeader}>
                    <div className={props.styles.infoWrapper}>
                        <div className={props.styles.highlightsMessage}>
                            Highlights
                        </div>
                        <div className={props.styles.openSubmitVideo}>
                            <LoadingDiv
                                isLoading={props.isSubmittingHighlight}
                                isFitContent
                                isBorderRadius
                            >
                                <StyledButton
                                    onClick={openSubmitVideo}
                                    text="Submit a Video"
                                    color="primary"
                                    disabled={props.isSubmittingHighlight}
                                />
                            </LoadingDiv>
                        </div>
                    </div>
                    <div className={props.styles.sortByWrapper}>
                        <Dropdown
                            title="Filter By Date"
                            key="Filter By Date"
                            onChange={setFilterBy}
                            options={Object.values(helpers.dateFilters).map(x => ({
                                text: x.label,
                                id: x.id,
                                value: x.id
                            }))}
                            value={filterBy}
                        />
                        <Dropdown
                            title="Sort By"
                            key="Sort By"
                            onChange={setSortBy}
                            options={Object.values(helpers.sortByFilters).map(x => ({
                                text: x.label,
                                id: x.id,
                                value: x.id
                            }))}
                            value={sortBy}
                        />
                        <TextInput
                            label="Search videos"
                            onChange={setSearchFilter}
                            value={searchFilter}
                            icon={textInputConstants.textInputIcons.search}
                            iconColor="primary"
                        />
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
            {props.loadingVideos && (
                <div className={props.styles.loadingVideos}>
                    <Spinner color="secondary" />
                </div>
            )}
            <YouTubeList
                addNewComment={addNewComment}
                addNewReply={addNewReply}
                authId={props.auth.uid}
                deleteComment={deleteComment}
                deleteReply={deleteReply}
                downvoteHighlightRequest={props.downvoteHighlightRequest}
                highlightBeingVotedOn={props.highlightBeingVotedOn}
                isAddingCommentToVideo={props.isAddingCommentToHighlight}
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
                setErrorMessage={props.setErrorMessage}
                videosToBeApproved={props.videosToBeApproved}
                videosRejected={props.videosRejected}
                myVideos={props.videos.filter(x => x.userId === props.auth.uid)}
            />
            <SuccessModal
                backdrop
                closeModal={props.closeSuccessMessage}
                isOpen={props.successMessage.length > 0}
                isSuccess
                headerMessage={props.successMessage}
                toggleModal={noop}
            />
            <ConfirmModal
                cancel={() => setDeleteCommentInfo({})}
                closeModal={() => setDeleteCommentInfo({})}
                isButtonsDisabled={!_.isEmpty(props.commentBeingDeletedInfo)}
                isLoading={!_.isEmpty(props.commentBeingDeletedInfo)}
                isOpen={!_.isEmpty(deleteCommentInfo) || !_.isEmpty(props.commentBeingDeletedInfo)}
                submit={confirmDeleteComment}
                text="Delete Comment?"
            />

            <ConfirmModal
                cancel={() => setDeleteReplyInfo({})}
                closeModal={() => setDeleteReplyInfo({})}
                isButtonsDisabled={!_.isEmpty(props.replyBeingDeletedInfo)}
                isLoading={!_.isEmpty(props.replyBeingDeletedInfo)}
                isOpen={!_.isEmpty(deleteReplyInfo) || !_.isEmpty(props.replyBeingDeletedInfo)}
                submit={confirmDeleteReply}
                text="Delete Reply?"
            />
        </>
    );
};

Highlights.defaultProps = {
    auth: {
        uid: ''
    },
    commentBeingDeletedInfo: {
        commentId: '',
        featureId: ''
    },
    highlightBeingVotedOn: '',
    loadingVideos: false,
    loadingVideosToBeApproved: false,
    loadingRejectedVideos: false,
    isAddingCommentToHighlight: false,
    isSubmittingHighlight: false,
    replyBeingDeletedInfo: {
        featureId: '',
        commentId: '',
        replyId: ''
    },
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
    commentBeingDeletedInfo: PropTypes.shape({
        featureId: PropTypes.string,
        commentId: PropTypes.string
    }),
    closeSuccessMessage: PropTypes.func.isRequired,
    deleteCommentRequest: PropTypes.func.isRequired,
    deleteReplyRequest: PropTypes.func.isRequired,
    downvoteHighlightRequest: PropTypes.func.isRequired,
    loadingVideosToBeApproved: PropTypes.bool,
    loadingRejectedVideos: PropTypes.bool,
    isAddingCommentToHighlight: PropTypes.bool,
    fetchHighlightsRequest: PropTypes.func.isRequired,
    fetchRejectedHighlightsRequest: PropTypes.func.isRequired,
    fetchUserHighlightsToBeApproved: PropTypes.func.isRequired,
    highlightBeingVotedOn: PropTypes.string,
    loadingVideos: PropTypes.bool,
    replyBeingDeletedInfo: PropTypes.shape({
        featureId: PropTypes.string,
        commentId: PropTypes.string,
        replyId: PropTypes.string
    }),
    styles: PropTypes.objectOf(PropTypes.string),
    setErrorMessage: PropTypes.func.isRequired,
    isSubmittingHighlight: PropTypes.bool,
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
    closeSuccessMessage,
    deleteCommentRequest,
    deleteReplyRequest,
    downvoteHighlightRequest,
    fetchRejectedHighlightsRequest,
    fetchHighlightsRequest,
    fetchUserHighlightsToBeApproved: fetchUserHighlightsToBeApprovedRequest,
    setErrorMessage,
    submitHighlightRequest,
    upvoteHighlightRequest
};

const mapStateToProps = state => ({
    auth: state.firebase.auth,
    commentBeingDeletedInfo: state.highlights.commentBeingDeletedInfo,
    commentError: state.highlights.commentError,
    commentErrorCode: state.highlights.commentErrorCode,
    highlightBeingVotedOn: state.highlights.highlightBeingVotedOn,
    highlightError: state.highlights.submitLinkError,
    highlightErrorCode: state.highlights.submitLinkErrorCode,
    isAddingCommentToHighlight: state.highlights.isAddingCommentToHighlight,
    loadingVideos: state.highlights.loadingVideos,
    loadingVideosToBeApproved: state.highlights.loadingVideosToBeApproved,
    loadingRejectedVideos: state.highlights.loadingRejectedVideos,
    isSubmittingHighlight: state.highlights.isSubmittingHighlight,
    replyBeingDeletedInfo: state.highlights.replyBeingDeletedInfo,
    successMessage: state.highlights.successMessage,
    videos: state.highlights.videos,
    videosToBeApproved: state.highlights.videosToBeApproved,
    videosRejected: state.highlights.videosRejected
});

export default connect(mapStateToProps, mapDispatchToProps)(Highlights);

export { Highlights as HighlightsUnconnected };
