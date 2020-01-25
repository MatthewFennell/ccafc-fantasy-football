import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import _, { noop } from 'lodash';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import defaultStyles from './FeatureRequest.module.scss';
import {
    addReplyToCommentRequest, submitFeatureRequest, addCommentToFeatureRequest,
    deleteCommentRequest
} from './actions';
import StyledButton from '../common/StyledButton/StyledButton';
import MyFeatureRequests from './MyFeatureRequests';

const maxLength = 256;

const charactersLeft = description => `${maxLength - (description.length || 0)} characters left`;

const FeatureRequest = props => {
    const [description, setDescription] = useState('');

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
        // eslint-disable-next-line
    }, [description, props.submitFeatureRequest]);

    const [featuresOpen, setFeaturesOpen] = useState([]);

    const toggleFeature = useCallback((isOpen, id) => {
        if (isOpen) {
            setFeaturesOpen(_.union(featuresOpen, [id]));
        } else {
            setFeaturesOpen(featuresOpen.filter(x => x !== id));
        }
    }, [setFeaturesOpen, featuresOpen]);

    const deleteComment = useCallback(id => commentId => {
        props.deleteCommentRequest(id, commentId);
        // eslint-disable-next-line
    }, props.deleteCommentRequest)

    return (
        <>
            <div className={props.styles.featureRequestWrapper}>
                <div className={props.styles.header}>
                Enter a description of the feature you would like to see added to the site
                </div>
                <textarea
                    value={description}
                    onChange={updateDescription}
                />
                <div className={props.styles.charactersRemaining}>
                    {charactersLeft(description)}
                </div>

                <StyledButton
                    onClick={submitRequest}
                    color="primary"
                    text="Submit feature request"
                />
            </div>
            <MyFeatureRequests
                addNewComment={addNewComment}
                addNewReply={addNewReply}
                deleteComment={deleteComment}
                featuresOpen={featuresOpen}
                featureRequests={_.map(props.featureRequests, (value, id) => ({ id, ...value }))}
                toggleFeature={toggleFeature}
                loggedInUserId={props.auth.uid}
            />
        </>
    );
};

FeatureRequest.defaultProps = {
    addCommentToFeatureRequest: noop,
    addReplyToCommentRequest: noop,
    auth: {
        uid: null
    },
    featureRequests: {},
    styles: defaultStyles,
    submitFeatureRequest: noop
};

FeatureRequest.propTypes = {
    addCommentToFeatureRequest: PropTypes.func,
    addReplyToCommentRequest: PropTypes.func,
    auth: PropTypes.shape({
        uid: PropTypes.string
    }),
    deleteCommentRequest: PropTypes.func.isRequired,
    featureRequests: PropTypes.objectOf(PropTypes.shape({
        dateCreated: PropTypes.any,
        description: PropTypes.string,
        userId: PropTypes.string
    })),
    styles: PropTypes.objectOf(PropTypes.string),
    submitFeatureRequest: PropTypes.func
};

const mapStateToProps = state => ({
    auth: state.firebase.auth,
    featureRequests: state.firestore.data.featureRequests
});

const mapDispatchToProps = {
    addCommentToFeatureRequest,
    addReplyToCommentRequest,
    deleteCommentRequest,
    submitFeatureRequest
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => [
        {
            collection: 'feature-requests',
            storeAs: 'featureRequests'
        }
    ]),
)(FeatureRequest);
