import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import defaultStyles from './ApproveHighlights.module.scss';
import { fetchHighlightsForApprovalRequest, approveHighlightRequest, rejectHighlightRequest } from '../actions';
import YouTubeList from '../../common/youtubelist/YouTubeList';
import StyledButton from '../../common/StyledButton/StyledButton';
import ConfirmModal from '../../common/modal/ConfirmModal';
import StyledModal from '../../common/modal/StyledModal';
import StyledInput from '../../common/StyledInput/StyledInput';
import Spinner from '../../common/spinner/Spinner';

const ApproveHighlights = props => {
    useEffect(() => {
        props.fetchHighlightsForApprovalRequest();
    }, [props.fetchHighlightsForApprovalRequest]);

    const [activeHightlight, setActiveHighlight] = useState('');
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [rejectModalOpen, setRejectModalOpen] = useState(false);
    const [reasonToReject, setReasonToReject] = useState('');

    const openConfirm = useCallback(id => {
        setActiveHighlight(id);
        setConfirmModalOpen(true);
    }, []);

    const openReject = useCallback(id => {
        setActiveHighlight(id);
        setRejectModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setConfirmModalOpen(false);
        setRejectModalOpen(false);
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
        </>
    );
};

ApproveHighlights.defaultProps = {
    highlightsForApproval: [],
    loadingHighlightsForApproval: false,
    styles: defaultStyles
};

ApproveHighlights.propTypes = {
    approveHighlightRequest: PropTypes.func.isRequired,
    fetchHighlightsForApprovalRequest: PropTypes.func.isRequired,
    highlightsForApproval: PropTypes.arrayOf(PropTypes.shape({
        userId: PropTypes.string,
        videoId: PropTypes.string,
        id: PropTypes.string
    })),
    loadingHighlightsForApproval: PropTypes.bool,
    rejectHighlightRequest: PropTypes.func.isRequired,
    styles: PropTypes.objectOf(PropTypes.string)
};

const mapDispatchToProps = {
    approveHighlightRequest,
    fetchHighlightsForApprovalRequest,
    rejectHighlightRequest
};

const mapStateToProps = state => ({
    highlightsForApproval: state.admin.highlightsForApproval,
    loadingHighlightsForApproval: state.admin.loadingHighlightsForApproval
});

export default connect(mapStateToProps, mapDispatchToProps)(ApproveHighlights);
