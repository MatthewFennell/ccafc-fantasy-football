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

const FeatureRequest = props => {
    const [description, setDescription] = useState('');
    const [submitFeatureRequestOpen, setSubmitFeatureRequestOpen] = useState(false);
    const [isBug, setIsBug] = useState(false);

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
        props.deleteCommentRequest(featureId, commentId);
        // eslint-disable-next-line
    }, [props.deleteCommentRequest])

    const deleteReply = useCallback(featureId => (commentId, replyId) => {
        props.deleteReplyRequest(featureId, commentId, replyId);
        // eslint-disable-next-line
    }, [props.deleteReplyRequest])

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
    featureRequests: {},
    isAddingCommentToFeature: false,
    isSubmittingFeature: false,
    submitFeatureRequest: noop,
    successMessage: ''
};

FeatureRequest.propTypes = {
    closeSuccessMessage: PropTypes.func,
    addCommentToFeatureRequest: PropTypes.func,
    addReplyToCommentRequest: PropTypes.func,
    auth: PropTypes.shape({
        uid: PropTypes.string
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
    submitFeatureRequest: PropTypes.func,
    successMessage: PropTypes.string
};

const mapStateToProps = state => ({
    auth: state.firebase.auth,
    isAddingCommentToFeature: state.features.isAddingCommentToFeature,
    featureRequests: state.firestore.data.featureRequests,
    isSubmittingFeature: state.features.isSubmittingFeature,
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
