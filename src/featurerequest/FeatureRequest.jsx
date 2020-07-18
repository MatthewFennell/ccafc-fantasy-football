import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import _, { noop } from 'lodash';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import {
    addReplyToCommentRequest, submitFeatureRequest, addCommentToFeatureRequest,
    deleteCommentRequest, deleteReplyRequest, closeSuccessMessage
} from './actions';
import AllFeatureRequests from './AllFeatureRequests';
import SubmitFeature from './SubmitFeature';
import SuccessModal from '../common/modal/SuccessModal';
import ConfirmModal from '../common/modal/ConfirmModal';

const FeatureRequest = props => {
    const [description, setDescription] = useState('');
    const [submitFeatureRequestOpen, setSubmitFeatureRequestOpen] = useState(false);
    const [isBug, setIsBug] = useState(false);
    const [deleteCommentInfo, setDeleteCommentInfo] = useState({});
    const [deleteReplyInfo, setDeleteReplyInfo] = useState({});

    const updateDescription = useCallback(e => {
        const text = e.target.value;
        if (text.length <= 180) {
            setDescription(text);
        }
    }, [setDescription]);

    const addNewComment = useCallback(id => comment => {
        props.addCommentToFeatureRequest(comment, id);
        // eslint-disable-next-line
    }, [props.addCommentToFeatureRequest]);

    const addNewReply = useCallback(id => (message, origin) => {
        props.addReplyToCommentRequest(message, id, origin);
        // eslint-disable-next-line
    }, [props.addReplyToCommentRequest]);

    const submitRequest = useCallback(() => {
        props.submitFeatureRequest(description, isBug);
        setDescription('');
        setIsBug(false);
        setSubmitFeatureRequestOpen(false);
        // eslint-disable-next-line
    }, [description, props.submitFeatureRequest, setDescription, setSubmitFeatureRequestOpen, isBug, setIsBug]);

    const deleteComment = useCallback(featureId => commentId => {
        setDeleteCommentInfo({
            featureId,
            commentId
        });
    }, [setDeleteCommentInfo]);

    const deleteReply = useCallback(featureId => (commentId, replyId) => {
        setDeleteReplyInfo({
            featureId,
            commentId,
            replyId
        });
    }, [setDeleteReplyInfo]);

    const confirmDeleteComment = useCallback(() => {
        props.deleteCommentRequest(deleteCommentInfo.featureId, deleteCommentInfo.commentId);
        setDeleteCommentInfo({});
        // eslint-disable-next-line
    }, [deleteCommentInfo, props.deleteCommentRequest, setDeleteCommentInfo]);

    const confirmDeleteReply = useCallback(() => {
        props.deleteReplyRequest(deleteReplyInfo.featureId,
            deleteReplyInfo.commentId, deleteReplyInfo.replyId);
        setDeleteReplyInfo({});
        // eslint-disable-next-line
    }, [deleteReplyInfo, props.deleteReplyRequest, setDeleteReplyInfo])

    return (
        <>
            <SubmitFeature
                closeSubmitFeature={() => setSubmitFeatureRequestOpen(false)}
                description={description}
                isBug={isBug}
                setIsBug={setIsBug}
                submitFeatureOpen={submitFeatureRequestOpen}
                submitRequest={submitRequest}
                updateDescription={updateDescription}
            />
            <AllFeatureRequests
                addNewComment={addNewComment}
                addNewReply={addNewReply}
                deleteComment={deleteComment}
                deleteReply={deleteReply}
                featureRequests={_.map(props.featureRequests, (value, id) => ({ id, ...value }))
                    .filter(x => !x.isBug)}
                isAddingCommentToFeature={props.isAddingCommentToFeature}
                isSubmittingFeature={props.isSubmittingFeature}
                setSubmitFeatureRequestOpen={setSubmitFeatureRequestOpen}
                loggedInUserId={props.auth.uid}
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

FeatureRequest.defaultProps = {
    closeSuccessMessage: noop,
    addCommentToFeatureRequest: noop,
    addReplyToCommentRequest: noop,
    auth: {
        uid: null
    },
    commentBeingDeletedInfo: {
        commentId: '',
        featureId: ''
    },
    featureRequests: {},
    isAddingCommentToFeature: false,
    isSubmittingFeature: false,
    replyBeingDeletedInfo: {
        featureId: '',
        commentId: '',
        replyId: ''
    },
    submitFeatureRequest: noop,
    successMessage: ''
};

FeatureRequest.propTypes = {
    addCommentToFeatureRequest: PropTypes.func,
    addReplyToCommentRequest: PropTypes.func,
    auth: PropTypes.shape({
        uid: PropTypes.string
    }),
    closeSuccessMessage: PropTypes.func,
    commentBeingDeletedInfo: PropTypes.shape({
        featureId: PropTypes.string,
        commentId: PropTypes.string
    }),
    deleteCommentRequest: PropTypes.func.isRequired,
    deleteReplyRequest: PropTypes.func.isRequired,
    featureRequests: PropTypes.objectOf(PropTypes.shape({
        dateCreated: PropTypes.any,
        description: PropTypes.string,
        userId: PropTypes.string
    })),
    isAddingCommentToFeature: PropTypes.bool,
    isSubmittingFeature: PropTypes.bool,
    replyBeingDeletedInfo: PropTypes.shape({
        featureId: PropTypes.string,
        commentId: PropTypes.string,
        replyId: PropTypes.string
    }),
    submitFeatureRequest: PropTypes.func,
    successMessage: PropTypes.string
};

const mapStateToProps = state => ({
    auth: state.firebase.auth,
    commentBeingDeletedInfo: state.features.commentBeingDeletedInfo,
    featureRequests: state.firestore.data.featureRequests,
    isAddingCommentToFeature: state.features.isAddingCommentToFeature,
    isSubmittingFeature: state.features.isSubmittingFeature,
    replyBeingDeletedInfo: state.features.replyBeingDeletedInfo,
    successMessage: state.features.successMessage
});

const mapDispatchToProps = {
    addCommentToFeatureRequest,
    addReplyToCommentRequest,
    closeSuccessMessage,
    deleteCommentRequest,
    deleteReplyRequest,
    submitFeatureRequest
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(() => [
        {
            collection: 'feature-requests',
            storeAs: 'featureRequests'
        }
    ])
)(FeatureRequest);

export { FeatureRequest as FeatureRequestUnconnected };
