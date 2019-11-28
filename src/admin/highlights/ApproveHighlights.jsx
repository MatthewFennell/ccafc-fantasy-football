import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import defaultStyles from './ApproveHighlights.module.scss';
import {
    fetchHighlightsForApprovalRequest, approveHighlightRequest, rejectHighlightRequest,
    deleteHighlightRequest
} from '../actions';
import YouTubeList from '../../common/youtubelist/YouTubeList';
import StyledButton from '../../common/StyledButton/StyledButton';
import ConfirmModal from '../../common/modal/ConfirmModal';
import StyledModal from '../../common/modal/StyledModal';
import StyledInput from '../../common/StyledInput/StyledInput';
import Spinner from '../../common/spinner/Spinner';
import { fetchHighlightsRequest } from '../../highlights/actions';
import Grid from '../../common/grid/Grid';
import { generateTimeSinceNow, generateYouTubeLinkFromId } from '../../helperFunctions';
import * as helpers from './helpers';
import RadioButton from '../../common/radio/RadioButton';

const columns = [
    {
        id: 'title',
        label: 'Title',
        align: 'center'
    },
    {
        id: 'author',
        label: 'Author',
        align: 'center'
    },
    {
        id: 'videoLink',
        label: 'Video',
        align: 'center'
    },
    {
        id: 'dateCreated',
        label: 'Date Created',
        align: 'center'
    },
    {
        id: 'upvotes',
        label: 'Upvotes',
        align: 'center'
    },
    {
        id: 'delete',
        label: '',
        align: 'center'
    }
];


const ApproveHighlights = props => {
    useEffect(() => {
        props.fetchHighlightsForApprovalRequest();
        props.fetchHighlightsRequest();
    }, [props.fetchHighlightsForApprovalRequest, props.fetchHighlightsRequest]);

    const [activeHightlight, setActiveHighlight] = useState('');
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [rejectModalOpen, setRejectModalOpen] = useState(false);
    const [reasonToReject, setReasonToReject] = useState('');
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [filterBy, setFilterBy] = useState('allTime');
    const [searchBy, setSearchBy] = useState('');

    const openConfirm = useCallback(id => {
        setActiveHighlight(id);
        setConfirmModalOpen(true);
    }, []);

    const openReject = useCallback(id => {
        setActiveHighlight(id);
        setRejectModalOpen(true);
    }, []);

    const openDelete = useCallback(id => {
        setActiveHighlight(id);
        setDeleteModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setConfirmModalOpen(false);
        setRejectModalOpen(false);
        setDeleteModalOpen(false);
        setActiveHighlight('');
    }, []);

    const confirm = useCallback(() => {
        props.approveHighlightRequest(activeHightlight);
        closeModal();
    }, [props.approveHighlightRequest, activeHightlight]);

    const reject = useCallback(() => {
        props.rejectHighlightRequest(activeHightlight, reasonToReject);
        closeModal();
    }, [props.approveHighlightRequest, activeHightlight, reasonToReject]);

    const deleteConfirm = useCallback(() => {
        props.deleteHighlightRequest(activeHightlight, reasonToReject);
        closeModal();
    }, [props.deleteHighlightRequest, activeHightlight, reasonToReject]);

    const mapRows = videos => videos.map(x => ({
        id: x.id,
        title: x.title,
        author: x.email,
        videoLink: generateYouTubeLinkFromId(x.videoId),
        dateCreated: generateTimeSinceNow(x.dateCreated),
        upvotes: `${x.upvotes.length - x.downvotes.length > 0 ? '+' : ''}${x.upvotes.length - x.downvotes.length}`,
        delete:
    <div className={props.styles.deleteIcon}>
        <DeleteIcon color="primary" onClick={() => openDelete(x.id)} />
    </div>
    }));

    return (
        <>
            <div className={props.styles.approveHighlightsWrapper}>
                Here you can approve / reject highlights. Please give a reason when rejecting
            </div>
            <div className={props.styles.highlightsWrapper}>
                <YouTubeList
                    approversPage
                    openConfirm={openConfirm}
                    openReject={openReject}
                    rejectHighlightRequest={props.rejectHighlightRequest}
                    videos={props.highlightsForApproval}
                />
            </div>

            {props.loadingHighlightsForApproval && (
                <div className={props.styles.loadingHighlights}>
                    <Spinner color="secondary" />
                </div>
            )}

            {props.highlightsForApproval.length === 0 && !props.loadingHighlightsForApproval && (
                <div className={props.styles.noHighlights}>
                    No highlights waiting to be approved
                </div>
            )}

            <div className={props.styles.allVideos}>
                <div className={props.styles.dateFilters}>
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
                <div className={props.styles.videoSearchFilter}>
                    <StyledInput label="Filter by author / title" onChange={setSearchBy} value={searchBy} />
                </div>
                <Grid
                    gridHeader="All Highlights"
                    columns={columns}
                    rows={mapRows(helpers.filterByDate(filterBy, props.videos, searchBy))}
                />
            </div>

            <ConfirmModal
                cancel={closeModal}
                closeModal={closeModal}
                isOpen={confirmModalOpen}
                submit={confirm}
                text="Are you sure you want to approve this video?"
            />
            <StyledModal
                backdrop
                closeModal={closeModal}
                error
                isOpen={rejectModalOpen}
                headerMessage="Reject Video"
            >
                <div className={props.styles.modalWrapper}>
                    <div><StyledInput label="Reason for rejection" onChange={setReasonToReject} value={reasonToReject} /></div>
                    <div className={props.styles.modalButtons}>
                        <StyledButton text="Confirm" onClick={reject} />
                        <StyledButton text="Cancel" color="secondary" onClick={closeModal} />
                    </div>
                </div>
            </StyledModal>
            <StyledModal
                backdrop
                closeModal={closeModal}
                error
                isOpen={deleteModalOpen}
                headerMessage="Delete Video"
            >
                <div className={props.styles.modalWrapper}>
                    <div><StyledInput label="Reason for deletion" onChange={setReasonToReject} value={reasonToReject} /></div>
                    <div className={props.styles.modalButtons}>
                        <StyledButton text="Confirm" onClick={deleteConfirm} />
                        <StyledButton text="Cancel" color="secondary" onClick={closeModal} />
                    </div>
                </div>
            </StyledModal>
        </>
    );
};

ApproveHighlights.defaultProps = {
    highlightsForApproval: [],
    loadingHighlightsForApproval: false,
    styles: defaultStyles,
    videos: []
};

ApproveHighlights.propTypes = {
    approveHighlightRequest: PropTypes.func.isRequired,
    deleteHighlightRequest: PropTypes.func.isRequired,
    fetchHighlightsRequest: PropTypes.func.isRequired,
    fetchHighlightsForApprovalRequest: PropTypes.func.isRequired,
    highlightsForApproval: PropTypes.arrayOf(PropTypes.shape({
        userId: PropTypes.string,
        videoId: PropTypes.string,
        id: PropTypes.string
    })),
    loadingHighlightsForApproval: PropTypes.bool,
    rejectHighlightRequest: PropTypes.func.isRequired,
    styles: PropTypes.objectOf(PropTypes.string),
    videos: PropTypes.arrayOf(PropTypes.shape({}))
};

const mapDispatchToProps = {
    approveHighlightRequest,
    deleteHighlightRequest,
    fetchHighlightsRequest,
    fetchHighlightsForApprovalRequest,
    rejectHighlightRequest
};

const mapStateToProps = state => ({
    highlightsForApproval: state.admin.highlightsForApproval,
    loadingHighlightsForApproval: state.admin.loadingHighlightsForApproval,
    videos: state.highlights.videos
});

export default connect(mapStateToProps, mapDispatchToProps)(ApproveHighlights);
