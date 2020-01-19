import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import _, { noop } from 'lodash';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import defaultStyles from './FeatureRequest.module.scss';
import { submitFeatureRequest } from './actions';
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
    }, [setDescription, description]);

    const submitRequest = useCallback(() => {
        props.submitFeatureRequest(description);
    }, [description, props.submitFeatureRequest]);

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
                featureRequests={_.map(props.featureRequests, (value, id) => ({ id, ...value }))}
            />
        </>
    );
};

FeatureRequest.defaultProps = {
    featureRequests: {},
    styles: defaultStyles,
    submitFeatureRequest: noop
};

FeatureRequest.propTypes = {
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
    submitFeatureRequest
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => [
        {
            collection: 'feature-requests',
            storeAs: 'featureRequests',
            where: [
                ['userId', '==', props.auth.uid]]
        }
    ]),
)(FeatureRequest);
