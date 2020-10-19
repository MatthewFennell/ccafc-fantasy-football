import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import classNames from 'classnames';
import AddIcon from '@material-ui/icons/Add';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import defaultStyles from './ApproveHighlights.module.scss';
import {
    fetchHighlightsForApprovalRequest, approveHighlightRequest, rejectHighlightRequest,
    deleteHighlightRequest, fetchAllRejectedHighlightsRequest, reapproveRejectedHighlightRequest
} from '../actions';
import YouTubeList from '../../common/youtubelist/YouTubeList';
import StyledButton from '../../common/StyledButton/StyledButton';
import SuccessModal from '../../common/modal/SuccessModal';
import Spinner from '../../common/spinner/Spinner';
import { fetchHighlightsRequest } from '../../highlights/actions';
import Grid from '../../common/grid/Grid';
import { generateTimeSinceNow, generateYouTubeLinkFromId } from '../../helperFunctions';
import * as helpers from './helpers';
import TextInput from '../../common/TextInput/TextInput';
import * as textInputConstants from '../../common/TextInput/constants';
import Dropdown from '../../common/dropdown/Dropdown';
import materialStyles from '../../materialStyles';
import * as appConstants from '../../constants';

const columns = [
    {
        id: 'title',
        label: 'Title',
        align: 'center',
        approved: true,
        rejected: true
    },
    {
        id: 'author',
        label: 'Author',
        align: 'center',
        approved: true,
        rejected: true
    },
    {
        id: 'videoLink',
        label: 'Video',
        align: 'center',
        approved: true,
        rejected: true
    },
    {
        id: 'dateCreated',
        label: 'Date Created',
        align: 'center',
        approved: true,
        rejected: true
    },
    {
        id: 'rejectedBy',
        label: 'Rejected By',
        align: 'center',
        approved: false,
        rejected: true
    },
    {
        id: 'upvotes',
        label: 'Upvotes',
        align: 'center',
        approved: true,
        rejected: false
    },
    {
        id: 'reason',
        label: 'Reason',
        align: 'center',
        approved: false,
        rejected: true
    },
    {
        id: 'delete',
        label: '',
        align: 'center',
        approved: true,
        rejected: true
    }
];

const modalOptions = {
    REAPPROVE: 'REAPPROVE',
    DELETE: 'DELETE',
    REJECT: 'REJECT',
    APPROVE: 'APPROVE'
};

const ApproveHighlights = props => {
    const classes = makeStyles(materialStyles)();
    const isMobile = useMediaQuery(`(max-width:${appConstants.mobileScreenSize}px)`);
    useEffect(() => {
        props.fetchHighlightsForApprovalRequest();
        props.fetchHighlightsRequest();
        props.fetchAllRejectedHighlightsRequest();
        // eslint-disable-next-line
    }, [props.fetchHighlightsForApprovalRequest, props.fetchHighlightsRequest,
        props.fetchAllRejectedHighlightsRequest]);

    const [activeHightlight, setActiveHighlight] = useState('');
    const [reasonToReject, setReasonToReject] = useState('');
    const [filterBy, setFilterBy] = useState('allTime');
    const [searchBy, setSearchBy] = useState('');

    const [filterByRejected, setFilterByRejected] = useState('allTime');
    const [searchByRejected, setSearchByRejected] = useState('');

    const [modalAction, setModalAction] = useState('');
    const [fancyModalOpen, setFancyModalOpen] = useState(false);
    const [modalText, setModalText] = useState('');

    const closeFancyModal = useCallback(() => {
        setFancyModalOpen(false);
        setModalAction('');
        setActiveHighlight('');
    }, [setFancyModalOpen, setModalAction, setActiveHighlight]);

    const confirmFancyModal = useCallback(() => {
        if (modalAction === modalOptions.DELETE) {
            props.deleteHighlightRequest(activeHightlight, reasonToReject);
        }
        if (modalAction === modalOptions.APPROVE) {
            props.approveHighlightRequest(activeHightlight);
        }
        if (modalAction === modalOptions.REJECT) {
            props.rejectHighlightRequest(activeHightlight, reasonToReject);
        }
        if (modalAction === modalOptions.REAPPROVE) {
            props.reapproveRejectedHighlightRequest(activeHightlight);
        }
        closeFancyModal();
        // eslint-disable-next-line
    }, [modalAction, activeHightlight, fancyModalOpen, closeFancyModal, reasonToReject]);

    const openFancyModal = useCallback((id, action) => {
        if (action === modalOptions.REAPPROVE) {
            setModalText('Reapprove highlight');
        }
        if (action === modalOptions.DELETE) {
            setModalText('Delete highlight');
        }
        if (action === modalOptions.APPROVE) {
            setModalText('Approve highlight');
        }
        if (action === modalOptions.REJECT) {
            setModalText('Reject Highlight');
        }
        setActiveHighlight(id);
        setModalAction(action);
        setFancyModalOpen(true);
    }, []);

    const mapRows = (videos, deleteSymbol) => videos.map(x => ({
        id: x.id,
        title: x.title,
        author: x.email,
        videoLink: generateYouTubeLinkFromId(x.videoId),
        dateCreated: generateTimeSinceNow(x.dateCreated),
        upvotes: `${x.upvotes.length - x.downvotes.length > 0 ? '+' : ''}${x.upvotes.length - x.downvotes.length}`,
        reason: x.reason,
        rejectedBy: x.rejectedBy,
        delete:
    <div className={props.styles.deleteIcon}>
        {deleteSymbol ? <DeleteIcon color="primary" onClick={() => openFancyModal(x.id, modalOptions.DELETE)} />
            : <AddIcon color="primary" onClick={() => openFancyModal(x.id, modalOptions.REAPPROVE)} />}
    </div>
    }));

    return (
        <>
            <Paper
                elevation={4}
                className={classNames({
                    [classes.paper]: !isMobile,
                    [classes.paperMobile]: isMobile
                })}
            >
                <div className={props.styles.highlightInfo}>
                    Here you can approve / reject highlights. Please give a reason when rejecting.
                    You can also delete active highlights and reapprove rejected ones.
                    Rejected highlights are
                    automatically deleted once they are at least a month old.
                </div>
            </Paper>
            <div className={props.styles.highlightsWrapper}>
                <YouTubeList
                    approversPage
                    highlightBeingApproved={props.highlightBeingApproved}
                    highlightBeingRejected={props.highlightBeingRejected}
                    openConfirm={id => openFancyModal(id, modalOptions.APPROVE)}
                    openReject={id => openFancyModal(id, modalOptions.REJECT)}
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
                <Paper
                    elevation={4}
                    className={classNames({
                        [classes.paper]: !isMobile,
                        [classes.paperMobile]: isMobile
                    })}
                >
                    <div className={props.styles.noHighlights}>

                        No highlights waiting to be approved
                    </div>
                </Paper>
            )}

            <Paper
                elevation={4}
                className={classNames({
                    [classes.paper]: !isMobile,
                    [classes.paperMobile]: isMobile
                })}
            >
                <div className={props.styles.approveHighlightsHeader}>
                    <div className={props.styles.highlightsHeaderMessage}>
                        All Approved Highlights
                    </div>
                    <div className={props.styles.highlightInfoWrapper}>
                        <div className={props.styles.dateFilters}>
                            <Dropdown
                                title="Filter By Date"
                                onChange={setFilterBy}
                                options={Object.values(helpers.dateFilters).map(x => ({
                                    text: x.label,
                                    id: x.id,
                                    value: x.id
                                }))}
                                value={filterBy}
                            />
                        </div>
                        <div className={props.styles.videoSearchFilter}>
                            <TextInput
                                label="Filter by author / title"
                                onChange={setSearchBy}
                                value={searchBy}
                                icon={textInputConstants.textInputIcons.search}
                                iconColor="primary"
                            />
                        </div>
                    </div>
                </div>
                <div className={props.styles.gridWrapper}>
                    <Grid
                        columns={columns.filter(x => x.approved)}
                        loading={props.loadingVideos}
                        rows={mapRows(helpers.filterByDate(filterBy, props.videos, searchBy), true)}
                    />
                </div>
            </Paper>

            <Paper
                elevation={4}
                className={classNames({
                    [classes.paper]: !isMobile,
                    [classes.paperMobile]: isMobile
                })}
            >
                <div className={props.styles.rejectedHighlightsHeader}>
                    <div className={props.styles.highlightsHeaderMessage}>
                        All Rejected Highlights
                    </div>
                    <div className={props.styles.highlightInfoWrapper}>

                        <div className={props.styles.dateFilters}>
                            <Dropdown
                                title="Filter By Date"
                                onChange={setFilterByRejected}
                                options={Object.values(helpers.dateFilters).map(x => ({
                                    text: x.label,
                                    id: x.id,
                                    value: x.id
                                }))}
                                value={filterByRejected}
                            />
                        </div>
                        <div className={props.styles.videoSearchFilter}>
                            <TextInput
                                label="Filter by author / title"
                                onChange={setSearchByRejected}
                                value={searchByRejected}
                                icon={textInputConstants.textInputIcons.search}
                                iconColor="primary"
                            />
                        </div>
                    </div>
                </div>
                <div className={props.styles.gridWrapper}>
                    <Grid
                        columns={columns.filter(x => x.rejected)}
                        loading={props.loadingRejectedHighlights}
                        rows={mapRows(helpers.filterByDate(filterByRejected,
                            props.rejectedHighlights, searchByRejected), false)}
                    />
                </div>
            </Paper>
            <SuccessModal
                backdrop
                closeModal={closeFancyModal}
                error
                isOpen={fancyModalOpen}
                headerMessage={modalText}
            >
                <div className={props.styles.modalWrapper}>
                    {(modalAction === modalOptions.REJECT || modalAction === modalOptions.DELETE)
                    && (
                        <div>
                            <TextInput
                                label="Reason"
                                onChange={setReasonToReject}
                                value={reasonToReject}
                                onSubmit={confirmFancyModal}
                            />
                        </div>
                    )}
                    <div className={props.styles.modalButtons}>
                        <StyledButton text="Confirm" onClick={confirmFancyModal} />
                        <StyledButton text="Cancel" color="secondary" onClick={closeFancyModal} />
                    </div>
                </div>
            </SuccessModal>
        </>
    );
};

ApproveHighlights.defaultProps = {
    highlightBeingApproved: '',
    highlightBeingRejected: '',
    highlightsForApproval: [],
    loadingRejectedHighlights: false,
    loadingHighlightsForApproval: false,
    loadingVideos: false,
    rejectedHighlights: [],
    styles: defaultStyles,
    videos: []
};

ApproveHighlights.propTypes = {
    approveHighlightRequest: PropTypes.func.isRequired,
    deleteHighlightRequest: PropTypes.func.isRequired,
    fetchAllRejectedHighlightsRequest: PropTypes.func.isRequired,
    fetchHighlightsRequest: PropTypes.func.isRequired,
    fetchHighlightsForApprovalRequest: PropTypes.func.isRequired,
    highlightsForApproval: PropTypes.arrayOf(PropTypes.shape({
        userId: PropTypes.string,
        videoId: PropTypes.string,
        id: PropTypes.string
    })),
    highlightBeingApproved: PropTypes.string,
    highlightBeingRejected: PropTypes.string,
    loadingVideos: PropTypes.bool,
    loadingRejectedHighlights: PropTypes.bool,
    loadingHighlightsForApproval: PropTypes.bool,
    reapproveRejectedHighlightRequest: PropTypes.func.isRequired,
    rejectedHighlights: PropTypes.arrayOf(PropTypes.shape({})),
    rejectHighlightRequest: PropTypes.func.isRequired,
    styles: PropTypes.objectOf(PropTypes.string),
    videos: PropTypes.arrayOf(PropTypes.shape({}))
};

const mapDispatchToProps = {
    approveHighlightRequest,
    deleteHighlightRequest,
    fetchAllRejectedHighlightsRequest,
    fetchHighlightsRequest,
    fetchHighlightsForApprovalRequest,
    reapproveRejectedHighlightRequest,
    rejectHighlightRequest
};

const mapStateToProps = state => ({
    highlightsForApproval: state.admin.highlightsForApproval,
    highlightBeingApproved: state.admin.highlightBeingApproved,
    highlightBeingRejected: state.admin.highlightBeingRejected,
    loadingVideos: state.highlights.loadingVideos,
    loadingRejectedHighlights: state.admin.loadingRejectedHighlights,
    loadingHighlightsForApproval: state.admin.loadingHighlightsForApproval,
    rejectedHighlights: state.admin.rejectedHighlights,
    videos: state.highlights.videos
});

export default connect(mapStateToProps, mapDispatchToProps)(ApproveHighlights);

export { ApproveHighlights as ApproveHighlightsUnconnected };
