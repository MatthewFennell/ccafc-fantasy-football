import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import _, { noop } from 'lodash';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import {
    addReplyToCommentRequest, submitFeatureRequest, addCommentToFeatureRequest,
    deleteCommentRequest, deleteReplyRequest, closeCommentError
} from './actions';
import MyFeatureRequests from './MyFeatureRequests';
import ErrorModal from '../common/modal/ErrorModal';
import SubmitFeature from './SubmitFeature';


const FeatureRequest = props => {
    const [description, setDescription] = useState('');
    const [submitFeatureRequestOpen, setSubmitFeatureRequestOpen] = useState(false);

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
        props.submitFeatureRequest(description);
        setDescription('');
        setSubmitFeatureRequestOpen(false);
        // eslint-disable-next-line
    }, [description, props.submitFeatureRequest, setDescription, setSubmitFeatureRequestOpen]);

    const [featuresOpen, setFeaturesOpen] = useState([]);

    const toggleFeature = useCallback((isOpen, id) => {
        if (isOpen) {
            setFeaturesOpen(_.union(featuresOpen, [id]));
        } else {
            setFeaturesOpen(featuresOpen.filter(x => x !== id));
        }
    }, [setFeaturesOpen, featuresOpen]);

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
                submitFeatureOpen={submitFeatureRequestOpen}
                submitRequest={submitRequest}
                updateDescription={updateDescription}
            />
            <MyFeatureRequests
                addNewComment={addNewComment}
                addNewReply={addNewReply}
                deleteComment={deleteComment}
                deleteReply={deleteReply}
                featuresOpen={featuresOpen}
                featureRequests={_.map(props.featureRequests, (value, id) => ({ id, ...value }))}
                setSubmitFeatureRequestOpen={setSubmitFeatureRequestOpen}
                toggleFeature={toggleFeature}
                loggedInUserId={props.auth.uid}
            />
            <ErrorModal
                closeModal={props.closeCommentError}
                headerMessage="Comment Error"
                isOpen={props.commentError.length > 0}
                errorCode={props.commentErrorCode}
                errorMessage={props.commentError}
            />
        </>
    );
};

FeatureRequest.defaultProps = {
    commentError: '',
    commentErrorCode: '',
    addCommentToFeatureRequest: noop,
    addReplyToCommentRequest: noop,
    auth: {
        uid: null
    },
    featureRequests: {},
    submitFeatureRequest: noop
};

FeatureRequest.propTypes = {
    commentError: PropTypes.string,
    commentErrorCode: PropTypes.string,
    addCommentToFeatureRequest: PropTypes.func,
    addReplyToCommentRequest: PropTypes.func,
    auth: PropTypes.shape({
        uid: PropTypes.string
    }),
    closeCommentError: PropTypes.func.isRequired,
    deleteCommentRequest: PropTypes.func.isRequired,
    deleteReplyRequest: PropTypes.func.isRequired,
    featureRequests: PropTypes.objectOf(PropTypes.shape({
        dateCreated: PropTypes.any,
        description: PropTypes.string,
        userId: PropTypes.string
    })),
    submitFeatureRequest: PropTypes.func
};

const mapStateToProps = state => ({
    commentError: state.features.commentError,
    commentErrorCode: state.features.commentErrorCode,
    auth: state.firebase.auth,
    featureRequests: state.firestore.data.featureRequests
});

const mapDispatchToProps = {
    addCommentToFeatureRequest,
    addReplyToCommentRequest,
    closeCommentError,
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
    ]),
)(FeatureRequest);
